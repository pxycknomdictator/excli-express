import { fireShell } from "src/utils";

export async function setupGit(targetDir: string): Promise<void> {
    try {
        await fireShell(`npx gitignore node`, targetDir);
    } catch (error) {
        throw new Error(`failed to setup git: ${error}`);
    }
}
