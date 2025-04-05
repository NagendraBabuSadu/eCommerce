// Write boiler plate for express.json
import express from "express";
import { Request, Response, NextFunction } from "express";
import cors from "cors";
import authRoutes from './routes/auth.routes.js'
import userModel from "./models/user.model.js";
import connectDb from "./config/db.js";
import adminRoutes from "./routes/admin.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from './routes/cart.routes.js'
import orderRoutes from './routes/order.routes.js'


const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3001", // Replace with your frontend URL
  credentials: true,
}));

connectDb();

app.get("/", async function (req: Request, res: Response, next: NextFunction) {
  res.status(200).json({
    msg: "connected to 3000",
  });
});


app.get(
  "/users",
  async function (req: Request, res: Response, next: NextFunction) {
    const users = await userModel.find({});
    res.status(200).json({
      msg: "users are fetched",
      users: users,
    });
  }
);

app.use("/auth", authRoutes); 
app.use("/admin", adminRoutes);
app.use("/products", productRoutes);

app.use("/cart", cartRoutes)
app.use("/order", orderRoutes)




app.listen(3000);
