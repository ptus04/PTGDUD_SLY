import { Request, Response } from "express";
import { authenticate, create, getUserById } from "../services/user.service";
import UserRegisterDTO from "@shared/dto/UserRegister.dto";
import UserLoginDTO from "@shared/dto/UserLogin.dto";
import { MongoError } from "mongodb";

export const register = async (req: Request, res: Response) => {
  try {
    const user = req.body as UserRegisterDTO;

    const _id = await create(user);
    res.status(201).json(_id);
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
    const user = req.body as UserLoginDTO;
    const data = await authenticate(user);

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
  let userId = req.params._id;
  if (!userId) {
    res.status(400).json({ error: "User ID is required" });
    return;
  }

  if (userId === "me") {
    userId = req._id;
  }

  try {
    const user = await getUserById(userId);

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
