declare namespace Express {
  export interface Request {
    _id: string;
    role: "customer" | "admin";
  }
}
