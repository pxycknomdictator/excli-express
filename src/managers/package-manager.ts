import { join } from "node:path";
import { promisify } from "node:util";
import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import { formatPackageVersions, generateFile } from "../utils";
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

export async function addPackagesToJson(
    targetDir: string,
    packages: string[],
    devPackages: string[] = [],
) {
    const packageJsonPath = join(targetDir, "package.json");
    const content = await readFile(packageJsonPath, "utf-8");
    const packageData = JSON.parse(content);

    const depVersions = await formatPackageVersions(packages);

    let devDepVersions = {};
    if (devPackages.length > 0) {
        devDepVersions = await formatPackageVersions(devPackages);
    }

    packageData.dependencies = {
        ...packageData.dependencies,
        ...depVersions,
    };

    if (Object.keys(devDepVersions).length > 0) {
        packageData.devDependencies = {
            ...packageData.devDependencies,
            ...devDepVersions,
        };
    }

    await generateFile({
        fileLocation: packageJsonPath,
        fileContent: JSON.stringify(packageData, null, 2) + "\n",
    });
}
