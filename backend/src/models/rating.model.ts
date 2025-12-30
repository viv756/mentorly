import mongoose, { Schema, Document, Types } from "mongoose";

export interface RatingDocument extends Document {
  sessionId: Types.ObjectId;
  fromUserId: Types.ObjectId;
  toUserId: Types.ObjectId;
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

    fromUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    toUserId: {
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
  if (this.fromUserId && this.toUserId && this.fromUserId.equals(this.toUserId)) {
    throw new Error("User cannot rate himself");
  }
});

const RatingModel = mongoose.model<RatingDocument>("Rating", ratingSchema);
export default RatingModel;
