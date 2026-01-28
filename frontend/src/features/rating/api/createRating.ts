import API from "@/lib/axios-client";
import type { CreateRatingPayload, CreateRatingResponse } from "../types";

export const createRatingApiFn = async (
  sessionId: string,
  fromUserId: string,
  data: CreateRatingPayload,
) => {
  const response = await API.post<CreateRatingResponse>(`rating/create/${sessionId}/${fromUserId}`, data);
  return response.data;
};
