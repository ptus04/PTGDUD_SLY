"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDatabase = exports.initializeDatabase = void 0;
const mongodb_1 = require("mongodb");
let client;
let db;
const getDb = () => {
    if (!db) {
        throw new Error("Database not initialized. Call initializeDatabase first.");
    }
    return db;
};
const initializeDatabase = async (connStr, dbName) => {
    client = await mongodb_1.MongoClient.connect(connStr);
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
exports.initializeDatabase = initializeDatabase;
const closeDatabase = async () => {
    if (client) {
        await client.close();
        console.log("MongoDB connection closed");
    }
};
exports.closeDatabase = closeDatabase;
exports.default = getDb;
