import API from "@/lib/axios-client";

export const rejectSessionApiFn = async (sessionId: string) => {
  const response = await API.patch(`/session/reject-session/${sessionId}`);
  return response.data;
};
