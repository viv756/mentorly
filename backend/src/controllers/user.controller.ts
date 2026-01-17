import { Request, Response } from "express";

import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import {
  findByIdUserService,
  getCurrentUserDataService,
  getCurrentUserProfileService,
  updateProfileService,
  updateWeeklyAvailabilityService,
} from "../services/user.service";
import { HTTP_STATUS } from "../config/http.config";
import { updateProfileSchema, weeklyAvailabilitySchema } from "../validator/user.validator";

export const getCurrentUserController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;

  const user = await findByIdUserService(userId);

  return res.status(HTTP_STATUS.OK).json({
    message: "User fetched successfully",
    user,
  });
});

export const getCurrentUserDataController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;

  const user = await getCurrentUserDataService(userId);

  return res.status(HTTP_STATUS.OK).json({
    message: "User data fetched",
    user,
  });
});

export const updateProfileController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const file = req.file;

  let socialLinks = [];
  if (req.body.socialLinks) {
    socialLinks = JSON.parse(req.body.socialLinks); // convert to array of objects
  }

  const validatedData = updateProfileSchema.parse({
    ...req.body,
    socialLinks: socialLinks,
  });

  const profile = await updateProfileService(userId, validatedData, file);

  return res.status(HTTP_STATUS.OK).json({
    message: "Profile updated",
    profile,
  });
});

export const getCurrentUserProfileController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;

  const userProfile = await getCurrentUserProfileService(userId);

  return res.status(HTTP_STATUS.OK).json({
    message: "Profile fetched successfully",
    userProfile,
  });
});

export const updateWeeklyAvailabilityController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const body = weeklyAvailabilitySchema.parse(req.body);

    const userProfile = await updateWeeklyAvailabilityService(userId, body);

    return res.status(HTTP_STATUS.OK).json({
      message: "Weekly availability updated successfully",
    });
  }
);
