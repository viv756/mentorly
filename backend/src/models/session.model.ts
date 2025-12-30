import mongoose, { Schema, Document, Types } from "mongoose";

/* =======================
   Enums
======================= */

export enum SessionTypeEnum {
  VIDEO = "video",
  CHAT = "chat",
}

export enum SessionStatusEnum {
  REQUESTED = "requested",
  ACCEPTED = "accepted",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum VideoProviderEnum {
  WEBRTC = "webrtc",
  TWILIO = "twilio",
  AGORA = "agora",
}

/* =======================
   Interfaces
======================= */

export interface VideoInfo {
  provider: VideoProviderEnum;
  roomId: string;
}

export interface SessionDocument extends Document {
  mentorId: Types.ObjectId;
  learnerId: Types.ObjectId;
  skillId: Types.ObjectId;
  sessionType: SessionTypeEnum;
  scheduledAt: Date;
  durationMinutes: number;
  status: SessionStatusEnum;
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

    durationMinutes: {
      type: Number,
      required: true,
      min: 5,
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
  { timestamps: true }
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
