export const CreditSourceEnum = {
  SESSION: "SESSION",
  PURCHASE: "PURCHASE",
  ADMIN: "ADMIN",
  REFUNDED: "REFUNDED",
} as const;

export const CreditStatusEnum = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  REVERSED: "REVERSED",
} as const;

export const CreditTypeEnum = {
  DEBIT: "DEBIT",
  CREDIT: "CREDIT",
} as const;

export type CreditSourceEnumType = (typeof CreditSourceEnum)[keyof typeof CreditSourceEnum];
export type CreditStatusEnumType = (typeof CreditStatusEnum)[keyof typeof CreditStatusEnum];
export type CreditTypeEnumType = (typeof CreditTypeEnum)[keyof typeof CreditTypeEnum];
