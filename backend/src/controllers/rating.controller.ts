import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { createFeedbackService } from "../services/rating.service";
import { ratingSchema } from "../validator/rating.validator";
import { BadRequestException } from "../utils/appError";
import { HTTP_STATUS } from "../config/http.config";

export const createFeedbackController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const sessionId = req.params.sessionId;
  const fromUserId = req.params.fromUserId;
  const body = ratingSchema.parse(req.body);

  if (userId.toString() !== fromUserId) {
    throw new BadRequestException("You cant comment in this session");
  }

  const rating = await createFeedbackService(body, sessionId, fromUserId);

  return res.status(HTTP_STATUS.OK).json({
    message: "Thank you for your feedback",
    rating,
  });
});
