import mongoose, { Schema, Document } from "mongoose";

import {
  SkillLevelEnum,
  SkillLevelEnumType,
  SkillTypeEnum,
  SkillType,
  SkillCategoryEnum,
  SkillCategoryEnumType,
} from "../enums/skill.enum";
import { WeekDay } from "../enums/date-range.enum";

/* ---------- Types ---------- */

interface Availability {
  days: WeekDay[];
  timeSlots: string[]; // "18:00-20:00"
}

export interface UserSkillDocument extends Document {
  userId: mongoose.Types.ObjectId;
  skillName: string;
  skillType: SkillType;
  skillLevel: SkillLevelEnumType;
  category: SkillCategoryEnumType;
  description: string;
  experienceYears?: number;
  availability?: Availability;
  createdAt: Date;
  updatedAt: Date;
}

/* ---------- Schema ---------- */

const userSkillSchema = new Schema<UserSkillDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    skillName: {
      type: String,
      trim: true,
      required: true,
    },

    skillType: {
      type: String,
      enum: Object.values(SkillTypeEnum),
      default: SkillTypeEnum.LEARN,
      required: true,
    },

    skillLevel: {
      type: String,
      enum: Object.values(SkillLevelEnum),
      default: SkillLevelEnum.BEGINNER,
      required: true,
    },
    category: {
      type: String,
      enum: Object.values(SkillCategoryEnum),
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    experienceYears: {
      type: Number,
      required: function () {
        return this.skillType === SkillTypeEnum.TEACH;
      },
    },
    availability: {
      days: {
        type: [String],
        enum: Object.values(WeekDay),
        required: function () {
          return this.skillType === SkillTypeEnum.TEACH;
        },
      },
      timeSlots: {
        type: [String],
        required: function () {
          return this.skillType === SkillTypeEnum.TEACH;
        },
      },
    },
  },
  { timestamps: true }
);

userSkillSchema.pre("validate", function () {
  const doc = this as UserSkillDocument;

  if (
    doc.skillType === SkillTypeEnum.TEACH &&
    (!doc.experienceYears || !doc.availability?.days?.length)
  ) {
    throw new Error("Teaching skills require experience and availability");
  }
});

const UserSkillModel = mongoose.model<UserSkillDocument>("UserSkill", userSkillSchema);
export default UserSkillModel;
