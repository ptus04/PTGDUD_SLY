"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const cart_controller_1 = require("../controllers/cart.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const handleBadRequest_1 = __importDefault(require("../utils/handleBadRequest"));
const updateCartValidator = [(0, express_validator_1.body)().isArray().withMessage("Body must be an array")];
const router = (0, express_1.Router)();
router.use(auth_middleware_1.auth);
router.get("/", cart_controller_1.getCart);
router.put("/", updateCartValidator, handleBadRequest_1.default, cart_controller_1.updateCart);
exports.default = router;
