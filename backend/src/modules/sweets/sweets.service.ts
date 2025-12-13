import { prisma } from "../../config/prisma";

export const createSweet = (data: any) =>
  prisma.sweet.create({ data });

export const getAll = () => prisma.sweet.findMany();

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
