import api from "../api/axios";

export const getSweets = () => api.get("/sweets");
export const purchaseSweet = (id: number) =>
  api.post(`/sweets/${id}/purchase`);
export const searchSweets = (params: {
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}) => {
  return api.get("/sweets/search", { params });
};
