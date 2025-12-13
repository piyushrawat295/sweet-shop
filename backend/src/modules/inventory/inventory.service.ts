import { prisma } from "../../config/prisma";

export const purchase = (id: number) =>
  prisma.sweet.update({
    where: { id },
    data: { quantity: { decrement: 1 } }
  });

export const restock = (id: number, qty: number) =>
  prisma.sweet.update({
    where: { id },
    data: { quantity: { increment: qty } }
  });
