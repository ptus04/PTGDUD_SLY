import "dotenv/config";
import app from "./app";
import { closeDatabase, initializeDatabase } from "./database";

const PORT = process.env.PORT ?? 8080;
const CONNECTION_STRING =
  process.env.MONGODB_CONNECTION_STRING ?? "mongodb://localhost:27017/sly";
const DB_NAME = process.env.DB_NAME ?? "sly";

const startServer = async () => {
  try {
    await initializeDatabase(CONNECTION_STRING, DB_NAME);
    console.log("Connected to MongoDB");

    const server = app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);

      process.on("SIGTERM", () => {
        console.log("SIGTERM signal received: closing HTTP server");
        server.close(async () => {
          console.log("HTTP server closed");

          await closeDatabase();
          console.log("MongoDB connection closed");

          process.exit(0);
        });
      });
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
