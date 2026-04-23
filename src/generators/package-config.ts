import {
    BASE_PACKAGES,
    TS_DEV_PACKAGES,
    ADDITION_PACKAGES,
    TS_ADDITIONAL_PACKAGES,
    DEV_DEPENDENCIES,
    TS_DEV_DEPENDENCIES,
} from "../config";
import type { ProjectConfig } from "../types";

export function collectPackages(
    config: Pick<ProjectConfig, "devTools" | "language" | "mode" | "cache">,
) {
    const { devTools, language, mode, cache } = config;

    const packages: string[] = [...BASE_PACKAGES];
    const devPackages: string[] = [];

    if (mode === "production") {
        packages.push(...ADDITION_PACKAGES);
        if (devTools.includes("vitest")) devPackages.push(...DEV_DEPENDENCIES);
    }

    if (language === "ts") {
        devPackages.push(...TS_DEV_PACKAGES);
    }

    if (language === "ts" && mode === "production") {
        devPackages.push(...TS_ADDITIONAL_PACKAGES);
        if (devTools.includes("vitest")) {
            devPackages.push(...TS_DEV_DEPENDENCIES);
        }
    }

    if (cache === "redis") packages.push("ioredis");
    if (devTools.includes("prettier")) devPackages.push("prettier");
    if (devTools.includes("husky")) devPackages.push("husky");

    return { packages, devPackages };
}
