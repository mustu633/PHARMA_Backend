import express from "express";
import { dbConnection } from "./db/mongo.js";
import cors from "cors";
import dotenv from "dotenv";

import productRouter from "./routes/productRoute.js";
import saleRouter from "./routes/saleRoute.js";
import userRouter from "./routes/authRoutes.js";
import supplierRouter from "./routes/supplierRoute.js";
import purchaseRouter from "./routes/purchaseRoute.js";
import alertRouter from "./routes/alertRoute.js";

dotenv.config({ path: "./config/.env" });
dbConnection();

const app = express();

// ✅ CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL, // Must match frontend
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());

// ✅ Debug Route to verify backend is up
app.get("/", (req, res) => {
  res.send("✅ Backend Deployed Successfully");
});

// ✅ Optional: CORS Debug Route
app.get("/cors-check", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  return res.json({
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is Running on Port: ${PORT}`);
});
