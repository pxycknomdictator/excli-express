import type { Request, Response } from "express";
import { asyncWrapper } from "../utils/wrapper.js";

export const healthcheck = asyncWrapper((_: Request, res: Response) => {
    return res
        .status(200)
        .json({ success: true, message: "Thanks for using @excli/express" });
});
