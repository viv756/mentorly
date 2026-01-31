import axios from "axios";
import { baseURL } from "@/lib/base-url";

const REFRESH_API = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  timeout: 10000,
});

export const refreshToken = async () => {
  const response = await REFRESH_API.post("/auth/refresh");
  return response.data;
};
