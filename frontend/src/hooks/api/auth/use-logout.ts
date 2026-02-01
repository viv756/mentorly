import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutApiFn } from "@/features/auth/api/logoutApi";
import { useAuthStore } from "@/store/store";
import { toast } from "sonner";

export const useLogout = () => {
  const logout = useAuthStore((s) => s.logout);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutApiFn,
    onSuccess: (data) => {
      queryClient.resetQueries({
        queryKey: ["auth-user"],
      });
      logout();
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};
