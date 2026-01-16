import { BASE_PACKAGES, TS_DEV_PACKAGES } from "src/config";
import type { DevTools, Language } from "src/types";

export function collectPackages(devTools: DevTools[], language: Language) {
    const packages: string[] = [...BASE_PACKAGES];
    const devPackages: string[] = [];

    if (devTools.includes("prettier")) devPackages.push("prettier");
    if (devTools.includes("husky")) devPackages.push("husky");
    if (language === "ts") devPackages.push(...TS_DEV_PACKAGES);

    return { packages, devPackages };
}
