import { setupGit } from "./git";
import { setupOrm } from "./orms";
import { hasGit } from "../utils";
import { setupAuth } from "../auth";
import { setupHooks } from "./husky";
import { setupProxy } from "./proxy";
import { setupRedis } from "./redis";
import { setupDocker } from "./docker";
import { setupVitePlus } from "./vite-plus";
import { installPackages } from "../core";
import type { ProjectConfig } from "../types";
import { setupLogger } from "./logger";

export async function setupDevTools(config: ProjectConfig) {
    const { devTools, targetDir, cache, auth } = config;
    try {
        if (devTools.includes("git") && hasGit()) await setupGit(targetDir);
        if (devTools.includes("logger")) await setupLogger(config);
        if (devTools.includes("docker")) {
            await Promise.all([setupDocker(config), setupOrm(config)]);
            if (typeof auth !== "undefined") await setupAuth(config);
            if (cache === "redis") await setupRedis(config);
            await setupProxy(config);
        }

        await installPackages(config);
        if (devTools.includes("vite_plus")) {
            await setupVitePlus(config);
            await setupHooks(targetDir);
        }
    } catch (error) {
        throw new Error(`failed to setup devTools: ${error}`);
    }
}
