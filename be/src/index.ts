import config from "./configs/env";
import app from "./app";
import { connectToDatabase } from "./configs/db";

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
