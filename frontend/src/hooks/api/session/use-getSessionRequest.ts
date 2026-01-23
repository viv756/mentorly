import { getSessionRequestsApiFn } from "@/features/session/api/getSessionRequests";
import { useQuery } from "@tanstack/react-query";

export const useGetSessionRequest = () => {
  const query = useQuery({
    queryKey: ["get-session-request"],
    queryFn: getSessionRequestsApiFn,
  });

  return query;
};
