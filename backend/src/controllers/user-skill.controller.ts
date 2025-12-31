import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { skillIdSchema, userSkillZodSchema } from "../validator/user-skill.validator";
import {
  createUserSkillService,
  deleteUserSkillService,
  getSkillByIdService,
  getUserSkillsService,
} from "../services/user-skill.service";
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

export const deleteUserSkillController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const skillId = skillIdSchema.parse(req.params.id);

  await deleteUserSkillService(userId, skillId);

  return res.status(HTTP_STATUS.OK).json({
    message: "Skill deleted successfully",
  });
});

export const getSkillByIdController = asyncHandler(async (req: Request, res: Response) => {
  const skillId = skillIdSchema.parse(req.params.id);

  const userSkill = await getSkillByIdService(skillId);
  
  return res.status(HTTP_STATUS.OK).json({
    message: "Skill fetched successfully",
    userSkill,
  });
});
