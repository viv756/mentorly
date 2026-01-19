import { Router } from "express";
import { findPeopleController } from "../controllers/people.controller";

const peopleRoutes = Router();

peopleRoutes.get("/find", findPeopleController);

export default peopleRoutes;
