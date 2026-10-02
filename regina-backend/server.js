import { connectDatabase } from "./database/db.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import chatRoutes from "./routes/chat.js";

dotenv.config();
await connectDatabase();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Regina Backend is running 🚀"
  });
});

// Home Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    name: "Regina Backend",
    version: "1.0.0",
    status: "online"
  });
});

// API Information
app.get("/api", (req, res) => {
  res.json({
    success: true,
    name: "Regina AI API",
    version: "1.0.0",
    company: "Tundar Technologies",
    endpoints: [
      "GET /",
      "GET /health",
      "GET /api",
      "POST /api/chat"
    ]
  });
});

// Chat Routes
app.use("/api/chat", chatRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Regina Backend running on port ${PORT}`);
});