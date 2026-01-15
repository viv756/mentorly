import API from "@/lib/axios-client";

export const getCurrentUserProfileFn = async () => {
  const response = await API.get("/user/profile");
  return response.data;
};
