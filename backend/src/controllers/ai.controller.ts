import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { aiAssistantService, ChatMessage } from "../services/ai.service";
import { HTTP_STATUS } from "../config/http.config";

export const aiAssistantController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const { message} = req.body.message;

  const response = await aiAssistantService(message, userId);

  return res.status(HTTP_STATUS.OK).json({
    message: "Ai fetched",
    response,
  });
});
