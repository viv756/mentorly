import { Router } from "express";

import {
  getCurrentUserController,
  getCurrentUserProfileController,
  updateProfileController,
} from "../controllers/user.controller";
import { upload } from "../config/cloudinary.config";

const userRoutes = Router();

userRoutes.get("/current", getCurrentUserController);
userRoutes.patch("/profile/update", upload.single("avatar"), updateProfileController);
userRoutes.get("/profile", getCurrentUserProfileController);

export default userRoutes;
