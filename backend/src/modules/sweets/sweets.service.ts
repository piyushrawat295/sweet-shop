import { prisma } from "../../config/prisma";

export const createSweet = (data: any) =>
  prisma.sweet.create({ data });

export const getAll = () =>
  prisma.sweet.findMany();

export const search = (q: any) =>
  prisma.sweet.findMany({
    where: {
      name: q.name,
      category: q.category,
      price: q.min && q.max ? { gte: +q.min, lte: +q.max } : undefined
    }
  });

export const updateSweet = (id: number, data: any) =>
  prisma.sweet.update({ where: { id }, data });

export const deleteSweet = (id: number) =>
  prisma.sweet.delete({ where: { id } });

/* =========================
   ✅ PURCHASE SWEET (NEW)
   ========================= */
export const purchaseSweet = async (id: number) => {
  const sweet = await prisma.sweet.findUnique({
    where: { id }
  });

  if (!sweet) {
    throw new Error("Sweet not found");
  }

  if (sweet.stock <= 0) {
    throw new Error("Out of stock");
  }

  return prisma.sweet.update({
    where: { id },
    data: {
      stock: {
        decrement: 1
      }
    }
  });
};
