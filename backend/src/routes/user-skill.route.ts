import { Router } from "express";
import {
  createUserSkillController,
  deleteUserSkillController,
  getSkillByIdAndWeeklyAvailabilityController,
  getUserSkillsController,
} from "../controllers/user-skill.controller";

const userSkillRoutes = Router();

userSkillRoutes.get("/all", getUserSkillsController);
userSkillRoutes.get("/:id/user/:userId", getSkillByIdAndWeeklyAvailabilityController);

userSkillRoutes.post("/create", createUserSkillController);

userSkillRoutes.delete("/delete/:id", deleteUserSkillController);

export default userSkillRoutes;
