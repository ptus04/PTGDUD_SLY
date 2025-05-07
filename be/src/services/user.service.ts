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
  const { password: userPassword, ...userWithoutPassword } = user;
  return { ...userWithoutPassword, token };
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

const sendOtp = async (phone: string, action: string) => {
  const user = await db().collection<User>("users").findOne({ phone });
  if (!user) {
    return null;
  }

  const existingOtp = await db().collection("otps").findOne({ phone });
  if (existingOtp) {
    return { message: "OTP already sent" };
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await db().collection("otps").insertOne({ phone, otp, action, createdAt: new Date() });

  // Simulate sending OTP via SMS
  console.log(`Sending OTP ${otp} to phone ${phone}`);
  return { message: "OTP sent successfully" };
};

const resetPassword = async (phone: string, otp: string, newPassword: string) => {
  const otpRecord = await db().collection("otps").findOne({ phone, otp });
  if (!otpRecord) {
    return null;
  }

  const hashedPassword = hashToBase64(newPassword);
  await db()
    .collection<User>("users")
    .updateOne({ phone }, { $set: { password: hashedPassword } });

  await db().collection("otps").deleteOne({ phone, otp });

  return { message: "Password reset successfully" };
};

const getAllUser = () => {
  return db()
    .collection<User>("users")
    .find({}, { projection: { password: 0 } })
    .toArray();
};

export default { register, login, getUserById, updateUser, sendOtp, resetPassword, getAllUser } as const;
