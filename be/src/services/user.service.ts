import crypto from "node:crypto";
import config from "../configs/env";
import jwt from "jsonwebtoken";
import { db } from "../configs/db";
import { ObjectId } from "mongodb";
import User from "../types/User";
import UserLoginRequest from "../dto/UserLoginRequest";
import UserRegisterRequest from "../dto/UserRegisterRequest";
import Role from "../enums/Role";

const register = async (user: UserRegisterRequest) => {
  const hashedPassword = crypto
    .createHash("sha256")
    .update(user.password)
    .digest("base64");

  const result = await db().collection<User>("users").insertOne({
    phone: user.phone,
    name: user.name,
    password: hashedPassword,
    gender: user.gender,
    email: user.email,
    createdAt: new Date(),
    updatedAt: new Date(),
    role: Role.CUSTOMER,
  });

  return result;
};

const login = async (user: UserLoginRequest) => {
  const hashedPassword = crypto
    .createHash("sha256")
    .update(user.password)
    .digest("base64");

  const foundUser = await db().collection<User>("users").findOne({
    phone: user.phone,
    password: hashedPassword,
  });
  if (!foundUser) return null;

  const { _id, name, role } = foundUser;
  const token = jwt.sign({ _id, role }, config.secretKey, { expiresIn: "1d" });
  return { _id, name, role, token };
};

const getUserById = async (uid: string) => {
  const user = await db()
    .collection<User>("users")
    .findOne({ _id: new ObjectId(uid) });
  return user;
};

export default {
  register,
  login,
  getUserById,
};
