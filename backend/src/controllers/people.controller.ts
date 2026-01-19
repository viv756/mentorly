import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { findPeopleService } from "../services/people.service";
import { HTTP_STATUS } from "../config/http.config";

export const findPeopleController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;

  const users = await findPeopleService(userId);

  return res.status(HTTP_STATUS.OK).json({
    message: "Users fetched",
    users,
  });
});
