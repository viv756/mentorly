import ProfileModel from "../models/profile.model";
import UserModel, { UserDocument } from "../models/user.model";

import { NotFoundException } from "../utils/appError";
import { CreateProfileInput } from "../validator/user.validator";

export const findByIdUserService = async (userId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new NotFoundException("User not found ");
  }
  return user?.omitPassword();
};

export const updateProfileService = async (
  userId: string,
  profileData: CreateProfileInput,
  file: Express.Multer.File | undefined
) => {
  const { bio, socialLinks } = profileData;

  const profile = await ProfileModel.findOne({ userId });
  if (!profile) {
    throw new NotFoundException("Profile not found");
  }

  if (file !== undefined) {
    profile.avatar = file.path;
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

export const getCurrentUserProfileService = async (userId: string) => {
  const userProfile = await ProfileModel.findOne({ userId })
    .populate("userId", "name email createdAt -password")
    .lean();

  if (!userProfile) {
    throw new NotFoundException("Profile not found");
  }

  return userProfile;
};
