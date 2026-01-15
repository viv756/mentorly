import API from "@/lib/axios-client";
import type { CreateNewSkillPayload } from "../types";

export const createNewSkillFn = async (data: CreateNewSkillPayload) => {
  const response = await API.post("/skill/create", data);
  return response.data;
};
