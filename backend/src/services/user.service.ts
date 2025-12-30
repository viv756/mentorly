import ProfileModel from "../models/profile.model";
import UserModel from "../models/user.model";

import { NotFoundException } from "../utils/appError";
import { CreateProfileInput } from "../validator/user.validator";

export const findByIdUserService = async (userId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new NotFoundException("User not found ");
  }
  return user?.omitPassword();
};

export const updateProfileService = async (userId: string, profileData: CreateProfileInput) => {
  const { avatar, bio, socialLinks } = profileData;

  const user = await UserModel.findById(userId);
  if (!user) {
    throw new NotFoundException("User not found");
  }

  const profile = await ProfileModel.findOne({ userId });
  if (!profile) {
    throw new NotFoundException("Profile not found");
  }

  if (avatar !== undefined) {
    profile.avatar = avatar;
  }

  if (bio !== undefined) {
    profile.bio = bio;
  }

  if (socialLinks) {
    profile.socialLinks = {
      ...profile.socialLinks,
      ...socialLinks,
    };
  }

  await profile.save();

  return profile;
};
