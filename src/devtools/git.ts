import { join } from "node:path";
import { copy, fireShell } from "../utils";

export async function setupGit(
    targetDir: string,
    templatePath: string,
): Promise<void> {
    const gitIgnorePath = join(templatePath, ".gitignore");
    const destinationPath = join(targetDir, ".gitignore");
    try {
        await fireShell("git init", targetDir);
        await copy({ templatePath: gitIgnorePath, targetDir: destinationPath });
    } catch (error) {
        throw new Error(`failed to setup git: ${error}`);
    }
}
