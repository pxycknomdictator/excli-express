import { fireShell } from "../utils";
import type { DockerParams } from "../types";

export async function setupDocker(config: DockerParams): Promise<void> {
    try {
        const { database, language, pkgManager, cache, targetDir } = config;
        await fireShell(
            `npx @excli/docker --${language} --${database} --${pkgManager} --${cache}`,
            targetDir,
        );
    } catch (error) {
        throw new Error(`failed to setup docker: ${error}`);
    }
}
