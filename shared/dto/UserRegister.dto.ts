import User from "../types/User";

type UserRegisterDTO = Pick<
  User,
  "_id" | "name" | "password" | "gender" | "email"
>;

export default UserRegisterDTO;
