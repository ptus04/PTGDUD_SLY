import { WithId } from "mongodb";
import User from "../types/User";

type UserLoginResponse = Pick<WithId<User>, "_id" | "name" | "role"> & {
  token: string;
};

export default UserLoginResponse;
