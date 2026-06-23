export const corsOptions = Object.freeze({
    origin: process.env.CLIENT_ORIGIN ?? "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
});

export const globalLimiter = Object.freeze({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "⚠️ Too many requests from this IP, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
});
