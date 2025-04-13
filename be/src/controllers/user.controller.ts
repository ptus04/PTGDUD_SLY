import { Request, Response } from "express";
import { MongoError } from "mongodb";
import userService from "../services/user.service";
import UserRegisterRequest from "../dto/UserRegisterRequest";
import UserLoginRequest from "../dto/UserLoginRequest";

export const register = async (req: Request, res: Response) => {
  try {
    const user = req.body as UserRegisterRequest;

    const result = await userService.register(user);
    res.status(201).json({ uid: result.insertedId });
  } catch (error) {
    if (error instanceof MongoError && error.code === 11000) {
      res.status(409).json({ error: "User already exists" });
    } else if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = req.body as UserLoginRequest;
    const data = await userService.login(user);

    if (!data) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const getUser = async (req: Request, res: Response) => {
  const uid = req.params.uid === "me" ? req.uid : req.params.uid;
  if (!uid) {
    res.status(400).json({ error: "User ID is required" });
    return;
  }

  try {
    const user = await userService.getUserById(uid);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const { password, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};
