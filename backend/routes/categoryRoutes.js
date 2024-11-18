import express from "express";
import { categoryModel } from "../models/category.js";

const router = express.Router();

// POST route to create a new category
router.post("/api/category", async (req, res) => {
  try {
    const categories = req.body;

    if (!Array.isArray(categories) || categories.length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid input: expected an array of categories" });
    }

    const createdCategories = [];
    const errors = [];

    for (const category of categories) {
      const { name, description } = category;

      if (!name || !description) {
        errors.push({ name, error: "Name and description are required" });
        continue;
      }

      // Check if the category already exists
      const existingCategory = await categoryModel.findOne({ name });
      if (existingCategory) {
        errors.push({ name, error: "Category already exists" });
        continue;
      }

      // Create a new category
      const newCategory = new categoryModel({ name, description });
      await newCategory.save();
      createdCategories.push(newCategory);
    }

    res.status(201).json({
      message: "Category created successfully",
      createdCategories,
      errors,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET route to fetch all categories
router.get("/api/category", async (req, res) => {
  try {
    // Fetch all categories and populate subcategories for each animal type
    const categories = await categoryModel.find().populate({
      path: "subcategory.dog subcategory.cat subcategory.fish subcategory.bird subcategory.reptile",
      select: "name price description brand", // Specify the fields to include from products
    });

    if (!categories || categories.length === 0) {
      return res.status(404).json({ error: "No categories found" });
    }

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
