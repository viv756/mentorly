import mongoose, { Schema, Document, Types } from "mongoose";
import { UserDocument } from "./user.model";

/* =======================
   Interfaces
======================= */

interface Rating {
  average: number;
  count: number;
}

interface SocialLink {
  platform: "linkedin" | "github" | "twitter";
  url: string;
}

export interface ProfileDocument extends Document {
  userId: Types.ObjectId | UserDocument;
  avatar: string;
  bio: string | null;
  location: string | null;
  profileCompleteness: number;
  rating: Rating;
  socialLinks: SocialLink[];
  createdAt: Date;
  updatedAt: Date;
}

/* =======================
   Schema
======================= */

const profileSchema = new Schema<ProfileDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/devincarloz/image/upload/v1758973241/vsurmkwxyrfuqmdd5xgs.jpg",
    },

    bio: {
      type: String,
      trim: true,
      maxlength: 500,
      default: null,
    },
    location: {
      type: String,
      trim: true,
      default: null,
    },

    profileCompleteness: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    rating: {
      average: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },

    socialLinks: [
      {
        platform: {
          type: String,
          enum: ["linkedin", "github", "twitter"],
          required: true,
        },
        url: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
  },
  { timestamps: true }
);

/* =======================
   Middleware
======================= */

// Auto-calculate profile completeness
profileSchema.pre("save", function () {
  let completeness = 0;

  if (this.avatar) completeness += 20;
  if (this.bio) completeness += 20;
  if (this.location) completeness += 10;

  if (this.socialLinks?.length) {
    completeness += Math.min(this.socialLinks.length * 10, 30);
  }

  this.profileCompleteness = Math.min(completeness, 100);
});

/* =======================
   Model
======================= */

const ProfileModel = mongoose.model<ProfileDocument>("Profile", profileSchema);
export default ProfileModel;
