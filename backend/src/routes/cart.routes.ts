import express from "express";
import {
  addCartProducts,
  getCartProducts,
} from "../controllers/cart.controller.js";
import isUser from "../middlewares/isUser.js";
import { Request, Response, NextFunction } from "express";
import { RequestHandler } from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

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

    console.log("user, .....", user)
  if (user && (user.role === "user" || user.role === "admin")) {

    return next();
  }

  res.status(403).json({ message: "Access Denied" });
};


router.post("/", isAuthenticated, authorizeUserOrAdmin, addCartProducts);
router.get("/", isUser, getCartProducts);

export default router;
