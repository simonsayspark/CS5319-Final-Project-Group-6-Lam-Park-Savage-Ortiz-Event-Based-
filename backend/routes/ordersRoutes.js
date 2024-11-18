import express from "express";
import userModel from "../models/users.js";
import { orderModel } from "../models/orders.js";

const router = express.Router();

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
