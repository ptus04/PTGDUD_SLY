import { WithId } from "mongodb";
import Role from "../enums/Role";

export default interface User {
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
  role: Role;
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
