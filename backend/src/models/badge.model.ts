import mongoose, { Document, Schema } from "mongoose";
import {
  BadgeKeyEnum,
  BadgeKeyEnumType,
  BadgeLevelEnum,
  BadgeLevelEnumType,
} from "../enums/badge.enum";

export interface BadgeDocument extends Document {
  name: string;
  icon: string;
  key: BadgeKeyEnumType | null;
  level: BadgeLevelEnumType;
  minValue: number;
}

const badgeSchema = new Schema<BadgeDocument>({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    enum: Object.values(BadgeKeyEnum),
    default: null,
  },
  level: {
    type: String,
    enum: Object.values(BadgeLevelEnum),
    required:true
  },
  minValue: {
    type: Number,
    default: 0,
  },
});

const BadgeModel = mongoose.model<BadgeDocument>("Badge", badgeSchema);
export default BadgeModel;
