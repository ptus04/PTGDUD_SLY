"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const token_1 = require("../utils/token");
const auth = (req, res, next) => {
    const token = req.cookies?.["token"] ?? req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    const result = (0, token_1.verifyUserToken)(token);
    if (result.code) {
        res.status(401).clearCookie("token").json({ error: "Unauthorized", message: result.error });
        return;
    }
    req._id = result._id;
    req.role = result.role;
    next();
};
exports.auth = auth;
