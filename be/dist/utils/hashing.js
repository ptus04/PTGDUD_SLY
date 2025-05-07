"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashToBase64 = void 0;
const node_crypto_1 = require("node:crypto");
const hashToBase64 = (v) => (0, node_crypto_1.createHash)("sha256").update(v).digest("base64");
exports.hashToBase64 = hashToBase64;
