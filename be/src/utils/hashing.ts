import { createHash } from "node:crypto";

export const hashToBase64 = (v: string) => createHash("sha256").update(v).digest("base64");
