import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { createAcceptRequestSchema, createSessionSchema } from "../validator/session.validator";
import {
  createAcceptRequestSessionService,
  createSessionService,
  getCurrentUserRequestedAndUpcomingSessionsService,
  getCurrentUserSessionRequestService,
} from "../services/session.service";
import { HTTP_STATUS } from "../config/http.config";

export const createSessionController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const body = createSessionSchema.parse(req.body);

  // create channelName
  const channelName = `meeting_${body.mentorId}_${body.learnerId}_${Date.now()}`;

  const session = await createSessionService(userId, channelName, body);

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
    // create channelName
    const channelName = `meeting_${body.mentorId}_${body.learnerId}_${Date.now()}`;

    const acceptSessionRequest = await createAcceptRequestSessionService(userId, channelName, body);

    return res.status(HTTP_STATUS.OK).json({
      message: "Session created successfully",
    });
  },
);

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
