import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ?? "development_secret_key";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.signedCookies["token"] ?? req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
    req._id = decoded._id;
    req.role = decoded.role;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: "Expired token." });
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: "Invalid token." });
    } else if (error instanceof jwt.NotBeforeError) {
      res.status(401).json({ error: "Token not active." });
    } else if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }

  next();
};
