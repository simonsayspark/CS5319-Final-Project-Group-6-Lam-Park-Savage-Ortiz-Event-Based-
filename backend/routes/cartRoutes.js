import express from "express";
import { productModel } from "../models/products.js";
import userModel from "../models/users.js";

const router = express.Router();

router.post("/api/cart/add", async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // Check if the product exists
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Find the user and add the product to cartItems if not already present
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the product is already in the cart
    const isProductInCart = user.cartItems.includes(productId);
    if (isProductInCart) {
      return res.status(400).json({ error: "Product already in cart" });
    }

    // Add product ID to user's cartItems
    user.cartItems.push(productId);
    await user.save();

    res.json({ message: "Product added to cart", cartItems: user.cartItems });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/api/cart/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by ID
    const user = await userModel.findById(userId).populate("cartItems");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Retrieve the product details for each item in the cart
    const cartDetails = await productModel.find({
      _id: { $in: user.cartItems },
    });

    res.json(cartDetails);
  } catch (error) {
    console.error("Error fetching cart details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to remove a product from the cart
router.delete("/api/cart/remove", async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // Find the user by ID
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the product exists in the user's cartItems
    const productIndex = user.cartItems.indexOf(productId);
    if (productIndex === -1) {
      return res.status(400).json({ error: "Product not found in cart" });
    }

    // Remove the product from cartItems
    user.cartItems.splice(productIndex, 1);
    await user.save();

    res.json({
      message: "Product removed from cart",
      cartItems: user.cartItems,
    });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
