import { join } from "node:path";
import { platform } from "node:process";
import { readFile, writeFile } from "node:fs/promises";
import { spawnSync, spawn } from "node:child_process";
import { jsScripts, tsScripts } from "./options.js";

export function hasPkManager(pkgM: string) {
    const command = platform !== "win32" ? "which" : "where";
    const result = spawnSync(command, [pkgM], { encoding: "utf-8" });

    return result.status === 0;
}

export function fireShell(
    command: string,
    args: string[],
    targetDir: string = process.cwd(),
) {
    return new Promise((resolve, reject) => {
        const child = spawn(command, args, {
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

export async function modifyPackageJson(
    targetDir: string,
    language: string,
    dirName: string,
) {
    const fullPath = join(targetDir, "package.json");
    const pkg = JSON.parse(await readFile(fullPath, { encoding: "utf-8" }));

    pkg.name = dirName;
    pkg.scripts = language === "ts" ? { ...tsScripts } : { ...jsScripts };
    await writeFile(fullPath, JSON.stringify(pkg, null, 2));
}
