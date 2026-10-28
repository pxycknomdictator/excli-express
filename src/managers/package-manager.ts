import { promisify } from "node:util";
import { execFile } from "node:child_process";
import type { Language, ScriptConfig } from "../types";

export async function modifyPackageJson(
    targetDir: string,
    language: Language,
    dirName: string,
    scripts: ScriptConfig,
) {
    const execFileAsync = promisify(execFile);

    const args = [
        "pkg",
        "set",
        `name=${dirName}`,
        `main=src/main.${language}`,
        `type=module`,
        `--prefix=${targetDir}`,
    ];

    for (const [key, value] of Object.entries(scripts)) {
        args.push(`scripts.${key}=${value}`);
    }

    await execFileAsync("npm", args);
}
