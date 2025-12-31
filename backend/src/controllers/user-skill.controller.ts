import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { userSkillZodSchema } from "../validator/user-skill.validator";
import { createUserSkillService } from "../services/user-skill.service";
import { HTTP_STATUS } from "../config/http.config";

export const createUserSkillController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  console.log(req.body);

  const body = userSkillZodSchema.parse(req.body);
  console.log(body, "after");

  const userSkill = await createUserSkillService(body, userId);

  return res.status(HTTP_STATUS.CREATED).json({
    message: "Skill created",
    userSkill,
  });
});
