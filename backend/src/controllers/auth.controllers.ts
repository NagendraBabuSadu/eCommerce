import { NextFunction } from "express";
import { createUser } from "../validators/auth.validators.js";
import bcrypt from 'bcrypt'
import userModel from "../models/user.model.js";

export const signup = async function (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const createPayload = req.body;
    const parsedPayload = createUser.safeParse(createPayload);
    if (!parsedPayload.success) {
        res.status(400).json({ msg: "You sent wrong input" });
        console.log(typeof res.status); // Should print "function"
      return;
    }

    const existingUser = await userModel.findOne({ email: createPayload.email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(createPayload.password, 10);
    //put it in mongoDb
    const newUser = await userModel.create({
      email: createPayload.email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({
      msg: "User is created.",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error creating user", error });
  }
};


export const login = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const loginPayload = req.body;
    const parsedPayload = createUser.safeParse(loginPayload);
    if (!parsedPayload.success) {
      res.status(411).json({
        msg: "You sent wrong inputs",
      });
      return;
    }
    const existingUser = await userModel.findOne({ email: loginPayload.email });

    if (!existingUser) {
      return res.status(400).json({
        message: "User not found.",
      });
    }

    const isMatch = await bcrypt.compare(
      loginPayload.password,
      existingUser.password
    );

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user: existingUser });
  } catch (error) {
    console.error("Error in /login:", error);
    res.status(500).json({ msg: "Error finding user", error: error.message });
  }
};
