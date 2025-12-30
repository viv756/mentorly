import { getEnv } from "../utils/getEnv";

const envConfig = () => ({
  PORT: getEnv("PORT", "8000"),
  NODE_ENV: getEnv("NODE_ENV", "development"),
  MONGO_URI: getEnv("MONGO_URI", ""),
  BASE_PATH: getEnv("BASE_PATH", "/api"),
  FRONTEND_ORIGIN: getEnv("FRONTEND_ORIGIN", ""),

  JWT_ACCESS_SECRET: getEnv("JWT_SECRET", "secert_jwt"),
  JWT_ACCESS_EXPIRES_IN: getEnv("JWT_EXPIRES_IN", "15m") as string,

  JWT_REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET", "secert_jwt_refresh"),
  JWT_REFRESH_EXPIRES_IN: getEnv("JWT_REFRESH_EXPIRES_IN", "7d") as string,

  CLOUDINARY_CLOUD_NAME: getEnv("CLOUDINARY_CLOUD_NAME", ""),
  CLOUDINARY_API_KEY: getEnv("CLOUDINARY_API_KEY", ""),
  CLOUDINARY_API_SECRET: getEnv("CLOUDINARY_API_SECRET", ""),
});

export const Env = envConfig();
