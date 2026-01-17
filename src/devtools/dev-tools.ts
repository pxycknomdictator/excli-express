import { setupGit } from "./git";
import { setupHusky } from "./husky";
import { setupDocker } from "./docker";
import { setupPrettier } from "./prettier";
import { installPackages } from "src/core";
import { fireShell, hasGit } from "src/utils";
import type { ProjectConfig } from "src/types";

export async function setupDevTools(config: ProjectConfig) {
    const { devTools, targetDir, pkgManager, language, dirName } = config;

    if (devTools.includes("git") && hasGit()) {
        await Promise.all([
            fireShell("git init", targetDir),
            setupGit(targetDir),
        ]);
    }
    await installPackages(pkgManager, targetDir, language, devTools, dirName);

    if (devTools.includes("prettier")) await setupPrettier(targetDir);
    if (devTools.includes("docker")) await setupDocker(config);
    if (devTools.includes("husky")) await setupHusky(targetDir);
}
