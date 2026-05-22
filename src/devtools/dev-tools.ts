import { setupGit } from "./git";
import { setupOrm } from "./orms";
import { hasGit } from "../utils";
import { setupAuth } from "../auth";
import { setupHusky } from "./husky";
import { setupProxy } from "./proxy";
import { setupRedis } from "./redis";
import { setupDocker } from "./docker";
import { setupVitest } from "./vitest";
import { setupPrettier } from "./prettier";
import { installPackages } from "../core";
import type { ProjectConfig } from "../types";

export async function setupDevTools(config: ProjectConfig) {
    const { devTools, targetDir, cache, auth } = config;
    try {
        if (devTools.includes("prettier")) await setupPrettier(targetDir);
        if (devTools.includes("vitest")) await setupVitest(config);
        if (devTools.includes("git") && hasGit()) await setupGit(targetDir);
        if (devTools.includes("docker")) {
            await Promise.all([setupDocker(config), setupOrm(config)]);
            if (typeof auth !== "undefined") await setupAuth(config);
            if (cache === "redis") await setupRedis(config);
            await setupProxy(config);
        }

        await installPackages(config);
        if (devTools.includes("husky")) await setupHusky(targetDir);
    } catch (error) {
        throw new Error(`failed to setup devTools: ${error}`);
    }
}
