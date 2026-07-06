import {
    BASE_PACKAGES,
    TS_DEV_PACKAGES,
    ADDITION_PACKAGES,
    TS_ADDITIONAL_PACKAGES,
    DEV_DEPENDENCIES,
    TS_DEV_DEPENDENCIES,
} from "../config";
import type { CollectPackagesParams } from "../types";

export function collectPackages(config: CollectPackagesParams) {
    const { devTools, language, mode, cache, auth, logger } = config;

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
    if (auth === "better-auth") packages.push("better-auth");
    if (auth === "clerk") packages.push("@clerk/express");
    if (devTools.includes("prettier")) devPackages.push("prettier");
    if (devTools.includes("husky")) devPackages.push("husky");
    if (devTools.includes("logger")) {
        if (logger === "winston") packages.push("winston");
        if (logger === "pino") packages.push("pino", "pino-pretty");
    }

    return { packages, devPackages };
}
