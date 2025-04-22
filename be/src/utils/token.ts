import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET_KEY ?? "development_secret_key";

export const generateUserToken = (_id: string, name: string, role: string) =>
  jwt.sign({ _id, name, role }, SECRET, { expiresIn: "7d" });
