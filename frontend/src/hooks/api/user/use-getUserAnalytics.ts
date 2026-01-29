import { useQuery } from "@tanstack/react-query";
import { getUserAnalyticsApiFn } from "@/features/user/api/getUserAnalyticsApi";

export const useGetUserAnalytics = () => {
  const query = useQuery({
    queryKey: ["analytics"],
    queryFn: getUserAnalyticsApiFn,
  });

  return query;
};
