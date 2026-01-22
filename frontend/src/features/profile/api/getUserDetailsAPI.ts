import API from "@/lib/axios-client";

export const getUserDetailsById = async (userId: string) => {
  const response = await API.get(`/user/details/${userId}`);
  return response.data;
};
 