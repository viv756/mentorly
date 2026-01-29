import { Types } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import SessionModel from "../models/session.model";
import { SessionStatusEnum, SessionTypeEnum, VideoProviderEnum } from "../enums/session.enum";
import { BadRequestException, NotFoundException, UnauthorizedException } from "../utils/appError";
import { CreateAcceptRequestBodyType, CreateBodyType } from "../validator/session.validator";
import { mergeDateWithTime } from "../utils/mergeDateWithTime";

export const createSessionService = async (userId: string, body: CreateBodyType) => {
  if (userId.toString() !== body.learnerId) {
    throw new UnauthorizedException("You can't create session");
  }

  if (body.from >= body.to) {
    throw new Error("Invalid session time range");
  }

  // Merge time with actual date
  const scheduledAt = mergeDateWithTime(body.date, body.from);

  // 1️⃣ User-level rule
  const alreadyBooked = await SessionModel.findOne({
    mentorId: body.mentorId,
    learnerId: userId,
    status: { $in: [SessionStatusEnum.REQUESTED, SessionStatusEnum.ACCEPTED] },
  });

  if (alreadyBooked) {
    throw new BadRequestException("You have already requested a session with this mentor");
  }

  const overlapBaseQuery = {
    status: SessionStatusEnum.ACCEPTED,
    scheduledAt,
    from: { $lt: body.to },
    to: { $gt: body.from },
  };

  const [mentorConflict, learnerConflict] = await Promise.all([
    SessionModel.findOne({ mentorId: userId, ...overlapBaseQuery }),
    SessionModel.findOne({ learnerId: userId, ...overlapBaseQuery }),
  ]);

  const userNotAvailable = mentorConflict || learnerConflict;

  if (userNotAvailable) {
    throw new BadRequestException("You already have a session during this time");
  }

  const conflict = await SessionModel.findOne({
    mentorId: body.mentorId,
    scheduledAt: scheduledAt,
    status: SessionStatusEnum.ACCEPTED, // only block accepted sessions
    from: { $lte: body.to }, // existing session starts before or at new session end
    to: { $gte: body.from }, // existing session ends after or at new session start
  });

  if (conflict) {
    throw new BadRequestException("This time slot is already booked for the mentor");
  }

  const channelName = `sess_${uuidv4().replace(/-/g, "").slice(0, 24)}`;

  const session = await SessionModel.create({
    mentorId: body.mentorId,
    learnerId: body.learnerId,
    skillId: body.skillId,
    sessionType: SessionTypeEnum.VIDEO,
    scheduledAt: scheduledAt,
    from: body.from,
    to: body.to,
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
              $cond: [{ $gte: ["$scheduledAt", now] }, "UPCOMING", "PAST"],
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

    // learner lookup
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

  if (body.from >= body.to) {
    throw new Error("Invalid session time range");
  }

  // Merge time with actual date
  const scheduledAt = mergeDateWithTime(body.date, body.from);

  // 1️⃣ User-level rule
  const alreadyBooked = await SessionModel.findOne({
    mentorId: body.mentorId,
    learnerId: userId,
    status: { $in: [SessionStatusEnum.REQUESTED, SessionStatusEnum.ACCEPTED] },
  });

  if (alreadyBooked) {
    throw new BadRequestException("You have already requested a session with this mentor");
  }

  const userNotAvailable = await SessionModel.findOne({
    $or: [{ mentorId: userId }, { learnerId: userId }],
    status: SessionStatusEnum.ACCEPTED,
    scheduledAt: scheduledAt,
    // 🔥 overlap logic
    from: { $lt: body.to }, // existing starts before new ends
    to: { $gt: body.from }, // existing ends after new starts
  });

  if (userNotAvailable) {
    throw new BadRequestException("You already have a session during this time");
  }

  const conflict = await SessionModel.findOne({
    mentorId: body.mentorId,
    status: SessionStatusEnum.ACCEPTED, // only block accepted sessions
    from: { $lte: body.to }, // existing session starts before or at new session end
    to: { $gte: body.from }, // existing session ends after or at new session start
  });

  if (conflict) {
    throw new BadRequestException("This time slot is already booked for the mentor");
  }

  const channelName = `sess_${uuidv4().replace(/-/g, "").slice(0, 24)}`;

  const pendingSession = await SessionModel.findById(body.sessionId);
  if (!pendingSession) {
    throw new NotFoundException("session not found");
  }

  const session = new SessionModel({
    mentorId: body.mentorId,
    learnerId: body.learnerId,
    skillId: body.skillId,
    sessionType: SessionTypeEnum.VIDEO,
    scheduledAt: scheduledAt,
    from: body.from,
    to: body.to,
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
  //   throw new BadRequestException("Session not started yet");
  // }

  // if (now > sessionEnd) {
  //   throw new BadRequestException("Session already ended");
  // }

  const channelName = session.video!.roomId;
  const scheduledDate = session.scheduledAt.toISOString().split("T")[0];

  const endTime = new Date(session.to.getTime() + 5 * 60 * 1000);
  const expire = mergeDateWithTime(scheduledDate, endTime);

  return { channelName, expire, learnerId: session.learnerId };
};
