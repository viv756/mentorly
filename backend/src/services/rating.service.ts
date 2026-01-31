import { SessionStatusEnum } from "../enums/session.enum";
import ProfileModel from "../models/profile.model";
import RatingModel from "../models/rating.model";
import SessionModel from "../models/session.model";
import { BadRequestException } from "../utils/appError";
import { RatingType } from "../validator/rating.validator";

export const createFeedbackService = async (
  data: RatingType,
  sessionId: string,
  fromUserId: string,
) => {
  const session = await SessionModel.findById(sessionId);
  if (!session || session.status === SessionStatusEnum.COMPLETED) {
    throw new BadRequestException("This session is not exist or completed");
  }

  if (session.learnerId.toString() !== fromUserId) {
    throw new BadRequestException("You cant give feedback");
  }

  const rating = await RatingModel.create({
    rating: data.rating,
    comment: data.comment,
    sessionId: session._id,
    fromUserId,
    toUserId: session.mentorId,
  });

  const profile = await ProfileModel.findOne({ userId: session.mentorId });
  if (!profile) {
    throw new BadRequestException("Mentor profile not found");
  }

  const newCount = profile.rating.count + 1;
  const newAverage = (profile.rating.average * profile.rating.count + data.rating) / newCount;

  profile.rating.average = Math.min(5, Math.max(0, newAverage));
  profile.rating.count = newCount;

  await profile.save();

  return rating;
};
