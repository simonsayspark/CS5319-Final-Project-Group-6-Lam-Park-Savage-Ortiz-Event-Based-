// rabbitmq.js
import amqp from "amqplib";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const { RABBITMQ_URL } = process.env;

let connection = null;

const getRabbitMQConnection = async () => {
  if (!connection) {
    try {
      connection = await amqp.connect(RABBITMQ_URL);
      console.log("RabbitMQ connection established.");
    } catch (error) {
      console.error("Failed to establish RabbitMQ connection:", error);
      throw error;
    }
  }
  return connection;
};

export default getRabbitMQConnection;
