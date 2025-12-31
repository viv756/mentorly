import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { userSkillZodSchema } from "../validator/user-skill.validator";
import { createUserSkillService, getUserSkillsService } from "../services/user-skill.service";
import { HTTP_STATUS } from "../config/http.config";

export const createUserSkillController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const body = userSkillZodSchema.parse(req.body);
  const userSkill = await createUserSkillService(body, userId);

  return res.status(HTTP_STATUS.CREATED).json({
    message: "Skill created",
    userSkill,
  });
});

export const getUserSkillsController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const userSkills = await getUserSkillsService(userId);

  return res.status(HTTP_STATUS.OK).json({
    message: "User skills fetched successfully",
    userSkills,
  });
});
