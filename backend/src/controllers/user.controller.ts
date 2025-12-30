import { Request, Response } from "express";

import { asyncHandler } from "../asyncHandler.middleware";
import { findByIdUserService } from "../services/user.service";
import { HTTP_STATUS } from "../config/http.config";

export const getCurrentUserController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;

  const user = await findByIdUserService(userId);

  return res.status(HTTP_STATUS.OK).json({
    message: "User fetched successfully",
    user,
  });
});
