import {
    getBetterAuthScripts,
    getDockerScripts,
    getKyselyScripts,
    jsScripts,
    tsScripts,
    vitePlusScripts,
} from "../config";
import type { ScriptConfig, ProjectConfig } from "../types";

export function generateScripts(
    config: Pick<
        ProjectConfig,
        | "language"
        | "devTools"
        | "cache"
        | "mode"
        | "webServer"
        | "auth"
        | "databaseOrm"
    >,
): ScriptConfig {
    const baseScripts = config.language === "ts" ? tsScripts : jsScripts;
    const hasDocker = config.devTools.includes("docker");
    const hasVitePlus = config.devTools.includes("vite_plus");
    const hasBetterAuth =
        config.auth === "better-auth" && config.databaseOrm === "drizzle";
    const hasKysely = config.databaseOrm === "kysely";

    return {
        ...baseScripts,
        ...(hasVitePlus ? vitePlusScripts : {}),
        ...(hasDocker ? getDockerScripts(config) : {}),
        ...(hasKysely ? getKyselyScripts(config.language) : {}),
        ...(hasBetterAuth ? getBetterAuthScripts(config) : {}),
    };
}
