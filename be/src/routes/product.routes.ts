import { Router } from "express";
import { getProduct, getProducts } from "../controllers/product.controller";

const router = Router();
router.get("/", getProducts);
router.get("/:id", getProduct);

export default router;
