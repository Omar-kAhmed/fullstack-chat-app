import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5001; // Default port is set to 5001
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

// Set up CORS configuration
app.use(
  cors({

    origin: "https://fullstack-chat-app-front.onrender.com",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Serve React frontend in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist"); // Adjust if using "build" for CRA
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// Start server and connect to the database
server.listen(PORT, async () => {
  console.log(`Server is running on PORT: ${PORT}`);
  try {
    await connectDB();
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit the process if the DB connection fails
  }
});
