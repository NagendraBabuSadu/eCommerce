import { NextFunction, Request, Response } from "express";
import { createUser } from "../validators/auth.validators.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const adminSignup = async function (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const createPayload = req.body;
    const parsedPayload = createUser.safeParse(createPayload);
    if (!parsedPayload.success) {
      res.status(400).json({ msg: "You sent wrong input" });
      return;
    }

    const existingAdmin = await userModel.findOne({
      email: createPayload.email,
    });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const newAdmin = await userModel.create({
      email: createPayload.email,
      password: createPayload.password,
      role: "admin",
    });

    await newAdmin.save();
    res.status(200).json({ msg: "Admin is created.", admin: newAdmin });
  } catch (error) {
    res.status(500).json({ msg: "Error creating admin", error });
  }
};

export const adminLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { email } = req.body;

    // Check if the admin exists
    const admin = await userModel.findOne({ email, role: "admin" });
    if (!admin) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "3h",
      }
    );

    res.json({ message: "Admin logged in successfully", token });
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ error: error.message });
  }
};
