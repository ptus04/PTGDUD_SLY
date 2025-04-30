type User = {
  phone: string;
  password: string;
  name: string;
  gender: boolean;
  address?: string;
  city?: string;
  district?: string;
  ward?: string;
  dateOfBirth?: string;
  createdAt: Date;
  updatedAt: Date;
  role: "customer" | "admin";
};
export type UserRegisterRequest = Pick<User, "phone" | "name" | "password" | "gender">;
export type UserLoginRequest = Pick<User, "phone" | "password">;

export default User;
