import { join } from "node:path";
import { writeFile, readFile } from "node:fs/promises";
import type { Language, ScriptConfig } from "@/types/index";

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
