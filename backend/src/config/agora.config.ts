import { RtcRole, RtcTokenBuilder } from "agora-token";
import { Env } from "./env.config";

const APP_ID = Env.AGORA_APP_ID;
const APP_CERTIFICATE = Env.AGORA_APP_CERTIFICATE;

export const generateAgoraToken = (channelName: string, uid: number, expireSeconds = 3600) => {
  const role = RtcRole.PUBLISHER;
  const expirationTimeInSeconds = Math.floor(Date.now() / 1000) + expireSeconds;

  return RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelName,
    uid,
    role,
    expirationTimeInSeconds,
    expirationTimeInSeconds,
  );
};
