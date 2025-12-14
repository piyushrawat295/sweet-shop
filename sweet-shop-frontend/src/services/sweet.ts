import api from "../api/axios";

// PUBLIC
export const getSweets = () => api.get("/sweets");

export const searchSweets = (params: {
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}) => api.get("/sweets/search", { params });

// 🔐 ADMIN
export const addSweet = (data: {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image?: string;
}) => api.post("/sweets", data);

export const updateSweet = (id: number, data: any) =>
  api.put(`/sweets/${id}`, data);

export const deleteSweet = (id: number) =>
  api.delete(`/sweets/${id}`);
