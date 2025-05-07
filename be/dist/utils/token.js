"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserToken = exports.generateUserToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.JWT_SECRET_KEY ?? "development_secret_key";
const generateUserToken = (_id, name, role) => {
    return jsonwebtoken_1.default.sign({ _id: _id.toHexString(), name, role }, SECRET, { expiresIn: "7d" });
};
exports.generateUserToken = generateUserToken;
const verifyUserToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, SECRET);
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return { error: "Expired token.", code: 401 };
        }
        else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return { error: "Invalid token.", code: 401 };
        }
        else if (error instanceof jsonwebtoken_1.default.NotBeforeError) {
            return { error: "Token not active.", code: 401 };
        }
        return { error: error.message, code: 500 };
    }
};
exports.verifyUserToken = verifyUserToken;
