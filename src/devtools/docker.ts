import { fireShell } from "src/utils";
import type { ProjectConfig } from "src/types";

export async function setupDocker(config: ProjectConfig): Promise<void> {
    const { devTools, database, language, pkgManager, cache } = config;
    if (!devTools.includes("docker") || !database) return;

    const pkg = pkgManager === "none" ? "npm" : pkgManager;
    await fireShell(
        `npx @excli/docker --${language} --${database} --${pkg} --${cache}`,
        config.targetDir,
    );
}
