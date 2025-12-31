import { Router } from "express";
import { createUserSkillController, getUserSkillsController } from "../controllers/user-skill.controller";

const userSkillRoutes = Router();

userSkillRoutes.post("/create", createUserSkillController);
userSkillRoutes.get("/user/get", getUserSkillsController);

export default userSkillRoutes;
