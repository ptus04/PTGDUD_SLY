import { Router } from "express";
import { getProduct, getProducts } from "../controllers/product.controller";
import { param } from "express-validator";

const getProductValidator = [param("pid").notEmpty().isMongoId()];

const router = Router();
router.get("/", getProducts);
router.get("/:pid", getProductValidator, getProduct);

export default router;
