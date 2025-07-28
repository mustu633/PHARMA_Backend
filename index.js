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

// ✅ Correct CORS setup
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // handle preflight properly

app.use(express.json());

// 🔧 Debug CORS route
app.get("/cors-check", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  return res.json({
    success: true,
    origin: req.headers.origin,
    frontendAllowed: process.env.FRONTEND_URL,
  });
});

// 🚀 ROUTES
app.use("/api/products", productRouter);
app.use("/api/sales", saleRouter);
app.use("/api/users", userRouter);
app.use("/api/suppliers", supplierRouter);
app.use("/api/purchases", purchaseRouter);
app.use("/api/alert", alertRouter);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is Running on Port: ${PORT}`);
});
