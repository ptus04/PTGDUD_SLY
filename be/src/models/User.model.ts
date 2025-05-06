type User = {
  phone: string;
  password: string;
  name: string;
  gender: boolean;
  city?: string;
  district?: string;
  ward?: string;
  address?: string;
  dateOfBirth?: string;
  createdAt: Date;
  updatedAt: Date;
  role: "customer" | "admin";
};
export type UserRegisterRequest = Pick<User, "phone" | "name" | "password" | "gender">;
export type UserLoginRequest = Pick<User, "phone" | "password">;
export type UserUpdateRequest = Partial<Omit<User, "password" | "createdAt" | "updatedAt" | "role">>;

export default User;
