import SessionModel from "../models/session.model";
import { SessionTypeEnum, VideoProviderEnum } from "../enums/session.enum";
import { BadRequestException, UnauthorizedException } from "../utils/appError";
import { toUTCDate } from "../utils/generateAgoraExpireInSeconds";
import { CreateBodyType } from "../validator/session.validator";
import ProfileModel from "../models/profile.model";

export const createSessionService = async (
  userId: string,
  channelName: string,
  body: CreateBodyType,
) => {
  if (userId.toString() !== body.learnerId) {
    throw new UnauthorizedException("You can't create session");
  }

  const fromUTC = toUTCDate(body.date, body.from, body.timezone);
  const toUTC = toUTCDate(body.date, body.to, body.timezone);

  if (fromUTC >= toUTC) {
    throw new Error("Invalid session time range");
  }

  const session = await SessionModel.create({
    mentorId: body.mentorId,
    learnerId: body.learnerId,
    skillId: body.skillId,
    sessionType: SessionTypeEnum.VIDEO,
    scheduledAt: fromUTC,
    from: fromUTC,
    to: toUTC,
    video: {
      provider: VideoProviderEnum.AGORA,
      roomId: channelName,
    },
  });

  if (!session) {
    throw new BadRequestException("Session creation failed");
  }

  return session;
};

import { Types } from "mongoose";

export const getCurrentUserSessionRequestService = async (userId: string) => {
  const sessionRequests = await SessionModel.aggregate([
    // 1️⃣ Match mentor sessions
    {
      $match: {
        mentorId: new Types.ObjectId(userId),
      },
    },

    // 2️⃣ Lookup learner (User)
    {
      $lookup: {
        from: "users",
        localField: "learnerId",
        foreignField: "_id",
        as: "learner",
        pipeline: [
          {
            $project: {
              password: 0,
              email: 0,
            },
          },
        ],
      },
    },
    {
      $unwind: "$learner",
    },

    // 3️⃣ Lookup learner profile
    {
      $lookup: {
        from: "profiles",
        localField: "learner._id",
        foreignField: "userId",
        as: "learner.profile",
      },
    },
    {
      $unwind: {
        path: "$learner.profile",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);

  if (!sessionRequests.length) {
    throw new BadRequestException("Cannot find sessionInbox");
  }

  return sessionRequests;
};
