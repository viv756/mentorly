import mongoose from "mongoose";
import AchievementModel from "../models/achievement.model";
import BadgeModel from "../models/badge.model";
import ProfileModel from "../models/profile.model";
import { BadgeKeyEnum, BadgeKeyEnumType, BadgeLevelEnumType } from "../enums/badge.enum";

export const evaluateSessionBadges = async (userId: string) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);

  const profile = await ProfileModel.findOne({ userId: userObjectId });

  if (!profile) return;

  const completedSessions = profile.achievements.completedSessions;

  const eligibleBadges = await BadgeModel.find({
    key: BadgeKeyEnum.SESSION_MASTER,
    minValue: { $lte: completedSessions },
  }).sort({ minValue: 1 });

  for (const badge of eligibleBadges) {
    const alreadyEarned = await AchievementModel.exists({
      userId: userObjectId,
      badgeKey: badge.key,
      level: badge.level,
    });

    if (!alreadyEarned) {
      await AchievementModel.create({
        userId: userObjectId,
        badgeId: badge._id,
        badgeKey: badge.key as BadgeKeyEnumType,
        level: badge.level as BadgeLevelEnumType,
        earnedAt: new Date(),
      });

      console.log(`User ${userId} earned ${badge.level} SESSION_MASTER badge`);
    }
  }
};
