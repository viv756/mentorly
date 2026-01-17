import { getCurrentUserProfileFn } from "@/features/profile/api/getCurrentUserProfileAPI";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrentUserProfile = () => {
  const query = useQuery({
    queryKey: ["user-profile"],
    queryFn: getCurrentUserProfileFn,
    staleTime: Infinity,
  });
  return query
};
