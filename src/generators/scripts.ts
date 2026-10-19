import {
    dockerScripts,
    jsScripts,
    tsScripts,
    vitePlusScripts,
} from "../config";
import type { ScriptConfig, Language, DevTools } from "../types";

export function generateScripts(
    language: Language,
    devTools: DevTools[],
): ScriptConfig {
    const baseScripts = language === "ts" ? tsScripts : jsScripts;
    const isDocker = devTools.includes("docker");
    const isVitePlus = devTools.includes("vite_plus");

    return {
        ...baseScripts,
        ...(isVitePlus ? vitePlusScripts : {}),
        ...(isDocker ? dockerScripts : {}),
    };
}
