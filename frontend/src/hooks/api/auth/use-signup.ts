import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { signUpMutationFn } from "@/features/auth/api/signUpAPI";

export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signUpMutationFn,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/sign-in", { replace: true });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};
