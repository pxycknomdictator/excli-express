import { fireShell } from "../utils";

export async function setupGit(targetDir: string): Promise<void> {
    try {
        await Promise.all([
            fireShell("git init", targetDir),
            fireShell(`npx gitignore node`, targetDir),
        ]);
    } catch (error) {
        throw new Error(`failed to setup git: ${error}`);
    }
}
