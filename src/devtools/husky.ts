import { join } from "node:path";
import { fireShell, generateFile } from "../utils";
import { HUSKY_COMMIT_FILE_NAME } from "../config";

export async function setupHusky(targetDir: string): Promise<void> {
    try {
        await fireShell("npx husky init", targetDir);
        const huskyFileLocation = join(
            targetDir,
            ".husky",
            HUSKY_COMMIT_FILE_NAME,
        );
        await generateFile({
            fileLocation: huskyFileLocation,
            fileContent: "",
        });
    } catch (error) {
        throw new Error(`failed to setup husky: ${error}`);
    }
}
