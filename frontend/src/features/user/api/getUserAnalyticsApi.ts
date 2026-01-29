import API from "@/lib/axios-client";

export const getUserAnalyticsApiFn = async () => {
  const response = await API.get("/user/analytics");
  return response.data;
};
