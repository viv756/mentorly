import API from "@/lib/axios-client";

export const updateUserProfile = async (data: FormData) => {
  const response = await API.patch("/user/profile/update", data);
  return response.data;
};
