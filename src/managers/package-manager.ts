import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { formatPackageVersions, generateFile } from "../utils";
import type { Language, ScriptConfig } from "../types";

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

    await generateFile({
        fileLocation: fullPath,
        fileContent: JSON.stringify(pkg, null, 2),
    });
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
