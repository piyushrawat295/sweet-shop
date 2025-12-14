"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const sweets_routes_1 = __importDefault(require("./modules/sweets/sweets.routes"));
const inventory_routes_1 = __importDefault(require("./modules/inventory/inventory.routes"));
const router = (0, express_1.Router)();
// Auth
router.use("/auth", auth_routes_1.default);
// Sweets
router.use("/sweets", sweets_routes_1.default);
// Inventory (purchase / restock)
router.use("/inventory", inventory_routes_1.default);
exports.default = router;
