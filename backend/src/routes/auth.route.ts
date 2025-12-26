import { Router } from "express";
import { loginController, registerUserController } from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/register", registerUserController);
authRoutes.post("/login", loginController);

export default authRoutes;
