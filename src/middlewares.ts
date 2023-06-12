import jwt from "jsonwebtoken";
import configs from "./configs";
import { ObjectId } from "mongodb";
import ErrorResponse from "./interfaces/ErrorResponse";
import { NextFunction, Request, Response } from "express";
import User from "./models/user";

const secret = configs.jwt_secret;

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
}

export async function authMiddleware(
  req: any,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, secret) as any;

    const user = await User.findOne({ _id: new ObjectId(decoded.sub) });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user to req object
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error });
  }
}
