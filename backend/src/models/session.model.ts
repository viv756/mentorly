import mongoose, { Schema, Document, Types } from "mongoose";
import {
  SessionStatusEnum,
  SessionStatusEnumType,
  SessionTypeEnum,
  SessionTypeEnumType,
  VideoProviderEnum,
  VideoProviderEnumType,
} from "../enums/session.enum";

/* =======================
   Interfaces
======================= */

export interface VideoInfo {
  provider: VideoProviderEnumType;
  roomId: string;
}

export interface SessionDocument extends Document {
  mentorId: Types.ObjectId;
  learnerId: Types.ObjectId;
  skillId: Types.ObjectId;
  sessionType: SessionTypeEnumType;
  scheduledAt: Date;
  from: Date;
  to: Date;
  status: SessionStatusEnumType;
  video?: VideoInfo;
  createdAt: Date;
  updatedAt: Date;
}

/* =======================
   Schema
======================= */

const sessionSchema = new Schema<SessionDocument>(
  {
    mentorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    learnerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    skillId: {
      type: Schema.Types.ObjectId,
      ref: "UserSkill",
      required: true,
    },

    sessionType: {
      type: String,
      enum: Object.values(SessionTypeEnum),
      required: true,
    },

    scheduledAt: {
      type: Date,
      required: true,
    },
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(SessionStatusEnum),
      default: SessionStatusEnum.REQUESTED,
    },

    video: {
      type: {
        provider: {
          type: String,
          enum: Object.values(VideoProviderEnum),
        },
        roomId: {
          type: String,
        },
      },
      required: false,
    },
  },
  { timestamps: true },
);

/* =======================
   Validation Logic
======================= */

sessionSchema.pre("validate", function () {
  if (this.sessionType === SessionTypeEnum.VIDEO) {
    if (!this.video) {
      throw new Error("Video details are required for video sessions");
    }

    if (!this.video.provider || !this.video.roomId) {
      throw new Error("Video provider and roomId are required");
    }
  }

  if (this.sessionType === SessionTypeEnum.CHAT && this.video) {
    throw new Error("Video details are not allowed for chat sessions");
  }
});

/* =======================
   Model
======================= */

const SessionModel = mongoose.model<SessionDocument>("Session", sessionSchema);
export default SessionModel;
