import { rejectSessionApiFn } from "@/features/session/api/rejectSessionApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRejectSessionRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) => rejectSessionApiFn(sessionId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["get-session-requests"],
      });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
