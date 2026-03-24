import { join } from "node:path";
import { mkdir, cp } from "node:fs/promises";
import { DIRECTORIES } from "src/config";
import type { ProjectConfig } from "src/types";

export async function setupProjectDirectories(
    config: Pick<ProjectConfig, "language" | "sourceDir">,
): Promise<void> {
    const { language, sourceDir } = config;
    for (const dir of DIRECTORIES) {
        if (language !== "ts" && dir === "types") continue;
        const directoryPath = join(sourceDir, dir);
        await mkdir(directoryPath, { recursive: true });
    }
}

export async function createDirectoryStructure(
    config: Pick<ProjectConfig, "publicDir" | "templatePath" | "targetDir">,
): Promise<void> {
    const { publicDir, templatePath, targetDir } = config;
    await Promise.all([
        mkdir(publicDir, { recursive: true }),
        cp(templatePath, targetDir, { recursive: true }),
    ]);
}
