import { useMutation } from "@tanstack/react-query";
import { createNewSkillFn } from "@/features/skills/api/createNewSkillAPI";
import type { CreateNewSkillPayload } from "@/features/skills/types";
import { toast } from "sonner";

export const useCreateNewSkill = () => {
  return useMutation({
    mutationFn: (data: CreateNewSkillPayload) => createNewSkillFn(data),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
