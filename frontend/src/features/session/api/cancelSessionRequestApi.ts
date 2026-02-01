import API from "@/lib/axios-client";

export const cancelSessionRequestApiFn = async (sessionId: string) => {
  const response = await API.delete(`/session/cancel/${sessionId}`);
  return response.data;
};
