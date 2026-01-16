import { platform } from "node:process";
import { spawnSync, spawn } from "node:child_process";
import type { PackageManager } from "src/types";

export function hasPkManager(pkgM: PackageManager): boolean {
    if (pkgM === "none") return true;
    const command = platform !== "win32" ? "which" : "where";
    const result = spawnSync(command, [pkgM], { encoding: "utf-8" });
    return result.status === 0;
}

export function hasGit() {
    const command = platform !== "win32" ? "which" : "where";
    const result = spawnSync(command, ["git"], { encoding: "utf-8" });
    return result.status === 0;
}

export function fireShell(command: string, targetDir: string = process.cwd()) {
    return new Promise((resolve, reject) => {
        const child = spawn(command, {
            cwd: targetDir,
            stdio: "ignore",
            shell: true,
        });

        child.on("close", (code) => {
            if (code !== 0)
                reject(new Error(`Command failed with code ${code}`));
            else resolve("");
        });

        child.on("error", (err) => reject(err));
    });
}

export async function getPackageLatestVersion(
    packageName: string,
    targetDir: string,
): Promise<string> {
    const { exec } = await import("child_process");
    const { promisify } = await import("util");

    const execAsync = promisify(exec);

    try {
        const { stdout } = await execAsync(`npm view ${packageName} version`, {
            cwd: targetDir,
        });
        return stdout.trim();
    } catch (error) {
        throw new Error(
            `Failed to fetch version for ${packageName}: Error: ${error}`,
        );
    }
}

export async function formatPackageVersions(
    packages: string[] = [],
    targetDir: string,
) {
    return Object.fromEntries(
        await Promise.all(
            packages.map(async (pkg) => [
                pkg,
                `^${await getPackageLatestVersion(pkg, targetDir)}`,
            ]),
        ),
    );
}
