import { joinSessionApiFn } from "@/features/session/api/joinSessionApin";
import { useMutation } from "@tanstack/react-query";

interface JoinSessionResponse {
  message: string;
  agoraData: {
    appId: string;
    token: string;
    channelName: string;
    uid: string;
    learnerId: string;
  };
}

export const useJoinSession = () => {
  return useMutation<JoinSessionResponse, Error, string>({
    mutationFn: joinSessionApiFn,
  });
};
