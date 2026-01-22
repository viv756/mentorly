import { getUserDetailsById } from "@/features/profile/api/getUserDetailsAPI";
import { useQuery } from "@tanstack/react-query";

export const useGetUserDetailsById = (userId: string) => {
  const query = useQuery({
    queryKey: ["user-details", userId],
    queryFn: () => getUserDetailsById(userId),
    enabled: !!userId,
  });

  return query;
};
