// types/express/index.d.ts
import { Request } from "express";

declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      role: "user" | "admin";
    }

    interface Request {
      user?: User;
    }
  }
}

export {};