import { getUpcomingAndRequestedSessionApiFn } from "@/features/session/api/getUpcomingAndRequestedSessionsApi";
import { useQuery } from "@tanstack/react-query";

export const useGetUpcomingAndRequestedSessions = () => {
  const query = useQuery({
    queryKey: ["get-upcoming-and-requested-sessions"],
    queryFn: getUpcomingAndRequestedSessionApiFn,
  });

  return query;
};
