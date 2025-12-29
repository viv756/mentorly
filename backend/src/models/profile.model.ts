import mongoose, { Schema, Document, Types } from "mongoose";

/* =======================
   Interfaces
======================= */

interface Rating {
  average: number;
  count: number;
}

interface SocialLinks {
  linkedin: string | null;
  github: string | null;
  twitter: string | null;
}

export interface ProfileDocument extends Document {
  userId: Types.ObjectId;
  avatar: string | null;
  bio: string | null;
  profileCompleteness: number;
  rating: Rating;
  socialLinks: SocialLinks;
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
      default: null,
    },

    bio: {
      type: String,
      trim: true,
      maxlength: 500,
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

    socialLinks: {
      linkedin: {
        type: String,
        default: null,
      },
      github: {
        type: String,
        default: null,
      },
      twitter: {
        type: String,
        default: null,
      },
    },
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
  if (this.bio) completeness += 30;
  if (this.socialLinks.linkedin) completeness += 15;
  if (this.socialLinks.github) completeness += 15;
  if (this.socialLinks.twitter) completeness += 10;

  this.profileCompleteness = Math.min(completeness, 100);
});

/* =======================
   Model
======================= */

const ProfileModel = mongoose.model<ProfileDocument>("Profile", profileSchema);
export default ProfileModel;
