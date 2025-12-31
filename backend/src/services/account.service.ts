import AccountModel from "../models/account.model";
import { ForbiddenException, NotFoundException } from "../utils/appError";
import { findByIdUserService } from "./user.service";

export const accountRefreshTokenService = async (userId: string, token: string) => {
  const account = await AccountModel.findOne({ userId });
  if (!account) {
    throw new Error("no account");
  }

  account.refreshToken = token;
  await account.save();

  return;
};

export const refreshTokenService = async (userId: string, token: string) => {
  const user = await findByIdUserService(userId);
  if (!user) {
    throw new NotFoundException("User doesn't exist");
  }

  const account = await AccountModel.findOne({ userId });
  if (!account) {
    throw new Error("No account");
  }

  const storedRefreshToken = account.refreshToken;
  if (storedRefreshToken !== token) {
    throw new ForbiddenException("Refresh token reuse detected");
  }

  return user;
};
