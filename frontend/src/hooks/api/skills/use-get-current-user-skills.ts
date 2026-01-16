import { useQuery } from "@tanstack/react-query";
import { getCurrentUserSkills } from "@/features/skills/api/getCurrentUserSkills";

export const useGetCurrentUserSkills = () => {
  const query = useQuery({
    queryKey: ["user-skills"],
    queryFn: getCurrentUserSkills,
    staleTime: Infinity,
  });

  return query;
};
