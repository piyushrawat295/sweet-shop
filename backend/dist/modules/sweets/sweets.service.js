"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseSweet = exports.deleteSweet = exports.updateSweet = exports.search = exports.getAll = exports.createSweet = void 0;
const prisma_1 = require("../../config/prisma");
const createSweet = (data) => prisma_1.prisma.sweet.create({ data });
exports.createSweet = createSweet;
const getAll = () => prisma_1.prisma.sweet.findMany();
exports.getAll = getAll;
const search = (q) => prisma_1.prisma.sweet.findMany({
    where: {
        name: q.name,
        category: q.category,
        price: q.min && q.max ? { gte: +q.min, lte: +q.max } : undefined
    }
});
exports.search = search;
const updateSweet = (id, data) => prisma_1.prisma.sweet.update({ where: { id }, data });
exports.updateSweet = updateSweet;
const deleteSweet = (id) => prisma_1.prisma.sweet.delete({ where: { id } });
exports.deleteSweet = deleteSweet;
/* =========================
   ✅ PURCHASE SWEET (NEW)
   ========================= */
const purchaseSweet = async (id) => {
    const sweet = await prisma_1.prisma.sweet.findUnique({
        where: { id }
    });
    if (!sweet) {
        throw new Error("Sweet not found");
    }
    if (sweet.stock <= 0) {
        throw new Error("Out of stock");
    }
    return prisma_1.prisma.sweet.update({
        where: { id },
        data: {
            stock: {
                decrement: 1
            }
        }
    });
};
exports.purchaseSweet = purchaseSweet;
