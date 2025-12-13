import api from "../api/axios";

export const registerUser = (email: string, password: string) =>
  api.post("/auth/register", { email, password });

export const loginUser = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  localStorage.setItem("token", res.data.token);
};
