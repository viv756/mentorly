import AccountModel from "../models/account.model";
import { BadRequestException, ForbiddenException } from "../utils/appError";

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
  const account = await AccountModel.findOne({ userId });
  if (!account) {
    throw new Error("No account");
  }

  const storedRefreshToken = account.refreshToken;
  if (storedRefreshToken !== token) {
    throw new ForbiddenException("Refresh token reuse detected");
  }
};

export const logoutService = async (userId: string) => {
  const account = await AccountModel.updateOne(
    { userId },
    { $set: { refreshToken: null, tokenExpiry: null } },
  );

  if (account.matchedCount === 0) {
    throw new BadRequestException("Account not found");
  }

  return account;
};
