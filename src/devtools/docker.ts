import { fireShell } from "src/utils";
import type { ProjectConfig } from "src/types";

export async function setupDocker(config: ProjectConfig): Promise<void> {
    const { devTools, database, language, pkgManager } = config;
    if (!devTools.includes("docker") || !database) return;

    const pkg = pkgManager === "none" ? "npm" : pkgManager;
    await fireShell(
        `npx --yes @excli/docker -l=${language} -d=${database} -p=${pkg}`,
        config.targetDir,
    );
}
