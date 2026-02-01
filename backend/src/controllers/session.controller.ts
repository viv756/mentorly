import { Request, Response } from "express";
import crypto from "crypto";

import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { createAcceptRequestSchema, createSessionSchema } from "../validator/session.validator";
import {
  cancelSessionService,
  createAcceptRequestSessionService,
  createSessionService,
  findSessionByIdService,
  getCurrentUserRequestedAndUpcomingSessionsService,
  getCurrentUserSessionRequestService,
  rejectSessionService,
} from "../services/session.service";
import { HTTP_STATUS } from "../config/http.config";
import { generateAgoraToken } from "../config/agora.config";
import { Env } from "../config/env.config";
import { getAgoraExpirySeconds } from "../utils/generateAgoraExpireInSeconds";

export const createSessionController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const body = createSessionSchema.parse(req.body);

  const session = await createSessionService(userId, body);

  return res.status(HTTP_STATUS.OK).json({
    message: "Session created",
    session,
  });
});

export const getCurrentUserSessionRequestController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const sessionRequests = await getCurrentUserSessionRequestService(userId);

    return res.status(HTTP_STATUS.OK).json({
      message: "Session fetched successfully",
      sessionRequests,
    });
  },
);

export const createAcceptRequestSessionController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const body = createAcceptRequestSchema.parse(req.body);

    const acceptSessionRequest = await createAcceptRequestSessionService(userId, body);

    return res.status(HTTP_STATUS.OK).json({
      message: "Session created successfully",
    });
  },
);

export const rejectSessionController = asyncHandler(async (req: Request, res: Response) => {
  const sessionId = req.params.sessionId;

  const session = await rejectSessionService(sessionId);

  return res.status(HTTP_STATUS.OK).json({
    message: "Session rejected",
  });
});

export const cancelSessionController = asyncHandler(async (req: Request, res: Response) => {
  const sessionId = req.params.sessionId;

  await cancelSessionService(sessionId);
  return res.status(HTTP_STATUS.OK).json({
    message: "Session request cancelled",
  });
});

export const getCurrentUserRequestedAndUpcomingSessionsController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const sessions = await getCurrentUserRequestedAndUpcomingSessionsService(userId);

    return res.status(HTTP_STATUS.OK).json({
      message: "Sessions fetched successfully",
      sessions,
    });
  },
);

export const joinSessionController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const sessionId = req.params.sessionId;

  const { channelName, expire, learnerId } = await findSessionByIdService(sessionId, userId);
  const expireSeconds = getAgoraExpirySeconds(expire);

  const uid = parseInt(
    crypto.createHash("md5").update(userId.toString()).digest("hex").slice(0, 8),
    16,
  );

  // Generate Token
  const agoraToken = generateAgoraToken(channelName, uid, expireSeconds);

  return res.status(HTTP_STATUS.OK).json({
    message: "Token generated",
    agoraData: {
      appId: Env.AGORA_APP_ID,
      token: agoraToken,
      channelName,
      uid,
      learnerId: learnerId,
    },
  });
});
