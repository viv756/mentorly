import { getEnv } from "../utils/getEnv";

const envConfig = () => ({
  JWT_ACCESS_SECRET: getEnv("JWT_SECRET", "secert_jwt"),
  JWT_ACCESS_EXPIRES_IN: getEnv("JWT_EXPIRES_IN", "15m") as string,

  JWT_REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET", "secert_jwt_refresh"),
  JWT_REFRESH_EXPIRES_IN: getEnv("JWT_REFRESH_EXPIRES_IN", "7d") as string,
});

export const Env = envConfig();
