import User from "../types/User";

type UserLoginRequest = Pick<User, "phone" | "password">;

export default UserLoginRequest;
