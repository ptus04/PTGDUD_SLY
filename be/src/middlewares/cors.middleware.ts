import config from "../configs/env";
import { NextFunction, Request, Response } from "express";

const cors = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", config.corsOrigin);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
    return;
  }

  next();
};

export default cors;
