// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./db/mongo.js";

import productRouter from "./routes/productRoute.js";
import saleRouter from "./routes/saleRoute.js";
import userRouter from "./routes/authRoutes.js";
import supplierRouter from "./routes/supplierRoute.js";
import purchaseRouter from "./routes/purchaseRoute.js";
import alertRouter from "./routes/alertRoute.js";

// Load environment variables
dotenv.config({ path: "./config/.env" });

// Connect to MongoDB
dbConnection();

const app = express();

// ✅ CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL, // e.g., https://pharma-frontend.vercel.app
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// ✅ Handle preflight (OPTIONS) requests first
app.options("*", cors(corsOptions));

// ✅ Apply CORS to all routes
app.use(cors(corsOptions));

// ✅ Parse incoming JSON requests
app.use(express.json());

// ✅ Debug Route to verify backend deployment
app.get("/", (req, res) => {
  res.send("✅ Backend Deployed Successfully");
});

// ✅ Optional: CORS Debugging Endpoint
app.get("/cors-check", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.json({
    success: true,
    origin: req.headers.origin,
    frontendAllowed: process.env.FRONTEND_URL,
  });
});

// ✅ App Routes
app.use("/api/products", productRouter);
app.use("/api/sales", saleRouter);
app.use("/api/users", userRouter);
app.use("/api/suppliers", supplierRouter);
app.use("/api/purchases", purchaseRouter);
app.use("/api/alert", alertRouter);

// ✅ Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server is Running on Port: ${PORT}`);
});
