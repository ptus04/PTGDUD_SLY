import { ObjectId } from "mongodb";
import db from "../database";
import User, { UserUpdateRequest } from "../models/User.model";
import { hashToBase64 } from "../utils/hashing";
import { generateUserToken } from "../utils/token";

const register = async (phone: string, name: string, password: string, gender: boolean) => {
  const role = "customer";
  const hashedPassword = hashToBase64(password);

  const result = await db().collection<User>("users").insertOne({
    phone,
    name,
    password: hashedPassword,
    gender,
    createdAt: new Date(),
    updatedAt: new Date(),
    role,
  });

  const userId = result.insertedId;
  const token = generateUserToken(userId, name, role);
  return { _id: userId, name, role, token };
};

const login = async (phone: string, password: string) => {
  const hashedPassword = hashToBase64(password);
  const user = await db().collection<User>("users").findOne({ phone, password: hashedPassword });
  if (!user) {
    return null;
  }

  const token = generateUserToken(user._id, user.name, user.role);
  return { _id: user._id, name: user.name, role: user.role, token };
};

const getUserById = (userId: string) => {
  return db()
    .collection<User>("users")
    .findOne({ _id: new ObjectId(userId) }, { projection: { password: 0 } });
};

const updateUser = async (userId: string, userUpdated: UserUpdateRequest) => {
  await db()
    .collection<User>("users")
    .updateOne({ _id: new ObjectId(userId) }, { $set: { ...userUpdated, updatedAt: new Date() } });
};

export default { register, login, getUserById, updateUser } as const;
