import express from "express";
import { categoryModel } from "../models/category.js";
import { productModel } from "../models/products.js";

const router = express.Router();

// POST route to add products from JSON data
router.post("/api/products", async (req, res) => {
  try {
    const products = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid input: expected an array of products" });
    }

    const createdProducts = [];
    const errors = [];

    for (const product of products) {
      const {
        name,
        animalType,
        category,
        description,
        price,
        brand,
        availableStock,
      } = product;

      // Validate required fields
      if (
        !name ||
        !animalType ||
        !category ||
        !description ||
        !price ||
        !brand ||
        availableStock === undefined
      ) {
        errors.push({ name, error: "Missing required fields" });
        continue;
      }

      // Check if the animalType is valid
      if (!["dog", "cat", "fish", "bird", "reptile"].includes(animalType)) {
        errors.push({ name, error: "Invalid animal type" });
        continue;
      }

      // Retrieve the category ObjectId by name
      const categoryDoc = await categoryModel.findOne({ name: category });
      if (!categoryDoc) {
        errors.push({ name, error: `Category "${category}" not found` });
        continue;
      }

      // Create a new product
      const newProduct = new productModel({
        name,
        animalType,
        category: categoryDoc._id,
        description,
        price,
        brand,
        availableStock,
      });

      await newProduct.save();
      // Update the corresponding animalType subcategory list in the category document
      const updateField = `subcategory.${animalType}`;
      await categoryModel.findByIdAndUpdate(categoryDoc._id, {
        $push: { [updateField]: newProduct._id },
      });

      createdProducts.push(newProduct);
    }

    res.status(201).json({
      message: "Products processed",
      createdProducts,
      errors,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
