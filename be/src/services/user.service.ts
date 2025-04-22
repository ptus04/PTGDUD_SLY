import { ObjectId } from "mongodb";
import db from "../database";
import User from "../models/User.model";
import { hashToBase64 } from "../utils/hashing";
import { generateUserToken } from "../utils/token";

const register = async (phone: string, name: string, password: string, gender: boolean, email?: string) => {
  const role = "customer";
  const { insertedId } = await db()
    .collection<User>("users")
    .insertOne({
      phone,
      name,
      password: hashToBase64(password),
      gender,
      email,
      createdAt: new Date(),
      updatedAt: new Date(),
      role,
    });

  const token = generateUserToken(insertedId.toHexString(), name, role);
  return { _id: insertedId, name, role, token };
};

const login = async (phone: string, password: string) => {
  const user = await db()
    .collection<User>("users")
    .findOne({ phone, password: hashToBase64(password) });
  if (!user) return null;

  const token = generateUserToken(user._id.toHexString(), user.name, user.role);
  return { _id: user._id, name: user.name, role: user.role, token };
};

const getUserById = (id: string) =>
  db()
    .collection<User>("users")
    .findOne({ _id: new ObjectId(id) }, { projection: { password: 0 } });

export default { register, login, getUserById } as const;
