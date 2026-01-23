import { Router } from "express";
import {
  createAcceptRequestSessionController,
  createSessionController,
  getCurrentUserSessionRequestController,
} from "../controllers/session.controller";

const sessionRoutes = Router();

sessionRoutes.post("/create", createSessionController);
sessionRoutes.get("/get/session-request", getCurrentUserSessionRequestController);
sessionRoutes.post("/accept-request", createAcceptRequestSessionController);

export default sessionRoutes;
