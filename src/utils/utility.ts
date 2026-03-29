import { cp, mkdir } from "node:fs/promises";
import type { Language, ProjectConfig } from "src/types";

export async function makeDirectory(directoryPath: string) {
    try {
        await mkdir(directoryPath, { recursive: true });
    } catch (error) {
        throw new Error(`Failed to create directory: ${error}`);
    }
}

export async function copy(
    config: Pick<ProjectConfig, "templatePath" | "targetDir">,
) {
    const { templatePath: copyPath, targetDir } = config;
    try {
        await cp(copyPath, targetDir, { recursive: true });
    } catch (error) {
        throw new Error(`Failed to copy: ${error}`);
    }
}

export function appendLanguageExtension(lang: Language, ...paths: string[]) {
    const extension = lang === "ts" ? ".ts" : ".js";
    const files = paths.map((file) => file.concat(extension));
    return files;
}
