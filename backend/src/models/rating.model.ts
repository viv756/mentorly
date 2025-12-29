import mongoose, { Schema, Document, Types } from "mongoose";

export interface RatingDocument extends Document {
  sessionId: Types.ObjectId;
  mentorId: Types.ObjectId;
  learnerId: Types.ObjectId;
  rating: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ratingSchema = new Schema<RatingDocument>(
  {
    sessionId: {
      type: Schema.Types.ObjectId,
      ref: "Session",
      required: true,
      index: true,
    },

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

    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    comment: {
      type: String,
      trim: true,
      maxlength: 300,
    },
  },
  { timestamps: true }
);

ratingSchema.index({ sessionId: 1 }, { unique: true });

ratingSchema.pre("validate", function () {
  if (this.mentorId && this.learnerId && this.mentorId.equals(this.learnerId)) {
    throw new Error("Mentor and learner cannot be the same user");
  }
});

const RatingModel = mongoose.model<RatingDocument>("Rating", ratingSchema);
export default RatingModel;
