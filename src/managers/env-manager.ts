import { join } from "node:path";
import { generateFile } from "../utils";

export async function writeEnvFiles(
    targetDir: string,
    files: Array<{ file: string; variables: string }>,
): Promise<void> {
    for (const { file, variables } of files) {
        const fullPath = join(targetDir, file);
        await generateFile({ fileLocation: fullPath, fileContent: variables });
    }
}
