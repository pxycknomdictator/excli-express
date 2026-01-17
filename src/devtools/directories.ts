import { join } from "node:path";
import { mkdir, cp } from "node:fs/promises";
import { DIRECTORIES } from "src/config";
import type { Language } from "src/types";

export async function setupProjectDirectories(
    language: Language,
    sourceDir: string,
): Promise<void> {
    for (const dir of DIRECTORIES) {
        if (language !== "ts" && dir === "types") continue;
        const directoryPath = join(sourceDir, dir);
        await mkdir(directoryPath, { recursive: true });
    }
}

export async function createDirectoryStructure(
    targetDir: string,
    publicDir: string,
    templatePath: string,
): Promise<void> {
    await Promise.all([
        mkdir(publicDir, { recursive: true }),
        cp(templatePath, targetDir, { recursive: true }),
    ]);
}
