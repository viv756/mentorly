import API from "@/lib/axios-client";
import type { ChatMessage } from "../types";

export const aiAssistantAPiFn = async (message:ChatMessage[]) => {
  const response = await API.post("/ai/search-mentor", message);
  return response.data;
};
