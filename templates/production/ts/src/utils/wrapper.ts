import type { Request, Response, NextFunction } from "express";

type Fn = (
    req: Request,
    res: Response,
    next: NextFunction,
) => Promise<Response | void> | Response | void;

export const asyncWrapper =
    (fn: Fn) => async (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((error) => next(error));
    };
