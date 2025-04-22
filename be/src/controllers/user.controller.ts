import { Request, Response } from "express";
import { UserRegisterRequest, UserLoginRequest } from "../models/User.model";
import userService from "../services/user.service";
import { MongoError } from "mongodb";
import { matchedData, validationResult } from "express-validator";

export const register = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }

  const user = matchedData<UserRegisterRequest>(req);
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

  const user = matchedData<UserLoginRequest>(req);
  const data = await userService.login(user);

  if (!data) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  res
    .status(200)
    .cookie("token", data.token, {
      httpOnly: true,
      sameSite: "strict",
      signed: true,
    })
    .json(data);
};

export const getUser = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }

  const data = matchedData<{ uid: string }>(req);
  const uid = data.uid === "me" ? req._id : data.uid;

  const user = await userService.getUserById(uid);
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  const { password, ...userWithoutPassword } = user;
  res.status(200).json(userWithoutPassword);
};
