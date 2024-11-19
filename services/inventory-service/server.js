import express from "express";
const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv";
import amqp from "amqplib";
import { productModel } from "./models/products.js";
dotenv.config({ path: "../../.env" });

// Middleware (Optional)
app.use(express.json()); // For parsing JSON request bodies

// example
// {
//   "productId": "6737ad1960b041ceb65faf43",
//   "quantityChange": -1
//   }
const {
  RABBITMQ_URL,
  INVENTORY_QUEUE: RABBITMQ_QUEUE,
  MONGODB_URL: MGDB_URL,
  INVENTORY_SERVICE_PORT: PORT,
  MANAGEMENT_USER_EMAIL,
  MANAGEMENT_USERNAME,
  LOWSTOCK_THRESHOLD,
} = process.env;

let rabbitConnection; // Global connection variable

async function handleLowStock(productId, availableStock) {
  try {
    const channel = await rabbitConnection.createChannel();
    const queueName = "notification_queue";
    await channel.assertQueue(queueName, { durable: true });

    const message = {
      type: "low-stock-alert",
      toEmail: MANAGEMENT_USER_EMAIL,
      name: MANAGEMENT_USERNAME,
      id: productId,
      stock: availableStock,
    };

    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });

    console.log(`Low stock notification sent for product ID: ${productId}`);
  } catch (error) {
    console.error("Failed to handle low stock:", error);
  }
}

async function startConsumer() {
  try {
    const queueName = RABBITMQ_QUEUE;
    const channel = await rabbitConnection.createChannel();

    await channel.assertQueue(queueName, { durable: true });

    console.log(`Waiting for messages in queue: ${queueName}`);

    channel.consume(
      queueName,
      async (msg) => {
        if (msg !== null) {
          try {
            const { productId, quantityChange } = JSON.parse(
              msg.content.toString()
            );

            if (typeof quantityChange !== "number") {
              console.error("Invalid quantityChange type. Must be a number.");
              channel.nack(msg); // Reject the message to requeue
              return;
            }

            // Find the product by ID
            const product = await productModel.findById(productId);
            if (!product) {
              console.error(`Product with ID ${productId} not found.`);
              channel.ack(msg); // Acknowledge as processed (even if failed)
              return;
            }

            // Update availableStock
            const newStock = product.availableStock + quantityChange;
            if (newStock < 0) {
              console.error("Inventory cannot be less than zero.");
              channel.ack(msg); // Acknowledge as processed (even if failed)
              return;
            }

            product.availableStock = newStock;
            await product.save();

            console.log(
              `Inventory updated successfully for product ID: ${productId} - New stock: ${newStock}`
            );
            channel.ack(msg); // Acknowledge as successfully processed

            if (newStock < LOWSTOCK_THRESHOLD) {
              console.log(
                `Low stock alert for product ID: ${productId} - Stock: ${newStock}`
              );
              await handleLowStock(productId, newStock);
            }
          } catch (error) {
            console.error("Error processing message:", error);
            channel.ack(msg); // Reject the message to requeue
          }
        }
      },
      { noAck: false } // Ensure manual acknowledgment
    );
  } catch (error) {
    console.error("Failed to start RabbitMQ consumer:", error);
    process.exit(1);
  }
}

mongoose
  .connect(MGDB_URL)
  .then(async () => {
    console.log("Database connected successfully");

    // Establish RabbitMQ connection
    rabbitConnection = await amqp.connect(RABBITMQ_URL);
    console.log("RabbitMQ connected successfully");

    app.listen(PORT, () => {
      console.log("Inventory service is running on port", PORT);
      startConsumer();
    });
  })
  .catch((error) => console.log(error));
