import { Router } from "express";
import {
  createAcceptRequestSessionController,
  createSessionController,
  getCurrentUserRequestedAndUpcomingSessionsController,
  getCurrentUserSessionRequestController,
  joinSessionController,
} from "../controllers/session.controller";

const sessionRoutes = Router();

sessionRoutes.post("/create", createSessionController);
sessionRoutes.get("/get/session-request", getCurrentUserSessionRequestController);
sessionRoutes.get(
  "/get-sessions-upcoming-and-requested",
  getCurrentUserRequestedAndUpcomingSessionsController,
);
sessionRoutes.post("/join/:sessionId", joinSessionController);
sessionRoutes.post("/accept-request", createAcceptRequestSessionController);

export default sessionRoutes;
