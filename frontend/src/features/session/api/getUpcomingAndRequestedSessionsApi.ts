import API from "@/lib/axios-client";
import type { GetUpcomingAndRequestedApiResponseType } from "../types";

export const getUpcomingAndRequestedSessionApiFn = async () => {
  const response = await API.get<GetUpcomingAndRequestedApiResponseType>("/session/get-sessions-upcoming-and-requested");
  return response.data;
};
