import { NextFunction, Request, Response } from "express";

const logRequest = (req: Request, res: Response, next: NextFunction) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} request to ${req.url} - User-Agent: ${req.headers["user-agent"]} - IP: ${req.ip}`
  );

  next();
};

export default logRequest;
