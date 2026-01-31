import mongoose, { Schema } from "mongoose";
import {
  BadgeKeyEnum,
  BadgeKeyEnumType,
  BadgeLevelEnum,
  BadgeLevelEnumType,
} from "../enums/badge.enum";

export interface AchievementDocument {
  userId: mongoose.Types.ObjectId;
  badgeId: mongoose.Types.ObjectId;
  badgeKey: BadgeKeyEnumType;
  level: BadgeLevelEnumType;
  earnedAt: Date;
}

const achievementSchema = new Schema<AchievementDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  badgeId: {
    type: Schema.Types.ObjectId,
    ref: "Badge",
    required: true,
  },
  badgeKey: {
    type: String,
    enum: Object.values(BadgeKeyEnum),
    required: true,
  },
  level: {
    type: String,
    enum: Object.values(BadgeLevelEnum),
    default: BadgeLevelEnum.BRONZE,
    required: true,
  },
  earnedAt: {
    type: Date,
    default: Date.now,
  },
});

const AchievementModel = mongoose.model<AchievementDocument>("Achievement", achievementSchema);
export default AchievementModel;
