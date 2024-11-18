import mongoose from "mongoose";
export const OrderSchema = new mongoose.Schema(
  {
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
    totalAmount: { type: Number, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    orderDate: { type: Date, default: Date.now },
  },
  { versionKey: false, timestamps: true }
);

export const orderModel = mongoose.model("orders", OrderSchema);
