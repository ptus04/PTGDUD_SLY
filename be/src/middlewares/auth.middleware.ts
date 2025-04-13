import config from "../configs/env";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, config.secretKey) as { uid: string };
    req.uid = decoded.uid;
  } catch (error) {
    res.status(401).json({ error: "Expired or invalid token." });
    return;
  }

  next();
};
