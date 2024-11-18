import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "orders" }],
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("users", UserSchema);
