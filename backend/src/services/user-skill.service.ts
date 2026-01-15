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
  });

  if (!userSkill) {
    throw new BadRequestException("Failed to create skill");
  }

  return userSkill;
};

export const getUserSkillsService = async (userId: string) => {
  const userSkills = await UserSkillModel.find({ userId }).lean();
  if (!userSkills) {
    throw new NotFoundException("User don,t have any skill");
  }

  return userSkills;
};

export const deleteUserSkillService = async (userId: string, skillId: string) => {
  const deletedSkill = await UserSkillModel.findOneAndDelete({
    _id: skillId,
    userId,
  });

  if (!deletedSkill) {
    throw new NotFoundException("Skill not found or you are not allowed to delete it");
  }

  return;
};

export const getSkillByIdService = async (skillId: string) => {
  const userSkill = await UserSkillModel.findById(skillId).lean();

  if (!userSkill) {
    throw new NotFoundException("Skill not found ");
  }

  return userSkill;
};
