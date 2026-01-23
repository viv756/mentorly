import API from "@/lib/axios-client";

export const getSessionRequestsApiFn = async () => {
  const response = await API.get("session/get/session-request");
  return response.data;
};
