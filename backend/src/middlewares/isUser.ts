import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";



export const blacklistedTokens = new Set<string>();


const isUser = async function (
  req: Request,
  res: Response,
  next: NextFunction
) : Promise<void> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return void res.status(403).json({ msg: "Access denied" });
    }

    if(blacklistedTokens.has(token)) {
      return void res.status(401).json({ message: "No token, authorization denied." });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string) as {id: string};
    const user = await userModel.findById(decoded.id);

    if (!user || user.role !== "user") {
      return void res.status(403).json({ msg: "Unauthorized access" });
    }

    req.user = { id: decoded.id }; 
    
    next();
  } catch (error) {
    res.status(500).json({ msg: "Error in authorization", error });
  }
};

export default isUser;
