import { platform } from "node:process";
import { spawnSync, spawn } from "node:child_process";

export function hasPkManager(pkgM: string) {
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
