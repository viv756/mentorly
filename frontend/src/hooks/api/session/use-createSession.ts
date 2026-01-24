import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSessionApiFn } from "@/features/session/api/createSessionApi";
import type { CreateSessionPayload } from "@/features/session/types";
import { toast } from "sonner";

export const useCreateSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateSessionPayload) => createSessionApiFn(data),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["get-upcoming-and-requested-sessions"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
