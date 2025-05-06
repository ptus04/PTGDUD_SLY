import { Db, MongoClient } from "mongodb";

let client: MongoClient;
let db: Db;

const getDb = (): Db => {
  if (!db) {
    throw new Error("Database not initialized. Call initializeDatabase first.");
  }

  return db;
};

export const initializeDatabase = async (connStr: string, dbName: string) => {
  client = await MongoClient.connect(connStr);
  db = client.db(dbName);

  if (!(await db.collection("users").indexExists("phone_1"))) {
    await db.collection("users").createIndex({ phone: 1 }, { unique: true });
    console.log("Index on phone created");
  }

  if (!(await db.collection("otps").indexExists("createdAt_1"))) {
    await db.collection("otps").createIndex({ createdAt: 1 }, { expireAfterSeconds: 60 });
    console.log("Index on OTP phone created");
  }
};

export const closeDatabase = async () => {
  if (client) {
    await client.close();
    console.log("MongoDB connection closed");
  }
};

export default getDb;
