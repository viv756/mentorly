import API from "@/lib/axios-client";

export const aiAssistantAPiFn = async (message) => {
  const response = await API.post("/ai/search-mentor", message);
  return response.data;
};
