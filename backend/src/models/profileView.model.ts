import mongoose, { Schema } from "mongoose";

interface ProfileViewDocument {
  profileId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  viewerId: mongoose.Types.ObjectId;
  viewedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const profileViewSchema = new Schema<ProfileViewDocument>(
  {
    profileId: { type: Schema.Types.ObjectId, ref: "Profile", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "Profile", required: true },
    viewerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    viewedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const ProfileViewModel = mongoose.model<ProfileViewDocument>("ProfileView", profileViewSchema);
export default ProfileViewModel;
