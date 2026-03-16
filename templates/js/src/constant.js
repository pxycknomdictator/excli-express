export const globalLimiter = Object.freeze({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "⚠️ Too many requests from this IP, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
});
