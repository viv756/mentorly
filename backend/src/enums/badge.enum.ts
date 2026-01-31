export const BadgeLevelEnum = {
  NOVICE: "NOVICE",
  BRONZE: "BRONZE",
  SILVER: "SILVER",
  GOLD: "GOLD",
} as const;

export const BadgeKeyEnum = {
  STARTER: "STARTER",
  SESSION_MASTER: "SESSION_MASTER", // completed sessions
  CONSISTENCY_KING: "CONSISTENCY_KING", // sessions in days
  TOP_RATED: "TOP_RATED", // user average rating
  MENTOR_HERO: "MENTOR_HERO", // mentees helped
  ACTIVE_MEMBER: "ACTIVE_MEMBER", // session request send
  RISING_STAR: "RISING_STAR", // user activeness
} as const;

export type BadgeLevelEnumType = (typeof BadgeLevelEnum)[keyof typeof BadgeLevelEnum];
export type BadgeKeyEnumType = (typeof BadgeKeyEnum)[keyof typeof BadgeKeyEnum];
