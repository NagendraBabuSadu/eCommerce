// Write boiler plate for express.json
import express from "express";
import { createUser, updateUser } from "./types.js";
import { Request, Response, NextFunction } from "express";
import { user } from "./db.js";
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async function (req: Request, res: Response, next: NextFunction) {
  res.status(200).json({
    msg: "connected to 3000",
  });
});

app.post(
  "/user",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const createPayload = req.body;
      const parsedPayload = createUser.safeParse(createPayload);
      if (!parsedPayload.success) {
        res.status(411).json({
          msg: "You sent wrong inputs",
        });
        return;
      }

      const existingUser = await user.findOne({ email: createPayload.email });
      if (existingUser) {
        return res.status(400).json({
          message: "User already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(createPayload.password, 10);
      //put it in mongoDb
      const newUser = await user.create({
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
  }
);

app.get(
  "/users",
  async function (req: Request, res: Response, next: NextFunction) {
    const users = await user.find({});
    res.status(200).json({
      msg: "users are fetched",
      users: users,
    });
  }
);

app.put(
  "/users/:id",
  async function (
    req: Request<{ id: string }>,
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

      const newUpdatedUser = await user.findByIdAndUpdate(
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
  }
);

app.delete(
  "/users/:id",
  async function (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    const deletedUser = await user.findByIdAndDelete({ _id: req.params.id });
    console.log("deletedUser", deletedUser);
    const newUsers = await user.find({});

    res.status(200).json({
      users: newUsers,
    });
  }
);

app.post(
  "/login",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const loginPayload = req.body;
      const parsedPayload = createUser.safeParse(loginPayload);
      if (!parsedPayload.success) {
        res.status(411).json({
          msg: "You sent wrong inputs",
        });
        return;
      }
      const existingUser = await user.findOne({ email: loginPayload.email });

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
      console.error("Error in /login:", error); // ✅ Log actual error
      res.status(500).json({ msg: "Error finding user", error: error.message });
    }
  }
);

app.listen(3000);
