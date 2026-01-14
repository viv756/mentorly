import API from "@/lib/axios-client";
import type { SignUpPayload } from "../types";

export const signUpMutationFn = async (data: SignUpPayload) => {
  const response = await API.post("/auth/register", data);
  return response.data;
};
