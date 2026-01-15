import API from "@/lib/axios-client";
import type { GetCurrentUserResponseType } from "../types";

export const getCurrentUserFn = async () => {
  const response = await API.get<GetCurrentUserResponseType>("/user/current");
  return response.data;
};
