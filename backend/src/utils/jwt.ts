import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

export const signToken = (payload: object) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
