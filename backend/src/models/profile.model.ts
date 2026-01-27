import mongoose, { Schema, Document, Types } from "mongoose";
import { UserDocument } from "./user.model";

/* =======================
   Interfaces
======================= */

interface TimeSlot {
  from: string; // "HH:mm"
  to: string; // "HH:mm"
}

interface WeeklyAvailability {
  Sun?: TimeSlot[];
  Mon?: TimeSlot[];
  Tue?: TimeSlot[];
  Wed?: TimeSlot[];
  Thu?: TimeSlot[];
  Fri?: TimeSlot[];
  Sat?: TimeSlot[];
}

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
  aboutMe: string | null;
  location: string | null;
  profileCompleteness: number;
  rating: Rating;
  weeklyAvailability: WeeklyAvailability;
  socialLinks: SocialLink[];
  createdAt: Date;
  updatedAt: Date;
}

/* =======================
   Reusable Sub Schema
======================= */

const timeSlotSchema = {
  from: {
    type: String,
    required: true, // "HH:mm"
  },
  to: {
    type: String,
    required: true, // "HH:mm"
  },
};

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
      default: null,
    },
    aboutMe: {
      type: String,
      trim: true,
      maxLength: 1500,
      default: null,
    },
    location: {
      type: String,
      trim: true,
      default: null,
    },
    weeklyAvailability: {
      Sun: { type: [timeSlotSchema], default: [] },
      Mon: { type: [timeSlotSchema], default: [] },
      Tue: { type: [timeSlotSchema], default: [] },
      Wed: { type: [timeSlotSchema], default: [] },
      Thu: { type: [timeSlotSchema], default: [] },
      Fri: { type: [timeSlotSchema], default: [] },
      Sat: { type: [timeSlotSchema], default: [] },
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
  { timestamps: true },
);

/* =======================
   Middleware
======================= */

// Auto-calculate profile completeness
profileSchema.pre("save", function () {
  let completeness = 0;

  if (this.avatar) completeness += 20;
  if (this.bio) completeness += 10;
  if (this.aboutMe) completeness += 20;
  if (this.location) completeness += 20;

  if (this.socialLinks?.length) {
    completeness += Math.min(this.socialLinks.length * 10, 30);
  }

  this.profileCompleteness = Math.min(completeness, 100);
});

profileSchema.index({ userId: 1, location: 1 });

/* =======================
   Model
======================= */

const ProfileModel = mongoose.model<ProfileDocument>("Profile", profileSchema);
export default ProfileModel;
