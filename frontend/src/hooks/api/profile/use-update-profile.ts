import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "@/features/profile/api/updateUserProfileAPI";
import { toast } from "sonner";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => updateUserProfile(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["user-profile"],
      });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
