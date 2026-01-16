import API from "@/lib/axios-client";
import type { GetCurrentUserSkillsType } from "../types";

export const getCurrentUserSkills = async () => {
  const response = await API.get<GetCurrentUserSkillsType>("/skill/all");
  return response.data;
};
