import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateAcceptSessionPayload } from "@/features/session/types";
import { createAcceptSessionRequestApiFn } from "@/features/session/api/createAcceptSessionRequest";
import { toast } from "sonner";

export const useCreateAcceptRequestSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateAcceptSessionPayload) => createAcceptSessionRequestApiFn(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["get-session-request"],
      });

      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
