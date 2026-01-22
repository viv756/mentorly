import { Types } from "mongoose";
import ProfileModel from "../models/profile.model";
import UserModel from "../models/user.model";

import { NotFoundException } from "../utils/appError";
import { UpdateProfileInput, WeeklyAvailabilityDTO } from "../validator/user.validator";
import { SkillTypeEnum } from "../enums/skill.enum";

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
  file: Express.Multer.File | undefined,
) => {
  const { bio, socialLinks, name, location, aboutMe } = profileData;

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

  if (aboutMe !== undefined) {
    profile.aboutMe = aboutMe;
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
  body: WeeklyAvailabilityDTO,
) => {
  const userProfile = await ProfileModel.findOne({ userId });

  if (!userProfile) {
    throw new NotFoundException("Profile not found");
  }

  userProfile.weeklyAvailability = Object.fromEntries(
    Object.entries(body).filter(([_, slots]) => slots.length > 0),
  );

  await userProfile.save();

  return userProfile;
};

// Updating lastActive status
export const markActive = async (userId: string) => {
  const ACTIVITY_INTERVAL = 5 * 60 * 1000;

  await UserModel.updateOne(
    {
      _id: userId,
      $or: [
        { lastActiveAt: null },
        { lastActiveAt: { $lt: new Date(Date.now() - ACTIVITY_INTERVAL) } },
      ],
    },
    { $set: { lastActiveAt: new Date() } },
  );
};

export const getUserProfileDetailsByIdService = async (userId: string) => {
  const userObjectId = new Types.ObjectId(userId);

  const result = await UserModel.aggregate([
    /* 1️⃣ Match user */
    {
      $match: { _id: userObjectId },
    },

    /* 2️⃣ Join profile */
    {
      $lookup: {
        from: "profiles",
        localField: "_id",
        foreignField: "userId",
        as: "profile",
      },
    },
    {
      $unwind: {
        path: "$profile",
        preserveNullAndEmptyArrays: false,
      },
    },

    /* 3️⃣ Join user skills */
    {
      $lookup: {
        from: "userskills",
        localField: "_id",
        foreignField: "userId",
        as: "skills",
      },
    },

    /* 4️⃣ Shape response + filter TEACH skills */
    {
      $project: {
        _id: 0,
        user: {
          _id: "$_id",
          name: "$name",
          email: "$email",
        },
        profile: {
          bio: "$profile.bio",
          location: "$profile.location",
          rating: "$profile.rating",
          avatar: "$profile.avatar",
          socialLinks: "$profile.socialLinks",
        },
        skills: {
          $map: {
            input: {
              $filter: {
                input: "$skills",
                as: "skill",
                cond: {
                  $eq: ["$$skill.skillType", SkillTypeEnum.TEACH],
                },
              },
            },
            as: "skill",
            in: {
              skillId: "$$skill._id",
              skillName: "$$skill.skillName",
              category: "$$skill.category",
              skillType: "$$skill.skillType",
              skillLevel: "$$skill.skillLevel",
              description: "$$skill.description",
              experienceYears: "$$skill.experienceYears",
            },
          },
        },
      },
    },
  ]);

  if (!result.length) {
    throw new NotFoundException("User profile not found");
  }

  return result[0];
};
