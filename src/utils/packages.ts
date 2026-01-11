import type { DevTools, Language } from "@/types";
import { BASE_PACKAGES, TS_DEV_PACKAGES } from "@/config/constants";

export function getSelectedPackages(devTools: DevTools[], language: Language) {
    const packages: string[] = [...BASE_PACKAGES];
    const devPackages: string[] = [];

    const isPrettier = devTools.includes("prettier");
    if (isPrettier) devPackages.push("prettier");

    const isHusky = devTools.includes("husky");
    if (isHusky) devPackages.push("husky");

    if (language === "ts") devPackages.push(...TS_DEV_PACKAGES);

    return { packages, devPackages };
}
