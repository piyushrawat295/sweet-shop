import { Router } from "express";

import authRoutes from "./modules/auth/auth.routes";
import sweetsRoutes from "./modules/sweets/sweets.routes";
import inventoryRoutes from "./modules/inventory/inventory.routes";

const router = Router();

// Auth
router.use("/auth", authRoutes);

// Sweets
router.use("/sweets", sweetsRoutes);

// Inventory (purchase / restock)
router.use("/inventory", inventoryRoutes);

export default router;
