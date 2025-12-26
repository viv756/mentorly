import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { Env } from "../config/env.config";

type TimeUnit = "s" | "m" | "h" | "d" | "w" | "y";
type TimeString = `${number}${TimeUnit}`;

export type AccessTokenPayload = {
  userId: string;
  role?: string;
};

export type RefreshTokenPayload = {
  userId: string;
};

type SignOptsAndSecret = SignOptions & {
  secret: string;
  expiresIn: TimeString | number;
};

const defaults: SignOptions = {
  audience: ["user"],
};

/* ---------------- ACCESS TOKEN ---------------- */

const accessTokenOptions: SignOptsAndSecret = {
  secret: Env.JWT_ACCESS_SECRET,
  expiresIn: Env.JWT_ACCESS_EXPIRES_IN as TimeString, // e.g. "15m"
};

export const signAccessToken = (payload: AccessTokenPayload) => {
  const { secret, ...opts } = accessTokenOptions;

  const token = jwt.sign(payload, secret, {
    ...defaults,
    ...opts,
  });

  const expiresAt =
    (jwt.decode(token) as JwtPayload)?.exp! * 1000;

  return {
    token,
    expiresAt,
  };
};

/* ---------------- REFRESH TOKEN ---------------- */

const refreshTokenOptions: SignOptsAndSecret = {
  secret: Env.JWT_REFRESH_SECRET,
  expiresIn: Env.JWT_REFRESH_EXPIRES_IN as TimeString, // e.g. "7d"
};

export const signRefreshToken = (payload: RefreshTokenPayload) => {
  const { secret, ...opts } = refreshTokenOptions;

  const token = jwt.sign(payload, secret, {
    ...defaults,
    ...opts,
  });

  return token;
};


