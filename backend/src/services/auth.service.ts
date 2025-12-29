import mongoose from "mongoose";

import AccountModel from "../models/account.model";
import UserModel from "../models/user.model";
import { ProviderEnum } from "../enums/account-provider.enum";
import { BadRequestException, NotFoundException, UnauthorizedException } from "../utils/appError";

export const registerUserService = async (body: {
  email: string;
  name: string;
  password: string;
}) => {
  const { email, name, password } = body;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const existingUser = await UserModel.findOne({ email }).session(session);
    if (existingUser) {
      throw new BadRequestException("Email already exists");
    }

    const user = new UserModel({
      email,
      name,
      password,
    });
    await user.save({ session });

    const account = new AccountModel({
      userId: user._id,
      provider: ProviderEnum.EMAIL,
      providerId: email,
    });
    await account.save({ session });

    await session.commitTransaction();

    return {
      userId: user._id,
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
    console.log("End Session...");
  }
};

export const verifyUserService = async ({
  email,
  password,
  provider = ProviderEnum.EMAIL,
}: {
  email: string;
  password: string;
  provider?: string;
}) => {
  const account = await AccountModel.findOne({
    provider,
    providerId: email,
  });

  if (!account) {
    throw new NotFoundException("Account not found");
  }

  const user = await UserModel.findById(account.userId);
  if (!user) {
    throw new NotFoundException("User not found ");
  }

  //  if EMAIL provider, verify password
  if (provider === ProviderEnum.EMAIL) {
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new UnauthorizedException("Invalid email or password");
    }
  }

  return user;
};

export const findByIdUserService = async (userId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new NotFoundException("User not found ");
  }
  return user?.omitPassword();
};
