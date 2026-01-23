import { Router } from "express";
import {
  createSessionController,
  getCurrentUserSessionRequestController,
} from "../controllers/session.controller";

const sessionRoutes = Router();

sessionRoutes.post("/create", createSessionController);
sessionRoutes.get("/get/session-request", getCurrentUserSessionRequestController);

export default sessionRoutes;
