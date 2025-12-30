import { Router } from "express";

import { getCurrentUserController, updateProfileController } from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/current", getCurrentUserController);
userRoutes.patch("/profile/update", updateProfileController);

export default userRoutes;
