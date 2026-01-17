import { join } from "node:path";
import { writeFile } from "node:fs/promises";

export async function writeEnvFiles(
    targetDir: string,
    files: Array<{ file: string; variables: string }>,
): Promise<void> {
    for (const { file, variables } of files) {
        const fullPath = join(targetDir, file);
        await writeFile(fullPath, variables);
    }
}
