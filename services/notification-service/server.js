require("dotenv").config({ path: "../../.env" });
const express = require("express");
const amqp = require("amqplib");
const nodemailer = require("nodemailer");

const app = express();

// Middleware
app.use(express.json()); // For parsing JSON request bodies

// Example data
// {
//   "type": "new-order",
//   "toEmail": "email@mail.com",
//   "subject": "Order Confirmation",
//   "name": "Tran Beo",
//   "id": "1234",
//   "orderDate": "2024-11-18T10:30:00Z",
//   "totalAmount": 150.75,
//   "items": [
//     {
//       "_id": "item001",
//       "name": "Wireless Mouse",
//       "price": 25.99
//     },
//   ]
// }
// {
//   "type": "low-stock-alert",
//   "toEmail": "email@mail.com",
//   "subject": "Low Stock Alert",
//   "name": "Tran Beo",
//   "id": "item001",
//   "stock": 5,
// }

// RabbitMQ connection details
const {
  RABBITMQ_URL,
  RABBITMQ_PORT,
  NOTIFICATION_QUEUE: RABBITMQ_QUEUE,
  SMTP_SERVER,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASSWORD,
  NOTIFICATION_SERVICE_PORT: PORT,
} = process.env;

// Email transport configuration
const transporter = nodemailer.createTransport({
  host: SMTP_SERVER,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
});

// Consume messages from the RabbitMQ queue
const consumeQueue = async () => {
  try {
    console.log(RABBITMQ_URL);
    const connection = await amqp.connect(`${RABBITMQ_URL}`);
    const channel = await connection.createChannel();

    await channel.assertQueue(RABBITMQ_QUEUE, { durable: true });

    console.log(`Waiting for messages in ${RABBITMQ_QUEUE}...`);

    channel.consume(
      RABBITMQ_QUEUE,
      async (msg) => {
        if (msg !== null) {
          try {
            const order = JSON.parse(msg.content.toString());

            var mailOptions;
            if (order.type === "new-order") {
              mailOptions = {
                from: process.env.EMAIL_USER,
                to: order.toEmail,
                subject: "Order Confirmation",
                html: `
                  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="background-color: #f4f4f4; padding: 20px; border-bottom: 2px solid #007bff;">
                      <h2 style="color: #007bff; text-align: center; margin: 0;">Thank You for Your Order!</h2>
                    </div>
                    <div style="padding: 20px;">
                      <p>Hi ${order.name},</p>
                      <p>
                        We’re excited to let you know that your order has been received and is being processed. Below are the details of your purchase:
                      </p>
                      <h4 style="color: #007bff; margin-top: 20px;">Order Summary</h4>
                      <p><strong>Order ID:</strong> ${order._id}</p>
                      <p><strong>Total Amount:</strong> $${parseFloat(
                        order.totalAmount
                      ).toFixed(2)}</p>
                      <p><strong>Order Date:</strong> ${new Date(
                        order.orderDate
                      ).toLocaleDateString()}</p>
                      <h4 style="color: #007bff; margin-top: 20px;">Items Ordered</h4>
                      <ul style="list-style-type: none; padding: 0;">
                        ${order.items
                          .map(
                            (product) => `
                            <li style="border-bottom: 1px solid #ddd; padding: 10px 0;">
                              <strong>${product.name}</strong>
                              <span style="float: right;">$${parseFloat(
                                product.price
                              ).toFixed(2)}</span>
                            </li>
                          `
                          )
                          .join("")}
                      </ul>
                      <p>Thank you for shopping with us!</p>
                      <p style="font-weight: bold;">The PawPaw Team</p>
                    </div>
                    <div style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 12px; color: #666;">
                      <p>© ${new Date().getFullYear()} PawPaw. All rights reserved.</p>
                    </div>
                  </div>
                `,
              };
            } else if (order.type === "low-stock-alert") {
              mailOptions = {
                from: process.env.EMAIL_USER,
                to: order.toEmail,
                subject: "Low Stock Alert",
                html: `
                    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                      <div style="background-color: #f4f4f4; padding: 20px; border-bottom: 2px solid #d9534f;">
                        <h2 style="color: #d9534f; text-align: center; margin: 0;">Low Stock Alert</h2>
                      </div>
                      <div style="padding: 20px;">
                        <p>Hi ${order.name},</p>
                        <p>
                          This is a notification to let you know that the stock for the following item is running low:
                        </p>
                        <h4 style="color: #d9534f; margin-top: 20px;">Item Details</h4>
                        <p><strong>Item ID:</strong> ${order.id}</p>
                        <p><strong>Stock Remaining:</strong> ${order.stock}</p>
                        <p>
                          Please take the necessary actions to restock this item as soon as possible to avoid any potential disruptions.
                        </p>
                        <p>Thank you for your attention to this matter.</p>
                        <p style="font-weight: bold;">The PawPaw Team</p>
                      </div>
                      <div style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 12px; color: #666;">
                        <p>© ${new Date().getFullYear()} PawPaw. All rights reserved.</p>
                      </div>
                    </div>
                  `,
              };
            }

            await transporter.sendMail(mailOptions).then(() => {
              console.log(`Email sent to ${order.toEmail}`);
              channel.ack(msg);
            });
          } catch (err) {
            console.error("Error sending email:", err);
            channel.ack(msg);
          }
        }
      },
      { noAck: false }
    );
  } catch (err) {
    console.error("Error connecting to RabbitMQ:", err);
  }
};

// Basic route
app.get("/", (req, res) => {
  res.send("Hello, Express e!");
});

app.listen(PORT, () => {
  console.log("Notification service is running on port", PORT);
  // Start consuming messages
  consumeQueue();
});
