import { join } from "node:path";
import { writeFile } from "node:fs/promises";

export async function writeConfigFiles(
    targetDir: string,
    configs: Array<{ filename: string; content: string }>,
): Promise<void> {
    for (const { filename, content } of configs) {
        const fullPath = join(targetDir, filename);
        await writeFile(fullPath, content);
    }
}
