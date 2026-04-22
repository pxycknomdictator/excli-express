export const globalErrorWrapper = (error, _req, res, _next) => {
    const message = error.message || "Something went wrong";
    const stack = process.env.NODE_ENV !== "production" ? error.stack : null;
    res.status(500).json({ success: false, message, stack });
};
