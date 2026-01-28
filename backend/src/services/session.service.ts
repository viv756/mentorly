import { Types } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import SessionModel from "../models/session.model";
import { SessionStatusEnum, SessionTypeEnum, VideoProviderEnum } from "../enums/session.enum";
import { BadRequestException, NotFoundException, UnauthorizedException } from "../utils/appError";
import { toUTCDate } from "../utils/generateAgoraExpireInSeconds";
import { CreateAcceptRequestBodyType, CreateBodyType } from "../validator/session.validator";

export const createSessionService = async (userId: string, body: CreateBodyType) => {
  if (userId.toString() !== body.learnerId) {
    throw new UnauthorizedException("You can't create session");
  }

  const fromUTC = toUTCDate(body.date, body.from, body.timezone);
  const toUTC = toUTCDate(body.date, body.to, body.timezone);

  if (fromUTC >= toUTC) {
    throw new Error("Invalid session time range");
  }

  const channelName = `sess_${uuidv4().replace(/-/g, "").slice(0, 24)}`;

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

export const getCurrentUserSessionRequestService = async (userId: string) => {
  const sessionRequests = await SessionModel.aggregate([
    {
      $match: {
        mentorId: new Types.ObjectId(userId),
        status: "REQUESTED",
      },
    },

    {
      $lookup: {
        from: "users",
        localField: "learnerId",
        foreignField: "_id",
        as: "learner",
        pipeline: [{ $project: { password: 0, email: 0 } }],
      },
    },
    { $unwind: "$learner" },

    {
      $lookup: {
        from: "profiles",
        localField: "learner._id",
        foreignField: "userId",
        as: "learner.profile",
        pipeline: [{ $project: { _id: 1, bio: 1, avatar: 1 } }],
      },
    },
    {
      $unwind: {
        path: "$learner.profile",
        preserveNullAndEmptyArrays: true,
      },
    },

    // 🔥 SKILL POPULATION
    {
      $lookup: {
        from: "userskills",
        localField: "skillId",
        foreignField: "_id",
        as: "skill",
        pipeline: [{ $project: { _id: 1, skillName: 1 } }],
      },
    },
    {
      $unwind: {
        path: "$skill",
        preserveNullAndEmptyArrays: true,
      },
    },

    // Optional cleanup
    {
      $project: {
        skillId: 0,
      },
    },
  ]);

  return sessionRequests;
};

export const getCurrentUserRequestedAndUpcomingSessionsService = async (userId: string) => {
  const now = new Date();

  const sessions = await SessionModel.aggregate([
    {
      $match: {
        $or: [
          // REQUESTED → learner only
          {
            status: "REQUESTED",
            learnerId: new Types.ObjectId(userId),
          },

          // ACCEPTED → learner OR mentor
          {
            status: "ACCEPTED",
            $or: [
              { learnerId: new Types.ObjectId(userId) },
              { mentorId: new Types.ObjectId(userId) },
            ],
          },
        ],
      },
    },

    // 🧠 Compute label
    {
      $addFields: {
        sessionTypeLabel: {
          $cond: [
            { $eq: ["$status", "REQUESTED"] },
            "REQUESTED",
            {
              $cond: [{ $gte: ["$from", now] }, "UPCOMING", "PAST"],
            },
          ],
        },
      },
    },

    // Mentor lookup
    {
      $lookup: {
        from: "users",
        localField: "mentorId",
        foreignField: "_id",
        as: "mentor",
        pipeline: [{ $project: { password: 0, email: 0 } }],
      },
    },
    { $unwind: "$mentor" },

    {
      $lookup: {
        from: "profiles",
        localField: "mentor._id",
        foreignField: "userId",
        as: "mentor.profile",
        pipeline: [{ $project: { _id: 1, bio: 1, avatar: 1 } }],
      },
    },
    {
      $unwind: {
        path: "$mentor.profile",
        preserveNullAndEmptyArrays: true,
      },
    },

    // Skill lookup
    {
      $lookup: {
        from: "userskills",
        localField: "skillId",
        foreignField: "_id",
        as: "skill",
        pipeline: [{ $project: { _id: 1, skillName: 1, description: 1 } }],
      },
    },
    {
      $unwind: {
        path: "$skill",
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $project: {
        skillId: 0,
      },
    },

    // 🚀 Split into two arrays
    {
      $facet: {
        requested: [{ $match: { sessionTypeLabel: "REQUESTED" } }, { $sort: { from: 1 } }],
        upcoming: [{ $match: { sessionTypeLabel: "UPCOMING" } }, { $sort: { from: 1 } }],
      },
    },
  ]);

  return sessions;
};

export const createAcceptRequestSessionService = async (
  userId: string,
  body: CreateAcceptRequestBodyType,
) => {
  if (userId.toString() !== body.learnerId) {
    throw new UnauthorizedException("You can't create session");
  }

  const channelName = `sess_${uuidv4().replace(/-/g, "").slice(0, 24)}`;

  const fromUTC = toUTCDate(body.date, body.from, body.timezone);
  const toUTC = toUTCDate(body.date, body.to, body.timezone);

  if (fromUTC >= toUTC) {
    throw new Error("Invalid session time range");
  }

  const pendingSession = await SessionModel.findById(body.sessionId);
  if (!pendingSession) {
    throw new NotFoundException("session not found");
  }

  const session = new SessionModel({
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

  session.status = SessionStatusEnum.ACCEPTED;
  await session.save();
  if (!session) {
    throw new BadRequestException("Session creation failed");
  }

  pendingSession.status = SessionStatusEnum.ACCEPTED;
  await pendingSession.save();

  return session;
};

export const findSessionByIdService = async (sessionId: string, userId: string) => {
  const session = await SessionModel.findById(sessionId);
  if (!session) {
    throw new NotFoundException("Session not found");
  }

  if (!session.mentorId.equals(userId) && !session.learnerId.equals(userId)) {
    throw new UnauthorizedException("You cannot join this session");
  }

  // const now = new Date();
  // const sessionStart = session.scheduledAt;
  // const sessionEnd = new Date(sessionStart.getTime() + 60 * 60 * 1000);

  // if (now < sessionStart) {
  //   throw new Error("Session not started yet");
  // }

  // if (now > sessionEnd) {
  //   throw new Error("Session already ended");
  // }

  const channelName = session.video!.roomId;

  return { channelName, expire: session.to, learnerId: session.learnerId };
};
