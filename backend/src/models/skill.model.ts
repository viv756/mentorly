import mongoose, { Document, Schema } from "mongoose";
import { SkillCategoryEnum, SkillCategoryEnumType } from "../enums/skill.enum";

export interface SkillDocument extends Document {
  name: string;
  category: SkillCategoryEnumType;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

const skillSchema = new Schema<SkillDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: Object.values(SkillCategoryEnum),
      required: true,
    },
    price: {
      type: Number,
      min: 10,
      default: 10,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const SkillModel = mongoose.model<SkillDocument>("Skill", skillSchema);
export default SkillModel;
