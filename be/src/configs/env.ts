import "dotenv/config";

export default {
  port: process.env.PORT || 8080,
  mongoUri: process.env.MONGODB_URI || "mongodb://localhost:27017/",
  dbName: process.env.DB_NAME || "sly",
  secretKey: process.env.JWT_SECRET_KEY || "development_secret_key",
};
