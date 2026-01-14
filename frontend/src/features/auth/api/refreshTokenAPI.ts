import axios from "axios";

const REFRESH_API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

export const refreshToken = async () => {
  const response = await REFRESH_API.post("/auth/refresh");
  console.log(response.data);
  
  return response.data
};
