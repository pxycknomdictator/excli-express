import { fireShell } from "@/utils/shell";
import { addPackagesToJson, modifyPackageJson } from "@/utils/file";
import { generateScripts } from "@/generators/scripts";
import type { DevTools, Language, PackageManager } from "@/types";
import { BASE_PACKAGES, TS_DEV_PACKAGES } from "@/config/constants";

export async function installPackages(
    pkgManager: PackageManager,
    targetDir: string,
    language: Language,
    devTools: DevTools[],
    dirName: string,
) {
    const packages: string[] = [...BASE_PACKAGES];
    const devPackages: string[] = [];

    const isPrettier = devTools.includes("prettier");
    if (isPrettier) devPackages.push("prettier");

    const isHusky = devTools.includes("husky");
    if (isHusky) devPackages.push("husky");

    if (language === "ts") devPackages.push(...TS_DEV_PACKAGES);

    await initializeNodeProject(targetDir);
    const scripts = generateScripts(language, devTools);
    await modifyPackageJson(targetDir, language, dirName, scripts);

    if (pkgManager === "none") {
        await addPackagesToJson(targetDir, packages, devPackages);
        return;
    }

    const installCmdMap: Record<string, string> = {
        npm: "install",
        pnpm: "add",
        yarn: "add",
        bun: "add",
    };

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
