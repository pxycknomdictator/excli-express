import { join } from "node:path";
import type { ProjectConfig } from "../types";
import { appendLanguageExtension, generateFile } from "../utils";

function clerkMiddleware(lang: ProjectConfig["language"]) {
    const isTypeScript = lang === "ts";

    return `import { getAuth } from "@clerk/express";
${isTypeScript ? 'import type { Request, Response, NextFunction } from "express";' : ""}

export function authMiddleware(
    req${isTypeScript ? ": Request" : ""},
    res${isTypeScript ? ": Response" : ""},
    next${isTypeScript ? ": NextFunction" : ""},
) {
    const { userId } = getAuth(req);

    if (!userId) {
        return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    next();
}
`;
}

export async function setupClerk(config: ProjectConfig) {
    const middlewareName = join(
        config.targetDir,
        "src",
        "middlewares",
        "auth.middleware",
    );
    const [middlewareFile] = appendLanguageExtension(
        config.language,
        middlewareName,
    );

    const middleware = clerkMiddleware(config.language);
    await generateFile({
        fileLocation: middlewareFile!,
        fileContent: middleware,
    });
}
