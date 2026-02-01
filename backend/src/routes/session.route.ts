import { Router } from "express";
import {
  cancelSessionController,
  createAcceptRequestSessionController,
  createSessionController,
  getCurrentUserRequestedAndUpcomingSessionsController,
  getCurrentUserSessionRequestController,
  joinSessionController,
  rejectSessionController,
} from "../controllers/session.controller";

const sessionRoutes = Router();

sessionRoutes.post("/create", createSessionController);
sessionRoutes.delete("/cancel/:sessionId", cancelSessionController);
sessionRoutes.patch("/reject-session/:sessionId", rejectSessionController);
sessionRoutes.get("/get/session-request", getCurrentUserSessionRequestController);
sessionRoutes.get(
  "/get-sessions-upcoming-and-requested",
  getCurrentUserRequestedAndUpcomingSessionsController,
);
sessionRoutes.post("/join/:sessionId", joinSessionController);
sessionRoutes.post("/accept-request", createAcceptRequestSessionController);

export default sessionRoutes;
