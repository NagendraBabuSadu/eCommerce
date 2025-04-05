import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import connectDb from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import userModel from "./models/user.model.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

connectDb();

const app = express();

// Middleware
app.use(express.json());
const allowedOrigins = [
  "http://localhost:3001",
  "https://e-commerce-phi-fawn-48.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
// Health check / root route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ msg: "connected to 3000" });
});

// Example route to fetch all users
app.get("/users", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userModel.find({});
    res.status(200).json({
      msg: "users are fetched",
      users,
    });
  } catch (err) {
    next(err);
  }
});

// API Routes
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);

// Global error handler (optional but good to have)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
