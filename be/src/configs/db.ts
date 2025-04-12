import config from "./env";
import { Db, MongoClient } from "mongodb";

let dbInstance: Db;

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(config.mongoUri);
  dbInstance = client.db(config.dbName);
  console.log("Connected to MongoDB");
};

export const db = () => {
  if (!dbInstance) {
    throw new Error("Database not initialized. Call connectToDatabase first.");
  }
  return dbInstance;
};
