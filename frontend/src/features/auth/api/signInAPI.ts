import API from "@/lib/axios-client";
import type { SignInPayload } from "../types";

export const signInMutationFn = async (data: SignInPayload) => {
  const response = await API.post("/auth/login", data);
  return response.data;
};
