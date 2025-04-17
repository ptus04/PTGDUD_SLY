import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import UserModel, {
  User,
  UserRegisterRequest,
  UserLoginRequest,
  UserLoginResponse,
} from "../models/User.model";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ?? "development_secret_key";

const hash = (v: string) =>
  crypto.createHash("sha256").update(v).digest("base64");

const register = async (user: UserRegisterRequest) =>
  await UserModel.insertOne({
    phone: user.phone,
    name: user.name,
    password: hash(user.password),
    gender: user.gender,
    email: user.email,
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "customer",
  } as User);

const login = async (user: UserLoginRequest) => {
  const dbUser = await UserModel.findOne({
    phone: user.phone,
    password: hash(user.password),
  });
  if (!dbUser) {
    return null;
  }

  const { _id, name, role } = dbUser;
  const token = jwt.sign({ _id, role }, JWT_SECRET_KEY, { expiresIn: "1d" });

  return { _id, name, role, token } as UserLoginResponse;
};

const getUserById = async (uid: string) =>
  await UserModel.findOne({ _id: new ObjectId(uid) });

export default { register, login, getUserById };
