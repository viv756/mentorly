import { getSkillByIdAndWeeklyAvailabilityApiFn } from "@/features/skills/api/getSkillByIdAndAvailability";
import { useQuery } from "@tanstack/react-query";

export const useSkillByIdAndWeeklyAvailability = (userId?: string, skillId?: string) => {
  return useQuery({
    queryKey: ["skill-availability", userId, skillId],
    queryFn: () => {
      if (!userId || !skillId) {
        throw new Error("Missing userId or skillId");
      }
      return getSkillByIdAndWeeklyAvailabilityApiFn(userId, skillId);
    },
    enabled: Boolean(userId && skillId),
  });
};
