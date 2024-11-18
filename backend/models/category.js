import mongoose from "mongoose";

export const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    subcategory: {
      dog: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
      cat: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
      fish: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
      bird: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
      reptile: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
    },
  },
  { versionKey: false }
);

export const categoryModel = mongoose.model("categories", CategorySchema);
