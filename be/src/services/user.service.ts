import crypto from "node:crypto";
import config from "../configs/env";
import { db } from "../configs/db";
import User from "@shared/types/User";
import UserLoginDTO from "@shared/dto/UserLogin.dto";
import UserRegisterDTO from "@shared/dto/UserRegister.dto";
import jwt from "jsonwebtoken";

export const create = async (user: UserRegisterDTO) => {
  const hashedPassword = crypto
    .createHash("sha256")
    .update(user.password)
    .digest("base64");

  const { insertedId } = await db().collection<User>("users").insertOne({
    _id: user._id,
    name: user.name,
    password: hashedPassword,
    gender: user.gender,
    email: user.email,
  });

  return { _id: insertedId };
};

export const authenticate = async (user: UserLoginDTO) => {
  const hashedPassword = crypto
    .createHash("sha256")
    .update(user.password)
    .digest("base64");

  const foundUser = await db().collection<User>("users").findOne({
    _id: user._id,
    password: hashedPassword,
  });

  if (!foundUser) {
    return null;
  }

  const token = jwt.sign({ _id: foundUser._id }, config.secretKey, {
    expiresIn: "1d",
  });

  return {
    _id: foundUser._id,
    name: foundUser.name,
    token,
  };
};

export const getUserById = async (id: string) => {
  const user = await db().collection<User>("users").findOne({
    _id: id,
  });
  return user;
};
