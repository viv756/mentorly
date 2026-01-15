import { useQuery } from "@tanstack/react-query";
import { getCurrentUserFn } from "@/features/user/api/getCurrentUserAPI";
import { useAuthStore } from "@/store/store";

export const useGetCurrentUser = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  const query = useQuery({
    queryKey: ["authUser"],
    queryFn: getCurrentUserFn,
    enabled: !!accessToken,
    staleTime: 0,
  });

  return query;
};
