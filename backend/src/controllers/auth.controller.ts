import { NextFunction, Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

import { accountRefreshTokenService, getRefreshTokenService } from "../services/account.service";
import { signAccessToken } from "../utils/tokens";
import { signRefreshToken } from "../utils/tokens";
import { asyncHandler } from "../asyncHandler.middleware";
import { Env } from "../config/env.config";
import { findByIdUserService, registerUserService } from "../services/auth.service";
import { registerSchema } from "../validator/auth.validator";
import { HTTPSTATUS } from "../config/http.config";
import { ForbiddenException, NotFoundException, UnauthorizedException } from "../utils/appError";

export const registerUserController = asyncHandler(async (req: Request, res: Response) => {
  const body = registerSchema.parse({
    ...req.body,
  });

  await registerUserService(body);

  res.status(HTTPSTATUS.CREATED).json({
    message: "User created successfully",
  });
});

export const loginController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "local",
      { session: false },
      async (err: Error | null, user: Express.User, info: { message: string } | undefined) => {
        const { accessToken, expiresAt } = signAccessToken({ userId: user._id });
        const refreshToken = signRefreshToken({ userId: user._id });

        await accountRefreshTokenService(user._id, refreshToken);

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          path: "/api/auth/refresh",
        });

        res.status(HTTPSTATUS.OK).json({ user: user.omitPassword(), accessToken, expiresAt });
      }
    )(req, res, next);
  }
);

export const refreshTokenController = asyncHandler(async (req, res, next) => {
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
  if (!user) {
    throw new NotFoundException("User doesn't exist");
  }
  const storedRefreshToken = await getRefreshTokenService(user._id.toString());
  if (storedRefreshToken !== token) {
    throw new ForbiddenException("Refresh token reuse detected");
  }

  const newAccessToken = signAccessToken({
    userId: user._id.toString(),
  });

  res.status(HTTPSTATUS.OK).json(newAccessToken);
});
