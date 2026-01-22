import API from "@/lib/axios-client";

export const getSkillByIdAndWeeklyAvailabilityApiFn = async (userId: string, skillId: string) => {
  const response = await API.get(`/skill/${skillId}/user/${userId}`);
  return response.data;
};
