import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { aiAssistantService } from "../services/ai.service";
import { HTTP_STATUS } from "../config/http.config";
import { ChatMessagesSchema } from "../validator/ai.validator";

export const aiAssistantController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const body = ChatMessagesSchema.parse(req.body);

  const response = await aiAssistantService(body, userId);

  return res.status(HTTP_STATUS.OK).json({
    message: "Ai fetched",
    response,
  });
});
