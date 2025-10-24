import { join } from "node:path";
import { __dirname } from "@/index";
import { cp } from "node:fs/promises";
import { fireShell } from "@/utils/shell";
import { modifyPackageJson } from "@/utils/file";
import { generateScripts } from "@/generators/scripts";
import { DevTools, Language, PackageManager } from "@/types";
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

    if (language === "ts") devPackages.push(...TS_DEV_PACKAGES);

    const packageJson = join(__dirname, "..", "templates", "package.json");
    await cp(packageJson, join(targetDir, "package.json"));

    const scripts = generateScripts(language, devTools);
    await modifyPackageJson(targetDir, language, dirName, scripts);

    const installCmdMap: Record<string, string> = {
        npm: "install",
        pnpm: "add",
        yarn: "add",
    };

    const installCmd = installCmdMap[pkgManager] ?? null;
    await fireShell(pkgManager, [installCmd, ...packages], targetDir);

    if (devPackages.length > 0) {
        await fireShell(
            pkgManager,
            [installCmd, ...devPackages, "-D"],
            targetDir,
        );
    }
}
