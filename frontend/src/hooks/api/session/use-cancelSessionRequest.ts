import { cancelSessionRequestApiFn } from "@/features/session/api/cancelSessionRequestApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCancelSessionRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) => cancelSessionRequestApiFn(sessionId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["get-upcoming-and-requested-sessions"],
      });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
