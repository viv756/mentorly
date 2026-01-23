import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { createSessionSchema } from "../validator/session.validator";
import {
  createSessionService,
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

    const sessionInbox = await getCurrentUserSessionRequestService(userId);

    return res.status(HTTP_STATUS.OK).json({
      message: "Session fetched successfully",
      sessionInbox,
    });
  },
);
