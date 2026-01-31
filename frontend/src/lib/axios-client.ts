import axios from "axios";
import { refreshToken } from "@/features/auth/api/refreshTokenAPI";
import { useAuthStore } from "@/store/store";
import { baseURL } from "./base-url";

const options = {
  baseURL,
  withCredentials: true,
  timeout: 10000,
};

// Create axios Instance
const API = axios.create(options);

// Add access token in bearer
API.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = "Bearer " + accessToken;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });

  failedQueue = [];
};

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = "Bearer " + token;
              resolve(API(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { newAccessToken, expiresAt } = await refreshToken();

        useAuthStore.getState().setCredentials(newAccessToken, expiresAt);
        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = "Bearer " + newAccessToken;

        return API(originalRequest);
      } catch (err) {
        processQueue(err, null);
        useAuthStore.getState().logout();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject({
      ...error,
      message: error.response?.data?.message || "Something went wrong",
      errorCode: error.response?.data?.errorCode || "UNKNOWN_ERROR",
    });
  },
);

export default API;
