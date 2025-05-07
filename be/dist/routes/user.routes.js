"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const handleBadRequest_1 = __importDefault(require("../utils/handleBadRequest"));
const registerValidator = [
    (0, express_validator_1.body)("phone").isLength({ min: 10, max: 10 }).isMobilePhone("vi-VN").withMessage("Invalid phone number"),
    (0, express_validator_1.body)("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required"),
    (0, express_validator_1.body)("gender").isBoolean().withMessage("Gender must be a boolean"),
];
const loginValidator = [
    (0, express_validator_1.body)("phone").isLength({ min: 10, max: 10 }).isMobilePhone("vi-VN").withMessage("Invalid phone number"),
    (0, express_validator_1.body)("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
];
const getUserValidator = [
    (0, express_validator_1.param)("id").custom((value) => {
        if (!/(me)|([0-9a-fA-F]{24})/.test(value)) {
            throw new Error("ID must be 'me' or a valid MongoDB ObjectId format");
        }
        return true;
    }),
];
const updateUserValidator = [
    (0, express_validator_1.body)("name").optional().notEmpty().withMessage("Name is not empty"),
    (0, express_validator_1.body)("phone").optional().isLength({ min: 10, max: 10 }).isMobilePhone("vi-VN").withMessage("Invalid phone number"),
    (0, express_validator_1.body)("gender").optional().isBoolean().withMessage("Gender must be a boolean"),
    (0, express_validator_1.body)("city").optional().notEmpty().withMessage("City is not empty"),
    (0, express_validator_1.body)("district").optional().notEmpty().withMessage("District is not empty"),
    (0, express_validator_1.body)("ward").optional().notEmpty().withMessage("Ward is not empty"),
    (0, express_validator_1.body)("address").optional().notEmpty().withMessage("Address is not empty"),
    (0, express_validator_1.body)("dateOfBirth").optional().isISO8601().withMessage("Date of birth must be a valid ISO8601 date"),
];
const logoutValidator = [(0, express_validator_1.cookie)("token").exists().withMessage("Token is required")];
const requestOtpValidator = [
    (0, express_validator_1.body)("phone").isLength({ min: 10, max: 10 }).isMobilePhone("vi-VN").withMessage("Invalid phone number"),
    (0, express_validator_1.body)("action").isIn(["register", "reset-password"]).withMessage("Invalid action"),
];
const resetPasswordValidator = [
    (0, express_validator_1.body)("phone").isLength({ min: 10, max: 10 }).isMobilePhone("vi-VN").withMessage("Invalid phone number"),
    (0, express_validator_1.body)("otp").isLength({ min: 6, max: 6 }).withMessage("Invalid OTP"),
    (0, express_validator_1.body)("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
];
const router = (0, express_1.Router)();
router.get("/", user_controller_1.getUsers);
router.post("/register", registerValidator, handleBadRequest_1.default, user_controller_1.register);
router.post("/login", loginValidator, handleBadRequest_1.default, user_controller_1.login);
router.post("/otp", requestOtpValidator, handleBadRequest_1.default, user_controller_1.requestOtp);
router.post("/reset-password", resetPasswordValidator, handleBadRequest_1.default, user_controller_1.resetPassword);
router.use(auth_middleware_1.auth);
router.put("/me", updateUserValidator, handleBadRequest_1.default, user_controller_1.updateUser);
router.get("/logout", logoutValidator, handleBadRequest_1.default, user_controller_1.logout);
router.get("/:id", getUserValidator, handleBadRequest_1.default, user_controller_1.getUser);
exports.default = router;
