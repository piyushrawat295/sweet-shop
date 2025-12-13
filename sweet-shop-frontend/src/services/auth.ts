import api from "../api";

export const registerUser = (email: string, password: string) => {
  return api.post("/auth/register", { email, password });
};

export const loginUser = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  localStorage.setItem("token", response.data.token);
  return response.data;
};
