import { joinSessionApiFn } from "@/features/session/api/joinSessionApin";
import { useMutation } from "@tanstack/react-query";

interface JoinSessionResponse {
  appId: string;
  token: string;
  channelName: string;
  uid: number;
}

export const useJoinSession = () => {
  return useMutation<JoinSessionResponse, Error, string>({
    mutationFn: joinSessionApiFn,
  });
};