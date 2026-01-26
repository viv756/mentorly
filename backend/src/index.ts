import "dotenv/config";
import "./config/passport.config";

import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import cors from "cors";

import { Env } from "./config/env.config";
import connectDatabase from "./config/database";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import { HTTP_STATUS } from "./config/http.config";

import { passportAuthenticateJwt } from "./config/passport.config";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import userSkillRoutes from "./routes/user-skill.route";
import peopleRoutes from "./routes/people.route";
import sessionRoutes from "./routes/session.route";

const app = express();
const BASE_PATH = Env.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(passport.initialize());

app.use(
  cors({
    origin: Env.FRONTEND_ORIGIN,
    credentials: true,
  }),
);

app.get(
  `/`,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(HTTP_STATUS.OK).json({
      message: "Hello",
    });
  }),
);

app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/user`, passportAuthenticateJwt, userRoutes);
app.use(`${BASE_PATH}/skill`, passportAuthenticateJwt, userSkillRoutes);
app.use(`${BASE_PATH}/people`, passportAuthenticateJwt, peopleRoutes);
app.use(`${BASE_PATH}/session`, passportAuthenticateJwt, sessionRoutes);

app.use(errorHandler);

app.listen(Env.PORT, async () => {
  await connectDatabase();
  console.log(`Server is running on port ${Env.PORT} in ${Env.NODE_ENV} mode`);
});
