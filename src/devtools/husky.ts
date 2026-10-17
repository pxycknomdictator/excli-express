import { join } from "node:path";
import { generateFile, makeDirectory } from "../utils";
import { VITE_PLUS_COMMIT_FILE_NAME } from "../config";

export async function setupHooks(targetDir: string): Promise<void> {
    try {
        const hooksDirectory = join(targetDir, ".vite-hooks");
        await makeDirectory(hooksDirectory);
        const vitePlusFileLocation = join(
            targetDir,
            ".vite-hooks",
            VITE_PLUS_COMMIT_FILE_NAME,
        );
        await generateFile({
            fileLocation: vitePlusFileLocation,
            fileContent: "vp staged",
        });
    } catch (error) {
        throw new Error(`failed to setup husky: ${error}`);
    }
}
