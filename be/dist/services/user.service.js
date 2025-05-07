"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const database_1 = __importDefault(require("../database"));
const hashing_1 = require("../utils/hashing");
const token_1 = require("../utils/token");
const register = async (phone, name, password, gender) => {
    const role = "customer";
    const hashedPassword = (0, hashing_1.hashToBase64)(password);
    const result = await (0, database_1.default)().collection("users").insertOne({
        phone,
        name,
        password: hashedPassword,
        gender,
        createdAt: new Date(),
        updatedAt: new Date(),
        role,
    });
    const userId = result.insertedId;
    const token = (0, token_1.generateUserToken)(userId, name, role);
    return { _id: userId, name, role, token };
};
const login = async (phone, password) => {
    const hashedPassword = (0, hashing_1.hashToBase64)(password);
    const user = await (0, database_1.default)().collection("users").findOne({ phone, password: hashedPassword });
    if (!user) {
        return null;
    }
    const token = (0, token_1.generateUserToken)(user._id, user.name, user.role);
    const { password: userPassword, ...userWithoutPassword } = user;
    return { ...userWithoutPassword, token };
};
const getUserById = (userId) => {
    return (0, database_1.default)()
        .collection("users")
        .findOne({ _id: new mongodb_1.ObjectId(userId) }, { projection: { password: 0 } });
};
const updateUser = async (userId, userUpdated) => {
    await (0, database_1.default)()
        .collection("users")
        .updateOne({ _id: new mongodb_1.ObjectId(userId) }, { $set: { ...userUpdated, updatedAt: new Date() } });
};
const sendOtp = async (phone, action) => {
    const user = await (0, database_1.default)().collection("users").findOne({ phone });
    if (!user) {
        return null;
    }
    const existingOtp = await (0, database_1.default)().collection("otps").findOne({ phone });
    if (existingOtp) {
        return { message: "OTP already sent" };
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await (0, database_1.default)().collection("otps").insertOne({ phone, otp, action, createdAt: new Date() });
    // Simulate sending OTP via SMS
    console.log(`Sending OTP ${otp} to phone ${phone}`);
    return { message: "OTP sent successfully" };
};
const resetPassword = async (phone, otp, newPassword) => {
    const otpRecord = await (0, database_1.default)().collection("otps").findOne({ phone, otp });
    if (!otpRecord) {
        return null;
    }
    const hashedPassword = (0, hashing_1.hashToBase64)(newPassword);
    await (0, database_1.default)()
        .collection("users")
        .updateOne({ phone }, { $set: { password: hashedPassword } });
    await (0, database_1.default)().collection("otps").deleteOne({ phone, otp });
    return { message: "Password reset successfully" };
};
const getAllUser = () => {
    return (0, database_1.default)()
        .collection("users")
        .find({}, { projection: { password: 0 } })
        .toArray();
};
exports.default = { register, login, getUserById, updateUser, sendOtp, resetPassword, getAllUser };
