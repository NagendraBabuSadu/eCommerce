import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";



export const blacklistedTokens = new Set<string>();


const isUser = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ msg: "Access denied" });
    }

    if(blacklistedTokens.has(token)) {
      return res.status(401).json({ message: "No token, authorization denied." });
    }

    // const isBlacklisted = await redis.get(`blacklist: ${token}`)

    // if(isBlacklisted){
    //   return res.status(401).json({ msg: "Session expired. Please log in again." });
    // }



    const decoded: any = jwt.verify(token, process.env.JWT_SECRET) as {id: string};
    const user = await userModel.findById(decoded.id);

    if (!user || user.role !== "user") {
      return res.status(403).json({ msg: "Unauthorized access" });
    }

    req.user = { id: decoded.id }; 
    
    next();
  } catch (error) {
    res.status(500).json({ msg: "Error in authorization", error });
  }
};

export default isUser;
