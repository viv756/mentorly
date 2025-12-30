import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from "passport-jwt";

import { verifyUserService } from "../services/auth.service";
import { findByIdUserService } from "../services/user.service";

import { Env } from "./env.config";

/* ---------------- LOCAL STRATEGY (LOGIN) ---------------- */
passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await verifyUserService({ email, password });
        return done(null, user);
      } catch (error: any) {
        return done(error, false, { message: error.message });
      }
    }
  )
);

interface JwtPayload {
  userId: string;
}

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: Env.JWT_ACCESS_SECRET,
  audience: ["user"],
  algorithms: ["HS256"],
};

passport.use(
  "jwt",
  new JwtStrategy(options, async (payload: JwtPayload, done) => {
    try {
      if (!payload.userId) {
        return done(null, false, { message: "Invalid token payload" });
      }

      const user = await findByIdUserService(payload.userId);
      if (!user) return done(null, false);
      return done(null, user);
    } catch (err) {
      done(err, false);
    }
  })
);

export const passportAuthenticateJwt = passport.authenticate("jwt", {
  session: false,
});
