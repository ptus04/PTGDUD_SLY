import { NextFunction, Request, Response } from "express";
import { verifyUserToken } from "../utils/token";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.signedCookies["token"] ?? req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const result = verifyUserToken(token);
  if (result.code) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  req._id = result._id;
  req.role = result.role;

  next();
};
