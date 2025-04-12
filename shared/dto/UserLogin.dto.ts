import User from "../types/User";

type UserLoginDTO = Pick<User, "_id" | "password">;

export default UserLoginDTO;
