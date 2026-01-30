export const SessionTypeEnum = {
  VIDEO: "VIDEO",
  CHAT: "CHAT",
} as const;

export const SessionStatusEnum = {
  REQUESTED: "REQUESTED",
  ACCEPTED: "ACCEPTED",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
  REJECTED: "REJECTED",
} as const;

export const AttendanceStatusEnum = {
  BOTH_PRESENT: "BOTH_PRESENT",
  MENTOR_NO_SHOW: "MENTOR_NO_SHOW",
  LEARNER_NO_SHOW: "LEARNER_NO_SHOW",
  BOTH_NO_SHOW: "BOTH_NO_SHOW",
} as const;

export const VideoProviderEnum = {
  WEBRTC: "WEBRTC",
  TWILIO: "TWILIO",
  AGORA: "AGORA",
} as const;

export type SessionTypeEnumType = (typeof SessionTypeEnum)[keyof typeof SessionTypeEnum];
export type AttendanceStatusEnumType =
  (typeof AttendanceStatusEnum)[keyof typeof AttendanceStatusEnum];
export type SessionStatusEnumType = (typeof SessionStatusEnum)[keyof typeof SessionStatusEnum];
export type VideoProviderEnumType = (typeof VideoProviderEnum)[keyof typeof VideoProviderEnum];
