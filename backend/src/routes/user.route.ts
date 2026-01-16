import { Router } from "express";

import {
  getCurrentUserDataController,
  getCurrentUserProfileController,
  updateProfileController,
  updateWeeklyAvailabilityController,
} from "../controllers/user.controller";
import { upload } from "../config/cloudinary.config";

const userRoutes = Router();

userRoutes.get("/current", getCurrentUserDataController);
userRoutes.patch("/availability", updateWeeklyAvailabilityController);
userRoutes.patch("/profile/update", upload.single("avatar"), updateProfileController);
userRoutes.get("/profile", getCurrentUserProfileController);

export default userRoutes;
