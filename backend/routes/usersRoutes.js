import express from "express";
import userModel from "../models/users.js";

const router = express.Router();

router.get("/api/users/profile/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch user information and populate orders
    const user = await userModel
      .findById(userId)
      .select("username email")
      .populate({
        path: "orders",
        populate: {
          path: "items",
          model: "products",
          select: "name price",
        },
      });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user, orders: user.orders });
  } catch (error) {
    console.error("Error fetching profile data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
