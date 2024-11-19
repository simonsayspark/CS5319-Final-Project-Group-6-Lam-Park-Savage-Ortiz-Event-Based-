import express from "express";
import userModel from "../models/users.js";
import { orderModel } from "../models/orders.js";
import { productModel } from "../models/products.js";
import getRabbitMQConnection from "../rabbitmq.js";

const router = express.Router();

const { NOTIFICATION_QUEUE, INVENTORY_QUEUE } = process.env;

router.post("/api/orders/place", async (req, res) => {
  const { userId, cartItems, totalAmount } = req.body;

  try {
    // Check if the user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a new order with the list of product IDs
    const newOrder = new orderModel({
      items: cartItems.map((item) => item.productId),
      totalAmount,
      user: userId,
    });

    // Save the new order
    await newOrder.save();

    // Update user's orders list with the new order ID
    user.orders.push(newOrder._id);
    await user.save();

    const connection = await getRabbitMQConnection();
    const channel = await connection.createChannel();
    await channel.assertQueue(NOTIFICATION_QUEUE, { durable: true });
    await channel.assertQueue(INVENTORY_QUEUE, { durable: true });

    // Send a message to the notification queue
    const notification_payload = {
      type: "new-order",
      toEmail: user.email,
      subject: "Order Confirmation",
      name: user.username,
      _id: newOrder._id,
      orderDate: newOrder.createdAt,
      totalAmount: newOrder.totalAmount,
      items: await Promise.all(
        cartItems.map(async (item) => {
          const product = await productModel.findById(item.productId);

          return {
            _id: product._id.toString(),
            name: product.name,
            price: product.price,
          };
        })
      ),
    };
    channel.sendToQueue(
      NOTIFICATION_QUEUE,
      Buffer.from(JSON.stringify(notification_payload)),
      {
        persistent: true,
      }
    );
    cartItems.forEach(async (item) => {
      await channel.sendToQueue(
        INVENTORY_QUEUE,
        Buffer.from(
          JSON.stringify({
            productId: item.productId,
            quantityChange: -1,
          })
        ),
        {
          persistent: true,
        }
      );
    });

    res.json({ message: "Order placed successfully", orderId: newOrder._id });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// router.get("/api/orders/:userId", async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const user = await userModel.findById(userId).populate({
//       path: "orders",
//       populate: {
//         path: "items",
//         model: "products",
//       },
//     });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.json({ orders: user.orders });
//   } catch (error) {
//     console.error("Error fetching order history:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

export default router;
