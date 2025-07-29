export const configs = Object.freeze({
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL || "",
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
});
