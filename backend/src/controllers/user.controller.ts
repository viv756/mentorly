import { Request, Response } from "express";

import { asyncHandler } from "../asyncHandler.middleware";
import { findByIdUserService, updateProfileService } from "../services/user.service";
import { HTTP_STATUS } from "../config/http.config";
import { createProfileSchema } from "../validator/user.validator";

export const getCurrentUserController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;

  const user = await findByIdUserService(userId);

  return res.status(HTTP_STATUS.OK).json({
    message: "User fetched successfully",
    user,
  });
});

export const updateProfileController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;

  const validatedData = createProfileSchema.parse(req.body);

  const profile = await updateProfileService(userId, validatedData);

  return res.status(HTTP_STATUS.OK).json({
    message: "Profile updated",
    profile,
  });
});
