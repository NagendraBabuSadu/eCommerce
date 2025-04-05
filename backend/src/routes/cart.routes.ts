import express from "express";
import {
  addCartProducts,
  getCartProducts,
} from "../controllers/cart.controller.js";
import isUser from "../middlewares/isUser.js";
import isAdmin from "../middlewares/isAdmin.js";
import { Request, Response, NextFunction } from "express";
import { RequestHandler } from "express";

const router = express.Router();

interface User {
  id: string;
  role: "user" | "admin";
}

interface AuthRequest extends Request {
  user?: User;
}

const authorizeUserOrAdmin: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) : void => {
    const user = (req as AuthRequest).user;

  if (user && (user.role === "user" || user.role === "admin")) {
    return next();
  }

  res.status(403).json({ message: "Access Denied" });
};


router.post("/", authorizeUserOrAdmin, addCartProducts);
router.get("/", isUser, getCartProducts);

export default router;
