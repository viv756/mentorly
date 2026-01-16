import { updateWeeklyAvailability } from "@/features/profile/api/updateWeeklyAvailability";
import type { WeeklyAvailability } from "@/features/profile/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateWeeklyAvailability = () => {
  return useMutation({
    mutationFn: (data:WeeklyAvailability) => updateWeeklyAvailability(data),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
