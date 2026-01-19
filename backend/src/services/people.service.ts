import { Types } from "mongoose";
import { SkillLevelEnum, SkillTypeEnum } from "../enums/skill.enum";
import ProfileModel from "../models/profile.model";
import UserSkillModel from "../models/user-skill.model";
import UserModel from "../models/user.model";
import { NotFoundException } from "../utils/appError";

export const findPeopleService = async (userId: string) => {
  const userObjectId = new Types.ObjectId(userId);

  /* 1️⃣ Get current user skills */
  const userSkills = await UserSkillModel.find({ userId: userObjectId }).lean();
  if (!userSkills.length) {
    throw new NotFoundException("User skills not found");
  }

  /* 2️⃣ Get current user profile */
  const userProfile = await ProfileModel.findOne({ userId: userObjectId }).lean();
  if (!userProfile) {
    throw new NotFoundException("Profile not found");
  }

  /* 3️⃣ Build opposite skill match conditions */
  const skillMatchConditions = userSkills.map((skill) => ({
    skillName: skill.skillName,
    category: skill.category,
    skillType: skill.skillType === SkillTypeEnum.LEARN ? SkillTypeEnum.TEACH : SkillTypeEnum.LEARN,
  }));

  /* 4️⃣ Aggregation */
  const users = UserSkillModel.aggregate([
    /* Match opposite skills */
    {
      $match: {
        userId: { $ne: userObjectId },
        $or: skillMatchConditions,
      },
    },

    /* Join profile */
    {
      $lookup: {
        from: "profiles",
        localField: "userId",
        foreignField: "userId",
        as: "profile",
      },
    },
    { $unwind: "$profile" },

    /* Join user */
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },

    /* Skill level score */
    {
      $addFields: {
        skillScore: {
          $switch: {
            branches: [
              {
                case: {
                  $and: [
                    { $eq: ["$skillLevel", SkillLevelEnum.ADVANCED] },
                    { $gte: ["$experienceYears", 5] },
                  ],
                },
                then: 30,
              },
              {
                case: { $eq: ["$skillLevel", SkillLevelEnum.INTERMEDIATE] },
                then: 20,
              },
              {
                case: { $eq: ["$skillLevel", SkillLevelEnum.BEGINNER] },
                then: 10,
              },
            ],
            default: 5,
          },
        },
      },
    },

    /* Experience score */
    {
      $addFields: {
        experienceScore: {
          $cond: [
            { $ifNull: ["$experienceYears", false] },
            {
              $cond: [
                { $gte: ["$experienceYears", 8] },
                20,
                { $multiply: ["$experienceYears", 2] },
              ],
            },
            0,
          ],
        },
      },
    },

    /* Rating score */
    {
      $addFields: {
        ratingScore: {
          $cond: [
            { $gte: ["$profile.rating.average", 4.5] },
            25,
            { $multiply: ["$profile.rating.average", 5] },
          ],
        },
      },
    },

    /* Location score */
    {
      $addFields: {
        locationScore: {
          $cond: [{ $eq: ["$profile.location", userProfile.location] }, 15, 0],
        },
      },
    },

    /* Activeness score (last 7 days) */
    {
      $addFields: {
        activeScore: {
          $cond: [
            {
              $gte: ["$user.lastActiveAt", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)],
            },
            10,
            0,
          ],
        },
      },
    },

    /* Final score */
    {
      $addFields: {
        finalMatchScore: {
          $add: [
            "$skillScore",
            "$experienceScore",
            "$ratingScore",
            "$locationScore",
            "$activeScore",
          ],
        },
      },
    },

    /* Group per user */
    {
      $group: {
        _id: "$userId",
        totalScore: { $sum: "$finalMatchScore" },
        matchedSkills: {
          $push: {
            skillName: "$skillName",
            category: "$category",
            skillType: "$skillType",
            skillLevel: "$skillLevel",
            experienceYears: "$experienceYears",
          },
        },
        profile: { $first: "$profile" },
        user: { $first: "$user" },
      },
    },

    /* Sort best matches */
    { $sort: { totalScore: -1 } },

    /* ✅ Limit to top 10 users */
    { $limit: 10 },

    /* Final response shape */
    {
      $project: {
        _id: 0,
        userId: "$user._id",
        name: "$user.name",
        email: "$user.email",
        totalScore: 1,
        profile: {
          bio: "$profile.bio",
          location: "$profile.location",
          rating: "$profile.rating",
          avatar:"$profile.avatar"
        },
        matchedSkills: 1,
      },
    },
  ]);

  return users;
};
