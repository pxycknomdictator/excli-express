import { fireShell } from "src/utils";
import type { ProjectConfig } from "src/types";

export async function setupOrm(config: ProjectConfig): Promise<void> {
    try {
        const { language, database, databaseOrm, pkgManager, devTools } =
            config;

        if (!devTools.includes("docker") || !database) return;
        const pkg = pkgManager === "none" ? "npm" : pkgManager;

        await fireShell(
            `npx @excli/orm-init --${language} --${pkg} --${database} --${databaseOrm}`,
            config.targetDir,
        );
    } catch (error) {
        throw new Error(`failed to setup orm: ${error}`);
    }
}
