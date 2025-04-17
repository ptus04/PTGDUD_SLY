import express from "express";
import cors from "cors";
import morgan from "morgan";
import responseTime from "response-time";
import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";

const app = express();
app.set("trust proxy", 1);
app.disable("x-powered-by");

app.use(cors());
app.use(morgan("common"));
app.use(responseTime());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

export default app;
