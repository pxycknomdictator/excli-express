import { fireShell } from "@/utils/shell";
import { addPackagesToJson, modifyPackageJson } from "@/utils/file";
import { generateScripts } from "@/generators/scripts";
import type { DevTools, Language, PackageManager } from "@/types";
import { installCmdMap } from "@/config/constants";
import { collectPackages } from "@/utils/packages";

export async function installPackages(
    pkgManager: PackageManager,
    targetDir: string,
    language: Language,
    devTools: DevTools[],
    dirName: string,
) {
    const { packages, devPackages } = collectPackages(devTools, language);

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
