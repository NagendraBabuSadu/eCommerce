import { NextFunction, Request, Response } from "express";
import { createUser, updateUser } from "../validators/auth.validators.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { blacklistedTokens } from "../middlewares/isUser.js";

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

    const existingUser = await userModel.findOne({
      email: createPayload.email,
    });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    //put it in mongoDb
    const newUser = await userModel.create({
      email: createPayload.email,
      password: createPayload.password,
      role: "user",
    });

    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      },
      process.env.JWT_SECRET as string, // Ensure JWT_SECRET is defined in your .env file
      { expiresIn: "1h" } // Token expiration time
    );

    await newUser.save();

    res.status(200).json({
      msg: "User is created.",
      user: newUser,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error creating user", error });
  }
};

// export const login = async function (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const loginPayload = req.body;
//     const parsedPayload = createUser.safeParse(loginPayload);
//     if (!parsedPayload.success) {
//       res.status(411).json({
//         msg: "You sent wrong inputs",
//       });
//       return;
//     }
//     const existingUser = await userModel.findOne({ email: loginPayload.email });

//     if (!existingUser) {
//       return res.status(400).json({
//         message: "User not found.",
//       });
//     }

//     const isMatch = await bcrypt.compare(
//       loginPayload.password,
//       existingUser.password
//     );

//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     res.status(200).json({ message: "Login successful", user: existingUser });
//   } catch (error) {
//     console.error("Error in /login:", error);
//     res.status(500).json({ msg: "Error finding user", error: error.message });
//   }
// };

export const authUpdate = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const updatePayload = req.body;
    const parsedPayload = updateUser.safeParse(updatePayload);

    if (!parsedPayload.success) {
      return res.status(411).json({
        msg: "Something is wrong",
      });
    }

    const newUpdatedUser = await userModel.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: updatePayload,
      },
      { new: true }
    );

    console.log("user is updated successfully");
    console.log("newupdatedUser", newUpdatedUser);

    res.status(200).json({
      newUpdatedUser: newUpdatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async function (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const loginPayload = req.body;
    const parsedPayload = createUser.safeParse(loginPayload);
    if (!parsedPayload.success) {
      return res.status(411).json({ msg: "You sent wrong inputs" });
    }

    const existingUser = await userModel.findOne({ email: loginPayload.email });

    if (!existingUser) {
      return res.status(400).json({ message: "User not found." });
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token: token });
  } catch (error) {
    console.error("Error in /login:", error);
    res.status(500).json({ msg: "Error finding user", error: error.message });
  }
};

export const authDelete = async function (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  const deletedUser = await userModel.findByIdAndDelete({ _id: req.params.id });
  console.log("deletedUser", deletedUser);
  const newUsers = await userModel.find({});

  res.status(200).json({
    deletedUser: deletedUser,
  });
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", " ");
    if (!token) {
      return res.status(400).json({ message: "No token provided." });
    }

    blacklistedTokens.add(token);

    res.status(200).json({
      message: "User logged out successfully. ",
    });
  } catch (error) {
    console.error("Error during logout:", error);
    res
      .status(500)
      .json({ message: "Error during logout", error: error.message || error });
  }
};
