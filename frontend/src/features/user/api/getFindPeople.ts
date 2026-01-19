import API from "@/lib/axios-client";
import type { GetFindPeopleResponse } from "../types";

export const getFindPeopleApiFn = async () => {
  const response = await API.get<GetFindPeopleResponse>("/people/find");
  return response.data;
};
