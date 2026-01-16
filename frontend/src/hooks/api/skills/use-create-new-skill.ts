import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewSkillFn } from "@/features/skills/api/createNewSkillAPI";
import type { CreateNewSkillPayload } from "@/features/skills/types";
import { toast } from "sonner";

export const useCreateNewSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateNewSkillPayload) => createNewSkillFn(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["user-skills"],
      });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
