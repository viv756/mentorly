import ProfileModel from "../models/profile.model";
import UserModel from "../models/user.model";

import { NotFoundException } from "../utils/appError";
import { UpdateProfileInput, WeeklyAvailabilityDTO } from "../validator/user.validator";

export const findByIdUserService = async (userId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new NotFoundException("User not found ");
  }

  return user?.omitPassword();
};

export const getCurrentUserDataService = async (userId: string) => {
  const user = await UserModel.findById(userId).select("_id name email");
  if (!user) {
    throw new NotFoundException("User not found");
  }

  const profile = await ProfileModel.findOne({ userId }).select("_id avatar weeklyAvailability");
  if (!profile) {
    throw new NotFoundException("profile not found");
  }

  return {
    userId: user._id,
    userName: user.name,
    userEmail: user.email,
    profileId: profile._id,
    avatar: profile.avatar,
    weeklyAvailability: profile.weeklyAvailability,
  };
};

export const updateProfileService = async (
  userId: string,
  profileData: UpdateProfileInput,
  file: Express.Multer.File | undefined
) => {
  const { bio, socialLinks, name, location } = profileData;

  const profile = await ProfileModel.findOne({ userId });
  if (!profile) {
    throw new NotFoundException("Profile not found");
  }

  if (name !== undefined) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    user.name = name;
    await user.save();
  }

  if (file !== undefined) {
    profile.avatar = file.path;
  }

  if (location !== undefined) {
    profile.location = location;
  }

  if (bio !== undefined) {
    profile.bio = bio;
  }

  if (Array.isArray(socialLinks)) {
    profile.socialLinks = socialLinks;
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

export const updateWeeklyAvailabilityService = async (
  userId: string,
  body: WeeklyAvailabilityDTO
) => {
  const userProfile = await ProfileModel.findOne({ userId });

  if (!userProfile) {
    throw new NotFoundException("Profile not found");
  }

  userProfile.weeklyAvailability = Object.fromEntries(
    Object.entries(body).filter(([_, slots]) => slots.length > 0)
  );

  await userProfile.save();

  return userProfile;
};
