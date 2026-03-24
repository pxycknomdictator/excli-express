import { join } from "node:path";
import { DIRECTORIES } from "src/config";
import type { ProjectConfig } from "src/types";
import { copy, makeDirectory } from "src/utils";

export async function setupProjectDirectories(
    config: Pick<ProjectConfig, "language" | "sourceDir">,
): Promise<void> {
    const { language, sourceDir } = config;
    for (const dir of DIRECTORIES) {
        if (language !== "ts" && dir === "types") continue;
        const directoryPath = join(sourceDir, dir);
        await makeDirectory(directoryPath);
    }
}

export async function createDirectoryStructure(
    config: Pick<ProjectConfig, "publicDir" | "templatePath" | "targetDir">,
): Promise<void> {
    const { publicDir } = config;
    await Promise.all([makeDirectory(publicDir), copy(config)]);
}
