import API from "@/lib/axios-client";
import type { CreateSessionPayload } from "../types";

export const createSessionApiFn = async (data:CreateSessionPayload) => {
  const response = await API.post("/session/create", data);
  return response.data;
};
