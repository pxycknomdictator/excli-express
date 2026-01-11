import type { DevTools, Language } from "@/types";
import { BASE_PACKAGES, TS_DEV_PACKAGES } from "@/config/constants";

export function collectPackages(devTools: DevTools[], language: Language) {
    const packages: string[] = [...BASE_PACKAGES];
    const devPackages: string[] = [];

    if (devTools.includes("prettier")) devPackages.push("prettier");
    if (devTools.includes("husky")) devPackages.push("husky");
    if (language === "ts") devPackages.push(...TS_DEV_PACKAGES);

    return { packages, devPackages };
}
