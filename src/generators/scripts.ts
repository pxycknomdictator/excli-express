import type { ScriptConfig, Language, DevTools } from "@/types";

const tsScripts: ScriptConfig = {
    build: "tsc",
    dev: "tsx watch --env-file=.env src/main.ts",
    start: "node --env-file=.env dist/main.js",
};

const jsScripts: ScriptConfig = {
    dev: "node --watch --env-file=.env src/main.js",
    start: "node --env-file=.env src/main.js",
};

const prettierScripts: ScriptConfig = {
    format: "prettier --write .",
};

const dockerScripts: ScriptConfig = {
    "docker:up": "docker compose up -d",
    "docker:down": "docker compose down",
};

export function generateScripts(
    language: Language,
    devTools: DevTools[],
): ScriptConfig {
    const baseScripts = language === "ts" ? tsScripts : jsScripts;
    const isPrettier = devTools.includes("prettier");
    const isDocker = devTools.includes("docker");

    return {
        ...baseScripts,
        ...(isPrettier ? prettierScripts : {}),
        ...(isDocker ? dockerScripts : {}),
    };
}
