import { Filter, WithId } from "mongodb";
import db from "../database";

export interface User {
  phone: string;
  password: string;
  name: string;
  gender: boolean;
  email?: string;
  address?: string;
  city?: string;
  district?: string;
  ward?: string;
  dateOfBirth?: string;
  createdAt: Date;
  updatedAt: Date;
  role: "customer" | "admin";
}
export type UserWithId = WithId<User>;
export type UserWithoutPassword = Omit<UserWithId, "password">;

export type UserRegisterRequest = Pick<
  User,
  "phone" | "name" | "password" | "gender" | "email"
>;
export type UserLoginRequest = Pick<User, "phone" | "password">;
export type UserLoginResponse = Pick<UserWithId, "_id" | "name" | "role"> & {
  token: string;
};

export default class UserModel {
  static async findOne(filter: Filter<User>) {
    return await db().collection<User>("users").findOne(filter);
  }

  static async insertOne(user: User) {
    return await db().collection<User>("users").insertOne(user);
  }
}
