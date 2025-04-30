import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { MongoError } from "mongodb";
import { UserLoginRequest, UserRegisterRequest } from "../models/User.model";
import userService from "../services/user.service";

export const register = async (req: Request, res: Response) => {
  const user = matchedData<UserRegisterRequest>(req);

  try {
    await userService.register(user.phone, user.name, user.password, user.gender);

    const data = await userService.login(user.phone, user.password);
    afterAuth(res, data);
  } catch (error) {
    if (error instanceof MongoError && error.code === 11000) {
      res.status(409).json({ error: "Phone number already exists." });
    } else if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  const user = matchedData<UserLoginRequest>(req);
  const data = await userService.login(user.phone, user.password);

  if (!data) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  afterAuth(res, data);
};

const afterAuth = (res: Response, data: any) => {
  res
    .status(200)
    .cookie("token", data.token, {
      httpOnly: true,
      sameSite: "strict",
      signed: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })
    .json(data);
};

export const getUser = async (req: Request, res: Response) => {
  const data = matchedData<{ id: string }>(req);
  const id = data.id === "me" ? req._id : data.id;

  const user = await userService.getUserById(id);
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  res.status(200).json(user);
};
