import { Router } from "express";
import { createUserSkillController } from "../controllers/user-skill.controller";

const userSkillRoutes = Router();

userSkillRoutes.post("/create", createUserSkillController);

export default userSkillRoutes;
