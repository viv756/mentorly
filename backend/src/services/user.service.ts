import { ProviderEnum } from "../enums/account-provider.enum";
import AccountModel from "../models/account.model";
import UserModel from "../models/user.model";

export const verifyUserService = async ({
  email,
  password,
  provider = ProviderEnum.EMAIL,
}: {
  email: string;
  password: string;
  provider?: string;
}) => {
  const account = await AccountModel.findOne({ provider, providerId: email });
  if (!account) {
    return console.log("account not exist");
  }

  const user = await UserModel.findById(account.userId);
  if (!user) {
    return console.log("user don't exist");
  }
  return user.omitPassword()
};

export const findByIdUserService = async (userId: string) => {
  const user = await UserModel.findById(userId);
  return user?.omitPassword();
};
