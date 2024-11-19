import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import userModel from "./models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
dotenv.config({ path: "../.env" });

const PORT = process.env.BACKEND_PORT;
const MGDB_URL = process.env.MONGODB_URL;

const JWT_SECRET = "softwarearchitecturehelloworld";

app.use(express.json());
app.use(categoryRoutes);
app.use(productRoutes);
app.use(cartRoutes);
app.use(ordersRoutes);
app.use(usersRoutes);

mongoose
  .connect(MGDB_URL)
  .then(() => {
    console.log("Database connected succesfull");
    app.listen(PORT, () => {
      console.log("Server started on port " + PORT);
    });
  })
  .catch((error) => console.log(error));

// Register Endpoint
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Check if the username or email already exists
  const existingUser = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (existingUser) {
    return res.status(400).json({ error: "Username or email already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create and save the new user
  const newUser = new userModel({
    username,
    email,
    password: hashedPassword,
    cartItems: [],
    orders: [],
  });

  await newUser.save();
  res.json({ message: "User registered successfully" });
});

// Login Endpoint
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);
  // Find user by email
  const user = await userModel.findOne({ email });
  if (!user) {
    console.log("User not found");
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ message: "Login successful", token, userId: user._id });
});

// Protected Endpoint
app.get("/api/protected", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    // Find the user by ID and populate cartItems and orders
    const user = await userModel
      .findById(decoded.userId)
      .populate("cartItems")
      .populate("orders");

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ message: "Protected data", user });
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
});
