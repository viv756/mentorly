import UserSkillModel from "../models/user-skill.model";
import UserModel from "../models/user.model";
import { BadRequestException, NotFoundException } from "../utils/appError";
import { userSkillType } from "../validator/user-skill.validator";

export const createUserSkillService = async (body: userSkillType, userId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new NotFoundException("User not found");
  }

  const userSkill = await UserSkillModel.create({
    ...body,
    userId: user._id,
    availability: body.availability
      ? {
          days: body.availability.days as any,
          timeSlots: body.availability.timeSlots,
        }
      : undefined,
  });

  if (!userSkill) {
    throw new BadRequestException("Failed to create skill");
  }

  console.log(userSkill);
  return userSkill;
};
