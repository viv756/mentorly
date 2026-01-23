import API from "@/lib/axios-client";
import type { CreateAcceptSessionPayload } from "../types";

export const createAcceptSessionRequestApiFn = async (data:CreateAcceptSessionPayload) => {
  const response = await API.post("/session/accept-request", data);
  return response.data;
};
