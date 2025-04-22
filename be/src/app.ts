import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import responseTime from "response-time";
import productRoutes from "./routes/product.routes";
import userRoutes from "./routes/user.routes";

const COOKIES_SECRET = process.env.COOKIES_SECRET ?? "development_secret_key";

const app = express();
app.set("trust proxy", 1);
app.disable("x-powered-by");

app.use(cors());
app.use(morgan("common"));
app.use(responseTime());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(COOKIES_SECRET));

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

export default app;
