import { useMutation } from "@tanstack/react-query";
import { createRatingApiFn } from "@/features/rating/api/createRating";
import type { CreateRatingPayload } from "@/features/rating/types";
import { toast } from "sonner";

type CreateRatingVariables = {
  sessionId: string;
  fromUserId: string;
  data: CreateRatingPayload;
};

export const useCreateRating = () => {
  return useMutation({
    mutationFn: ({ sessionId, fromUserId, data }: CreateRatingVariables) =>
      createRatingApiFn(sessionId, fromUserId, data),
    onSuccess: (data) => {
      toast(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
