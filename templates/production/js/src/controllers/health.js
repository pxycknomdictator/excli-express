import { asyncWrapper } from "../utils/wrapper.js";

export const healthcheck = asyncWrapper((_, res) => {
    return res
        .status(200)
        .json({ success: true, message: "Thanks for using @excli/express" });
});
