import { cp, mkdir } from "node:fs/promises";
import type { ProjectConfig } from "src/types";

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
