import { fireShell } from "../utils";
import { installCmdMap } from "../config";
import { collectPackages, generateScripts } from "../generators";
import { addPackagesToJson, modifyPackageJson } from "../managers";
import type { PackageManager, ProjectConfig } from "../types";

export async function installPackages(config: ProjectConfig) {
    const { targetDir, language, devTools, dirName, pkgManager } = config;

    const { packages, devPackages } = collectPackages(config);

    await initializeNodeProject(targetDir);
    const scripts = generateScripts(language, devTools);
    await modifyPackageJson(targetDir, language, dirName, scripts);

    if (pkgManager === "none") {
        await addPackagesToJson(targetDir, packages, devPackages);
        return;
    }

    await installPackagesWithManager(
        pkgManager,
        targetDir,
        packages,
        devPackages,
    );
}

async function installPackagesWithManager(
    pkgManager: PackageManager,
    targetDir: string,
    packages: string[],
    devPackages: string[],
) {
    const installCmd = installCmdMap[pkgManager] ?? null;

    await fireShell(
        `${pkgManager} ${installCmd} ${packages.join(" ")}`,
        targetDir,
    );

    if (devPackages.length > 0) {
        await fireShell(
            `${pkgManager} ${installCmd} ${devPackages.join(" ")} -D`,
            targetDir,
        );
    }
}

export async function initializeNodeProject(targetDir: string) {
    await fireShell("npm init -y", targetDir);
}
