import { join } from "node:path";
import { writeFile } from "node:fs/promises";
import { fireShell } from "src/utils";
import { HUSKY_COMMIT_FILE_NAME } from "src/config";

export async function setupHusky(targetDir: string): Promise<void> {
    await fireShell("npx husky init", targetDir);
    const huskyFileLocation = join(targetDir, ".husky", HUSKY_COMMIT_FILE_NAME);
    await writeFile(huskyFileLocation, "", "utf-8");
}
