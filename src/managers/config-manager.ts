import { join } from "node:path";
import { generateFile } from "src/utils";

export async function writeConfigFiles(
    targetDir: string,
    configs: Array<{ filename: string; content: string }>,
): Promise<void> {
    for (const { filename, content } of configs) {
        const fullPath = join(targetDir, filename);
        await generateFile({ fileLocation: fullPath, fileContent: content });
    }
}
