"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.requestOtp = exports.logout = exports.updateUser = exports.getUsers = exports.getUser = exports.login = exports.register = void 0;
const express_validator_1 = require("express-validator");
const mongodb_1 = require("mongodb");
const user_service_1 = __importDefault(require("../services/user.service"));
const register = async (req, res) => {
    const user = (0, express_validator_1.matchedData)(req);
    try {
        await user_service_1.default.register(user.phone, user.name, user.password, user.gender);
        const data = await user_service_1.default.login(user.phone, user.password);
        afterAuth(res, data);
    }
    catch (error) {
        if (error instanceof mongodb_1.MongoError && error.code === 11000) {
            res.status(409).json({ error: "Phone number already exists." });
        }
        else if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
};
exports.register = register;
const login = async (req, res) => {
    const user = (0, express_validator_1.matchedData)(req);
    const data = await user_service_1.default.login(user.phone, user.password);
    if (!data) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
    }
    afterAuth(res, data);
};
exports.login = login;
const afterAuth = (res, data) => {
    res
        .status(200)
        .cookie("token", data.token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7,
    })
        .json(data);
};
const getUser = async (req, res) => {
    const data = (0, express_validator_1.matchedData)(req);
    const id = data.id === "me" ? req._id : data.id;
    const user = await user_service_1.default.getUserById(id);
    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }
    res.status(200).json(user);
};
exports.getUser = getUser;
const getUsers = async (req, res) => {
    const user = await user_service_1.default.getAllUser();
    res.status(200).json(user);
};
exports.getUsers = getUsers;
const updateUser = async (req, res) => {
    const data = (0, express_validator_1.matchedData)(req, { onlyValidData: true });
    await user_service_1.default.updateUser(req._id, data);
    res.status(200).json({ message: "User updated successfully", user: { ...data } });
};
exports.updateUser = updateUser;
const logout = async (req, res) => {
    res.status(200).clearCookie("token").json({ message: "Logout successfully" });
};
exports.logout = logout;
const requestOtp = async (req, res) => {
    const data = (0, express_validator_1.matchedData)(req);
    const otp = await user_service_1.default.sendOtp(data.phone, data.action);
    if (!otp) {
        res.status(404).json({ error: "Phone number not found" });
        return;
    }
    if (otp.message === "OTP already sent") {
        res.status(400).json({ error: "Please wait at least 60 seconds before requesting another OTP" });
        return;
    }
    res.status(200).json({ message: "OTP sent successfully" });
};
exports.requestOtp = requestOtp;
const resetPassword = async (req, res) => {
    const data = (0, express_validator_1.matchedData)(req);
    const result = await user_service_1.default.resetPassword(data.phone, data.otp, data.password);
    if (!result) {
        res.status(403).json({ error: "Invalid OTP" });
        return;
    }
    res.status(200).json({ message: "Password reset successfully" });
};
exports.resetPassword = resetPassword;
