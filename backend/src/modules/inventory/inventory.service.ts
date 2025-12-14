import { prisma } from "../../config/prisma";

export const purchase = async (id: number) => {
  return prisma.$transaction(async (tx) => {
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

export const restock = async (id: number, qty: number) => {
  if (qty <= 0) {
    throw new Error("Invalid restock quantity");
  }

  return prisma.sweet.update({
    where: { id },
    data: {
      stock: { increment: qty },
    },
  });
};
