export const SessionTypeEnum = {
  VIDEO: "VIDEO",
  CHAT: "CHAT",
} as const;

export const SessionStatusEnum = {
  REQUESTED: "REQUESTED",
  ACCEPTED: "ACCEPTED",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

export const VideoProviderEnum = {
  WEBRTC: "WEBRTC",
  TWILIO: "TWILIO",
  AGORA: "AGORA",
} as const;

export type SessionTypeEnumType = (typeof SessionTypeEnum)[keyof typeof SessionTypeEnum];
export type SessionStatusEnumType = (typeof SessionStatusEnum)[keyof typeof SessionStatusEnum];
export type VideoProviderEnumType = (typeof VideoProviderEnum)[keyof typeof VideoProviderEnum];
