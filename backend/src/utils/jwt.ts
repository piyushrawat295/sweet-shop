import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

export const signToken = (payload: { id: number; role: string }) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
