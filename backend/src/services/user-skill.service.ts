import { Types } from "mongoose";
import ProfileModel from "../models/profile.model";
import UserSkillModel from "../models/user-skill.model";
import UserModel, { UserDocument } from "../models/user.model";
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

  const learningGoals = [];
  const mentoringGoals = [];

  for (const skill of userSkills) {
    if (skill.skillType === "LEARN") {
      learningGoals.push(skill);
    } else if (skill.skillType === "TEACH") {
      mentoringGoals.push(skill);
    }
  }

  return { learningGoals, mentoringGoals };
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

export const getSkillByIdAndWeeklyAvailabilityService = async (skillId: string, userId: string) => {
  const userSkill = await UserSkillModel.findById(skillId).lean();
  if (!userSkill) {
    throw new NotFoundException("Skill not found ");
  }

  const userProfile = await ProfileModel.findOne({ userId })
    .populate("userId", "-email")
    .select("weeklyAvailability avatar userId")
    .exec();

  if (!userProfile) throw new Error("Profile not found");

  function isUserDocument(user: Types.ObjectId | UserDocument): user is UserDocument {
    return typeof user === "object" && "omitPassword" in user;
  }

  if (!isUserDocument(userProfile.userId)) {
    throw new Error("User not populated");
  }

  const safeUser = userProfile.userId.omitPassword();

  return {
    userSkill,
    user: safeUser,
    avatar: userProfile.avatar,
    weeklyAvailability: userProfile.weeklyAvailability,
  };
};
