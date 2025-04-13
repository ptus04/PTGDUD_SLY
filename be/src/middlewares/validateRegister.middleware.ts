import { Request, Response, NextFunction } from "express";
import UserRegisterRequest from "../dto/UserRegisterRequest";

const validateRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.body as UserRegisterRequest;

  if (
    !user.name ||
    !user.phone ||
    !user.password ||
    user.gender === undefined
  ) {
    res.status(400).json({ error: "Missing required fields." });
    return;
  }

  const phoneRegex = /^0[2-9]\d{8}$/;
  if (!phoneRegex.test(user.phone)) {
    res.status(400).json({ error: "Invalid phone number format." });
    return;
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&_]).{8,}$/;
  if (!passwordRegex.test(user.password)) {
    res.status(400).json({
      error:
        "Password must be at least 8 characters long and contain at least one letter, one number, and one special character.",
    });
    return;
  }

  const nameRegex = /^([A-Z][a-z]*)(\s[A-Z][a-z]*)+$/;
  const normalizedName = user.name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  if (!nameRegex.test(normalizedName)) {
    res.status(400).json({ error: "Invalid name format." });
    return;
  }

  if (typeof user.gender !== "boolean") {
    res.status(400).json({ error: "Invalid gender value." });
    return;
  }

  const emailRegex = /^[\w\d]{5,24}@\w{3,6}\.[A-z]{2,4}$/;
  if (user.email && !emailRegex.test(user.email)) {
    res.status(400).json({ error: "Invalid email format." });
    return;
  }

  next();
};

export { validateRegister };
