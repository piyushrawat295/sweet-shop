import { Router } from "express";
import { purchase, restock } from "./inventory.service";import { authMiddleware } from "../../middlewares/auth.middleware";import { adminOnly } from "../../middlewares/role.middleware";
const r = Router();
r.use(authMiddleware);

r.post("/:id/purchase", async (req, res) =>
  res.json(await purchase(+req.params.id))
);

r.post("/:id/restock", adminOnly, async (req, res) =>
  res.json(await restock(+req.params.id, req.body.qty))
);

export default r;
