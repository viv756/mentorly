import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWeeklyAvailability } from "@/features/profile/api/updateWeeklyAvailability";
import type { WeeklyAvailability } from "@/features/profile/types";
import { toast } from "sonner";

export const useUpdateWeeklyAvailability = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: WeeklyAvailability) => updateWeeklyAvailability(data),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["auth-user"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
