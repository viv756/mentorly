import { Router } from "express";
import { createFeedbackController } from "../controllers/rating.controller";

const ratingRoutes = Router();

ratingRoutes.post("/create/:sessionId/:fromUserId", createFeedbackController);

export default ratingRoutes;
