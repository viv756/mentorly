import { Router } from "express";
import { aiAssistantController } from "../controllers/ai.controller";

const aiRoutes = Router();

aiRoutes.post("/search-mentor", aiAssistantController);

export default aiRoutes;
