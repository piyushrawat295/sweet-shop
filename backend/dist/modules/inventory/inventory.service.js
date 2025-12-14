"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restock = exports.purchase = void 0;
const prisma_1 = require("../../config/prisma");
const purchase = async (id) => {
    return prisma_1.prisma.$transaction(async (tx) => {
        const sweet = await tx.sweet.findUnique({
            where: { id },
        });
        if (!sweet) {
            throw new Error("Sweet not found");
        }
        if (sweet.stock <= 0) {
            throw new Error("Out of stock");
        }
        return tx.sweet.update({
            where: { id },
            data: {
                stock: { decrement: 1 },
            },
        });
    });
};
exports.purchase = purchase;
const restock = async (id, qty) => {
    if (qty <= 0) {
        throw new Error("Invalid restock quantity");
    }
    return prisma_1.prisma.sweet.update({
        where: { id },
        data: {
            stock: { increment: qty },
        },
    });
};
exports.restock = restock;
