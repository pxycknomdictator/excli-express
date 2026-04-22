import type { Request, Response, NextFunction } from "express";

export const globalErrorWrapper = (
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
) => {
    const message = error.message || "Something went wrong";
    const stack = process.env.NODE_ENV !== "production" ? error.stack : null;
    res.status(500).json({ success: false, message, stack });
};
