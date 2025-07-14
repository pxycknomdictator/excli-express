export const configs = Object.freeze({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
});

export const cookiesOptions = {
  httpOnly: true,
  secure: true,
};

export const corsOptions = {
  origin: configs.CLIENT_ORIGIN,
  credentials: true,
};
