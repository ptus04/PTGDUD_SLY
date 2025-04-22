import { WithId } from "mongodb";

type User = {
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
};
export type UserRegisterRequest = Pick<User, "phone" | "name" | "password" | "gender" | "email">;
export type UserLoginRequest = Pick<User, "phone" | "password">;

export default User;
