const configs = Object.freeze({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  ARGON2_ROUND: process.env.ARGON2_ROUND || 20,
  JWT_ACCESS_TOKEN_SECRET_KEY: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
  JWT_REFRESH_TOKEN_SECRET_KEY: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
  JWT_ACCESS_TOKEN_EXPIRY_TIME: process.env.JWT_ACCESS_TOKEN_EXPIRY_TIME,
  JWT_REFRESH_TOKEN_EXPIRY_TIME: process.env.JWT_REFRESH_TOKEN_EXPIRY_TIME,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
});

const cookiesOptions = {
  httpOnly: true,
  secure: true,
};

const corsOptions = {
  origin: configs.CLIENT_ORIGIN,
  credentials: true,
};

const jsonLimit = "20mb";
const accessToken = "accessToken";
const refreshToken = "refreshToken";
const accessTokenMaxAge = 1000 * 60 * 60 * 24;
const refreshTokenMaxAge = 1000 * 60 * 60 * 24 * 7;

export default {
  configs,
  jsonLimit,
  accessToken,
  refreshToken,
  accessTokenMaxAge,
  refreshTokenMaxAge,
  cookiesOptions,
  corsOptions,
};
