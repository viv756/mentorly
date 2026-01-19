import { NextFunction, Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

import { accountRefreshTokenService, refreshTokenService } from "../services/account.service";
import { findByIdUserService, markActive } from "../services/user.service";
import { signAccessToken } from "../utils/tokens";
import { signRefreshToken } from "../utils/tokens";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { Env } from "../config/env.config";
import { registerUserService } from "../services/auth.service";
import { registerSchema } from "../validator/auth.validator";
import { HTTP_STATUS } from "../config/http.config";
import { ForbiddenException, UnauthorizedException } from "../utils/appError";

export const registerUserController = asyncHandler(async (req: Request, res: Response) => {
  const body = registerSchema.parse({
    ...req.body,
  });

  await registerUserService(body);

  res.status(HTTP_STATUS.CREATED).json({
    message: "User created successfully",
  });
});

export const loginController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "local",
      { session: false },
      async (err: Error | null, user: Express.User, info: { message: string } | undefined) => {
        if (!user) {
          return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid email or password" });
        }
        const { accessToken, expiresAt } = signAccessToken({ userId: user._id });
        const refreshToken = signRefreshToken({ userId: user._id });

        await accountRefreshTokenService(user._id, refreshToken);
        await markActive(user._id);

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          path: "/api/auth/refresh",
        });

        res.status(HTTP_STATUS.OK).json({
          message: "Logged in successfully",
          user: user.omitPassword(),
          accessToken,
          expiresAt,
        });
      },
    )(req, res, next);
  },
);

export const refreshTokenController = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    throw new ForbiddenException("Cookie not found");
  }

  let payload: { userId: string };

  try {
    payload = jwt.verify(token, Env.JWT_REFRESH_SECRET) as { userId: string };
  } catch {
    throw new UnauthorizedException("Invalid or expired refresh token");
  }

  const user = await findByIdUserService(payload.userId);
  await refreshTokenService(payload.userId, token);

  const { accessToken, expiresAt } = signAccessToken({
    userId: user._id.toString(),
  });

  // mark lastActive status
  await markActive(user._id.toString());

  return res.status(HTTP_STATUS.OK).json({
    accessToken,
    expiresAt,
  });
});
