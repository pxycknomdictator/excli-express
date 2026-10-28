import {
    getDockerScripts,
    jsScripts,
    tsScripts,
    vitePlusScripts,
} from "../config";
import type { ScriptConfig, ProjectConfig } from "../types";

export function generateScripts(
    config: Pick<
        ProjectConfig,
        "language" | "devTools" | "cache" | "mode" | "webServer"
    >,
): ScriptConfig {
    const baseScripts = config.language === "ts" ? tsScripts : jsScripts;
    const isDocker = config.devTools.includes("docker");
    const isVitePlus = config.devTools.includes("vite_plus");

    return {
        ...baseScripts,
        ...(isVitePlus ? vitePlusScripts : {}),
        ...(isDocker ? getDockerScripts(config) : {}),
    };
}
