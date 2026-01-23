import { useMutation } from "@tanstack/react-query";
import { createSessionApiFn } from "@/features/session/api/createSessionApi";
import type { CreateSessionPayload } from "@/features/session/types";
import { toast } from "sonner";

export const useCreateSession = () => {
  return useMutation({
    mutationFn: (data: CreateSessionPayload) => createSessionApiFn(data),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
