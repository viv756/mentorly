import { Router } from "express";
import {
  loginController,
  logoutController,
  refreshTokenController,
  registerUserController,
} from "../controllers/auth.controller";
import { passportAuthenticateJwt } from "../config/passport.config";

const authRoutes = Router();

authRoutes.post("/register", registerUserController);
authRoutes.post("/login", loginController);
authRoutes.post("/refresh", refreshTokenController);

// add middleware here to get userId
authRoutes.post("/logout", passportAuthenticateJwt, logoutController);

export default authRoutes;
