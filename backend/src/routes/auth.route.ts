import { Router } from "express";
import { loginController, refreshTokenController, registerUserController } from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/register", registerUserController);
authRoutes.post("/login", loginController);
authRoutes.get("/refresh",refreshTokenController)

export default authRoutes;
