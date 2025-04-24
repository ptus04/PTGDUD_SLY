import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

const SECRET = process.env.JWT_SECRET_KEY ?? "development_secret_key";

export const generateUserToken = (_id: ObjectId, name: string, role: string) =>
  jwt.sign({ _id: _id.toHexString(), name, role }, SECRET, { expiresIn: "7d" });
