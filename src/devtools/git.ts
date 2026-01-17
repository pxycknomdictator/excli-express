import { fireShell } from "src/utils";

export async function setupGit(targetDir: string): Promise<void> {
    await fireShell(`npx gitignore node`, targetDir);
}
