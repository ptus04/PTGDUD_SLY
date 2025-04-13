import User from "../types/User";

type UserRegisterRequest = Pick<
  User,
  "phone" | "name" | "password" | "gender" | "email"
>;

export default UserRegisterRequest;
