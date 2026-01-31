import mongoose, { Schema, Document, Types } from "mongoose";
import {
  AttendanceStatusEnum,
  AttendanceStatusEnumType,
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
  attendance: {
    mentorJoinedAt: Date;
    learnerJoinedAt: Date;
    mentorLeftAt: Date;
    learnerLeftAt: Date;
  };
  attendanceStatus: AttendanceStatusEnumType | null;
  video?: VideoInfo;
  completedAt: Date;
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

    attendance: {
      mentorJoinedAt: {
        type: Date,
        default: null,
      },
      learnerJoinedAt: {
        type: Date,
        default: null,
      },
      mentorLeftAt: {
        type: Date,
        default: null,
      },
      learnerLeftAt: {
        type: Date,
        default: null,
      },
    },

    attendanceStatus: {
      type: String,
      enum: Object.values(AttendanceStatusEnum),
      default: null,
    },
    completedAt: {
      type: Date,
      default: null,
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
   Index
======================= */

// mentor side
sessionSchema.index(
  { mentorId: 1, scheduledAt: 1, from: 1, to: 1 },
  {
    name: "mentor_day_overlap_accepted_idx",
    partialFilterExpression: {
      status: SessionStatusEnum.ACCEPTED,
    },
  },
);

// learner side
sessionSchema.index(
  { learnerId: 1, scheduledAt: 1, from: 1, to: 1 },
  {
    name: "learner_day_overlap_accepted_idx",
    partialFilterExpression: {
      status: SessionStatusEnum.ACCEPTED,
    },
  },
);

sessionSchema.index(
  { mentorId: 1, learnerId: 1 },
  {
    name: "mentor_learner_active_session_idx",
    partialFilterExpression: {
      status: { $in: [SessionStatusEnum.REQUESTED, SessionStatusEnum.ACCEPTED] },
    },
  },
);

sessionSchema.index(
  { to: 1 },
  {
    partialFilterExpression: { status: SessionStatusEnum.ACCEPTED },
    name: "accepted_sessions_to_index",
  },
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
