import api from "../api/axios";

// USER
export const purchaseSweet = (id: number) =>
  api.post(`/sweets/${id}/purchase`);

// ADMIN
export const restockSweet = (id: number, qty: number) =>
  api.post(`/inventory/${id}/restock`, {
    qty: Number(qty), // 🔥 IMPORTANT
  });
