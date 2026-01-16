import API from "@/lib/axios-client";
import type { WeeklyAvailability } from "../types";

export const updateWeeklyAvailability = async (data: WeeklyAvailability) => {
  const response = await API.patch("/user/availability", data);
  return response.data;
};
