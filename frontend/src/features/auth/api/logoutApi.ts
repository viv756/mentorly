import API from "@/lib/axios-client";
import type { LogoutResponse } from "../types";

export const logoutApiFn = async () => {
  const response = await API.post<LogoutResponse>("/auth/logout");
  return response.data;
};
