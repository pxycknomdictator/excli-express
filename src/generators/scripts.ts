import {
    dockerScripts,
    jsScripts,
    prettierScripts,
    tsScripts,
    vitestScripts,
} from "src/config";
import type { ScriptConfig, Language, DevTools } from "src/types";

export function generateScripts(
    language: Language,
    devTools: DevTools[],
): ScriptConfig {
    const baseScripts = language === "ts" ? tsScripts : jsScripts;
    const isPrettier = devTools.includes("prettier");
    const isDocker = devTools.includes("docker");
    const isVitest = devTools.includes("vitest");

    return {
        ...(isVitest ? vitestScripts : {}),
        ...baseScripts,
        ...(isPrettier ? prettierScripts : {}),
        ...(isDocker ? dockerScripts : {}),
    };
}
