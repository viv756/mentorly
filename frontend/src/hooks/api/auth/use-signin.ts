import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { signInMutationFn } from "@/features/auth/api/signInAPI";
import { useAuthStore } from "@/store/store";

export const useSignIn = () => {
  const navigate = useNavigate();
  const setCredentials = useAuthStore((state) => state.setCredentials);

  return useMutation({
    mutationFn: signInMutationFn,
    onSuccess: (data) => {
      setCredentials(data.accessToken, data.expiresAt);
      toast.success(data.message);
      navigate("/", { replace: true });
    },
    onError: (error: any) => {
      toast.error(error.message)
    },
  });
};
