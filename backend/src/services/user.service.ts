import { Types } from "mongoose";
import ProfileModel from "../models/profile.model";
import UserModel from "../models/user.model";
import UserSkillModel from "../models/user-skill.model";

import { NotFoundException } from "../utils/appError";
import { UpdateProfileInput, WeeklyAvailabilityDTO } from "../validator/user.validator";
import { SkillTypeEnum } from "../enums/skill.enum";
import ProfileViewModel from "../models/profileView.model";
import SessionModel from "../models/session.model";

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

  const profile = await ProfileModel.findOne({ userId }).select(
    "_id avatar weeklyAvailability profileCompleteness",
  );
  if (!profile) {
    throw new NotFoundException("profile not found");
  }

  const skill = await UserSkillModel.findOne({ userId: userId });

  return {
    userId: user._id,
    userName: user.name,
    userEmail: user.email,
    profileId: profile._id,
    skillId: (skill && skill._id) || "",
    avatar: profile.avatar,
    profileCompleteness: profile.profileCompleteness,
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

export const getUserProfileDetailsByIdService = async (currUserId: string, userId: string) => {
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
        _id: 1,
        user: {
          _id: "$_id",
          name: "$name",
          email: "$email",
        },
        profile: {
          _id: "$profile._id",
          bio: "$profile.bio",
          aboutMe: "$profile.aboutMe",
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

  const userProfile = result[0];

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0); // today 00:00:00

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999); // today 23:59:59

  // create or update existing data
  await ProfileViewModel.updateOne(
    {
      profileId: userProfile.profile._id,
      userId: userProfile._id,
      viewerId: currUserId,
      viewedAt: { $gte: startOfDay, $lte: endOfDay },
    },
    { $setOnInsert: { viewedAt: new Date() } },
    { upsert: true },
  );

  return userProfile;
};

export const userProfileAnalyticsService = async (userId: string) => {
  // const sixMonthsAgo = new Date();
  // sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  // const analytics = await ProfileViewModel.aggregate([
  //   // 🔹 Profile views (last 6 months)
  //   {
  //     $match: {
  //       userId: new Types.ObjectId(userId),
  //       viewedAt: { $gte: sixMonthsAgo },
  //     },
  //   },
  //   {
  //     $project: {
  //       month: { $dateToString: { format: "%B", date: "$viewedAt" } },
  //       year: { $dateToString: { format: "%Y", date: "$viewedAt" } },
  //       type: { $literal: "profileView" },
  //     },
  //   },

  //   // 🔹 Session requests (last 6 months)
  //   {
  //     $unionWith: {
  //       coll: "sessions",
  //       pipeline: [
  //         {
  //           $match: {
  //             mentorId: new Types.ObjectId(userId),
  //             createdAt: { $gte: sixMonthsAgo },
  //           },
  //         },
  //         {
  //           $project: {
  //             month: { $dateToString: { format: "%B", date: "$createdAt" } },
  //             year: { $dateToString: { format: "%Y", date: "$createdAt" } },
  //             type: { $literal: "sessionRequest" },
  //           },
  //         },
  //       ],
  //     },
  //   },

  //   // 🔹 Count per type per month
  //   {
  //     $group: {
  //       _id: { month: "$month", type: "$type" },
  //       count: { $sum: 1 },
  //     },
  //   },

  //   // 🔹 Merge both metrics
  //   {
  //     $group: {
  //       _id: "$_id.month",
  //       counts: { $push: { type: "$_id.type", count: "$count" } },
  //     },
  //   },

  //   // 🔹 Final shape
  //   {
  //     $project: {
  //       _id: 0,
  //       month: "$_id",
  //       profileViews: {
  //         $ifNull: [
  //           {
  //             $first: {
  //               $map: {
  //                 input: {
  //                   $filter: {
  //                     input: "$counts",
  //                     cond: { $eq: ["$$this.type", "profileView"] },
  //                   },
  //                 },
  //                 as: "c",
  //                 in: "$$c.count",
  //               },
  //             },
  //           },
  //           0,
  //         ],
  //       },
  //       sessionRequests: {
  //         $ifNull: [
  //           {
  //             $first: {
  //               $map: {
  //                 input: {
  //                   $filter: {
  //                     input: "$counts",
  //                     cond: { $eq: ["$$this.type", "sessionRequest"] },
  //                   },
  //                 },
  //                 as: "c",
  //                 in: "$$c.count",
  //               },
  //             },
  //           },
  //           0,
  //         ],
  //       },
  //     },
  //   },

  //   // 🔹 Sort correctly by time
  //   { $sort: { month: 1 } },
  // ]);

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const analytics = await ProfileViewModel.aggregate([
    // 🔹 Profile views (last 1 year)
    {
      $match: {
        userId: new Types.ObjectId(userId),
        viewedAt: { $gte: oneYearAgo },
      },
    },
    {
      $project: {
        month: { $dateToString: { format: "%B", date: "$viewedAt" } },
        year: { $dateToString: { format: "%Y", date: "$viewedAt" } },
        type: { $literal: "profileView" },
      },
    },

    // 🔹 Session requests (last 1 year)
    {
      $unionWith: {
        coll: "sessions",
        pipeline: [
          {
            $match: {
              mentorId: new Types.ObjectId(userId),
              createdAt: { $gte: oneYearAgo },
            },
          },
          {
            $project: {
              month: { $dateToString: { format: "%B", date: "$createdAt" } },
              year: { $dateToString: { format: "%Y", date: "$createdAt" } },
              type: { $literal: "sessionRequest" },
            },
          },
        ],
      },
    },

    // 🔹 Count per type per month per year
    {
      $group: {
        _id: {
          year: "$year",
          month: "$month",
          type: "$type",
        },
        count: { $sum: 1 },
      },
    },

    // 🔹 Merge metrics
    {
      $group: {
        _id: {
          year: "$_id.year",
          month: "$_id.month",
        },
        counts: { $push: { type: "$_id.type", count: "$count" } },
      },
    },

    // 🔹 Final shape for graph
    {
      $project: {
        _id: 0,
        year: "$_id.year",
        month: "$_id.month",
        profileViews: {
          $ifNull: [
            {
              $first: {
                $map: {
                  input: {
                    $filter: {
                      input: "$counts",
                      cond: { $eq: ["$$this.type", "profileView"] },
                    },
                  },
                  as: "c",
                  in: "$$c.count",
                },
              },
            },
            0,
          ],
        },
        sessionRequests: {
          $ifNull: [
            {
              $first: {
                $map: {
                  input: {
                    $filter: {
                      input: "$counts",
                      cond: { $eq: ["$$this.type", "sessionRequest"] },
                    },
                  },
                  as: "c",
                  in: "$$c.count",
                },
              },
            },
            0,
          ],
        },
      },
    },

    // 🔹 Correct chronological sorting
    { $sort: { year: 1, month: 1 } },
  ]);

  return analytics;
};
