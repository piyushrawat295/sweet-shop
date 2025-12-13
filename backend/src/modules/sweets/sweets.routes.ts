import { Router } from "express";
import * as c from "./sweets.controller";import { authMiddleware } from "../../middlewares/auth.middleware";import { adminOnly } from "../../middlewares/role.middleware";
const r = Router();
r.use(authMiddleware);

r.post("/", c.create);
r.get("/", c.list);
r.get("/search", c.search);
r.put("/:id", c.update);
r.delete("/:id", adminOnly, c.remove);

export default r;
