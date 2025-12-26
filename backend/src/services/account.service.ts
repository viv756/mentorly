import AccountModel from "../models/account.model";

export const accountRefreshTokenService = async (userId: string, token: string) => {
  const account = await AccountModel.findOne({ userId });
  if (!account) {
    throw new Error("no account");
  }

  account.refreshToken = token;
  await account.save();

  return;
};

export const getRefreshTokenService = async (userId: string) => {
  const account = await AccountModel.findOne({ userId });
  if (!account) {
    throw new Error("no account");
  }

  return account.refreshToken;
};
