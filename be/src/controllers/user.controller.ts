import { Request, Response } from "express";
import { UserRegisterRequest, UserLoginRequest } from "../models/User.model";
import userService from "../services/user.service";
import { MongoError } from "mongodb";
import { validationResult } from "express-validator";

export const register = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }

  const user = req.body as UserRegisterRequest;
  try {
    const result = await userService.register(user);
    res.status(201).json({ uid: result.insertedId });
  } catch (error) {
    if (error instanceof MongoError && error.code === 11000) {
      res.status(409).json({ error: "User already exists" });
      return;
    }
  }
};

export const login = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }

  const user = req.body as UserLoginRequest;
  const data = await userService.login(user);

  if (!data) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  res.status(200).json(data);
};

export const getUser = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }

  const uid = req.params.uid === "me" ? req._id : req.params.uid;

  const user = await userService.getUserById(uid);
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  const { password, ...userWithoutPassword } = user;
  res.status(200).json(userWithoutPassword);
};
