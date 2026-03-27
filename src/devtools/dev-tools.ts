import { setupGit } from "./git";
import { setupOrm } from "./orms";
import { setupHusky } from "./husky";
import { setupDocker } from "./docker";
import { setupPrettier } from "./prettier";
import { installPackages } from "src/core";
import { fireShell, hasGit } from "src/utils";
import type { ProjectConfig } from "src/types";

export async function setupDevTools(config: ProjectConfig) {
    const { devTools, targetDir } = config;

    if (devTools.includes("prettier")) await setupPrettier(targetDir);
    if (devTools.includes("git") && hasGit()) {
        await Promise.all([
            fireShell("git init", targetDir),
            setupGit(targetDir),
        ]);
    }
    if (devTools.includes("docker")) {
        await Promise.all([setupDocker(config), setupOrm(config)]);
    }

    await installPackages(config);
    if (devTools.includes("husky")) await setupHusky(targetDir);
}
