import express from "express";
import cors from "./middlewares/cors.middleware";
import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";
import logRequest from "./middlewares/logger.middleware";

const app = express();
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logRequest);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

export default app;
