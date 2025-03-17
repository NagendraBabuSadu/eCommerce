import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

const isAdmin = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ msg: "Access denied" });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await userModel.findById(decoded.id);

    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ msg: "Unauthorized access" });
    }

    next();
  } catch (error) {
    res.status(500).json({ msg: "Error in authorization", error });
  }
};

export default isAdmin;