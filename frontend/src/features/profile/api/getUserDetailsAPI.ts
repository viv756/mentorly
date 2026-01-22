import API from "@/lib/axios-client";
import type { GetUserProfileByIdResponseType } from "../types";

export const getUserDetailsById = async (userId: string) => {
  const response = await API.get<GetUserProfileByIdResponseType>(`/user/details/${userId}`);
  return response.data;
};
