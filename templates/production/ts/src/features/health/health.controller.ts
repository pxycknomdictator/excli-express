import type { Request, Response } from "express";

export function healthStatus(_: Request, res: Response) {
    return res.status(200).json({ status: "OK" });
}
