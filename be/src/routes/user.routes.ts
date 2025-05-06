import { Router } from "express";
import { body, cookie, param } from "express-validator";
import {
  getUser,
  login,
  logout,
  register,
  updateUser,
  requestOtp,
  resetPassword,
} from "../controllers/user.controller";
import { auth } from "../middlewares/auth.middleware";
import handleBadRequest from "../utils/handleBadRequest";

const registerValidator = [
  body("phone").isLength({ min: 10, max: 10 }).isMobilePhone("vi-VN").withMessage("Invalid phone number"),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
  body("name").notEmpty().withMessage("Name is required"),
  body("gender").isBoolean().withMessage("Gender must be a boolean"),
];

const loginValidator = [
  body("phone").isLength({ min: 10, max: 10 }).isMobilePhone("vi-VN").withMessage("Invalid phone number"),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
];

const getUserValidator = [
  param("id").custom((value) => {
    if (!/(me)|([0-9a-fA-F]{24})/.test(value)) {
      throw new Error("ID must be 'me' or a valid MongoDB ObjectId format");
    }

    return true;
  }),
];

const updateUserValidator = [
  body("name").optional().notEmpty().withMessage("Name is not empty"),
  body("phone").optional().isLength({ min: 10, max: 10 }).isMobilePhone("vi-VN").withMessage("Invalid phone number"),
  body("gender").optional().isBoolean().withMessage("Gender must be a boolean"),
  body("city").optional().notEmpty().withMessage("City is not empty"),
  body("district").optional().notEmpty().withMessage("District is not empty"),
  body("ward").optional().notEmpty().withMessage("Ward is not empty"),
  body("address").optional().notEmpty().withMessage("Address is not empty"),
  body("dateOfBirth").optional().isISO8601().withMessage("Date of birth must be a valid ISO8601 date"),
];

const logoutValidator = [cookie("token").exists().withMessage("Token is required")];

const requestOtpValidator = [
  body("phone").isLength({ min: 10, max: 10 }).isMobilePhone("vi-VN").withMessage("Invalid phone number"),
  body("action").isIn(["register", "reset-password"]).withMessage("Invalid action"),
];

const resetPasswordValidator = [
  body("phone").isLength({ min: 10, max: 10 }).isMobilePhone("vi-VN").withMessage("Invalid phone number"),
  body("otp").isLength({ min: 6, max: 6 }).withMessage("Invalid OTP"),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
];

const router = Router();
router.post("/register", registerValidator, handleBadRequest, register);
router.post("/login", loginValidator, handleBadRequest, login);
router.post("/otp", requestOtpValidator, handleBadRequest, requestOtp);
router.post("/reset-password", resetPasswordValidator, handleBadRequest, resetPassword);

router.use(auth);
router.put("/me", updateUserValidator, handleBadRequest, updateUser);
router.get("/logout", logoutValidator, handleBadRequest, logout);
router.get("/:id", getUserValidator, handleBadRequest, getUser);

export default router;
