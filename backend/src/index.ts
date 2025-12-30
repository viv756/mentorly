import "dotenv/config";
import "./config/passport.config";

import passport from "passport";
import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { Env } from "./config/env.config";
import connectDatabase from "./config/database";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { asyncHandler } from "./asyncHandler.middleware";
import { HTTPSTATUS } from "./config/http.config";

import authRoutes from "./routes/auth.route";
import { passportAuthenticateJwt } from "./config/passport.config";
import userRoutes from "./routes/user.route";

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
  })
);

app.get(
  `/`,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(HTTPSTATUS.OK).json({
      message: "Hello",
    });
  })
);

// app.get(`${BASE_PATH}/auth/testAuth`, passportAuthenticateJwt, (req, res, next) => {
//   console.log(req.user);
//   return res.json({
//     user: req.user,
//   });
// });
// app.get(`${BASE_PATH}/auth/refresh`, refreshTokenController)

app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/user`, passportAuthenticateJwt,userRoutes);

app.use(errorHandler);

app.listen(Env.PORT, async () => {
  await connectDatabase();
  console.log(`Server is running on port ${Env.PORT} in ${Env.NODE_ENV} mode`);
});
