import { join } from "node:path";
import { writeFile, readFile } from "node:fs/promises";
import type { Language, ProjectConfig, ScriptConfig } from "@/types/index";
import { fireShell, formatPackageVersions, hasGit } from "./shell";
import {
    setupDocker,
    setupGit,
    setupHusky,
    setupPrettier,
} from "@/core/scaffolder";
import { installPackages } from "@/core/installer";

export async function writeConfigFiles(
    targetDir: string,
    configs: Array<{ filename: string; content: string }>,
): Promise<void> {
    for (const { filename, content } of configs) {
        const fullPath = join(targetDir, filename);
        await writeFile(fullPath, content);
    }
}

export async function writeEnvFiles(
    targetDir: string,
    files: Array<{ file: string; variables: string }>,
): Promise<void> {
    for (const { file, variables } of files) {
        const fullPath = join(targetDir, file);
        await writeFile(fullPath, variables);
    }
}

export async function modifyPackageJson(
    targetDir: string,
    language: Language,
    dirName: string,
    scripts: ScriptConfig,
) {
    const fullPath = join(targetDir, "package.json");
    const pkg = JSON.parse(await readFile(fullPath, { encoding: "utf-8" }));

    pkg.name = dirName;
    pkg.main = `src/main.${language}`;
    pkg.type = "module";
    pkg.scripts = scripts;

    await writeFile(fullPath, JSON.stringify(pkg, null, 2));
}

export async function addPackagesToJson(
    targetDir: string,
    packages: string[],
    devPackages: string[] = [],
) {
    const packageJsonPath = join(targetDir, "package.json");
    const content = await readFile(packageJsonPath, "utf-8");
    const packageData = JSON.parse(content);

    const depVersions = await formatPackageVersions(packages, targetDir);

    let devDepVersions = {};
    if (devPackages.length > 0) {
        devDepVersions = await formatPackageVersions(devPackages, targetDir);
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

    await writeFile(
        packageJsonPath,
        JSON.stringify(packageData, null, 2) + "\n",
    );
}

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
    if (devTools.includes("docker")) await setupDocker(targetDir, config);
    if (devTools.includes("husky")) await setupHusky(targetDir);
}
