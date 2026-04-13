import { fireShell } from "../utils";
import type { ProxyParams } from "../types";

export async function setupProxy(config: ProxyParams): Promise<void> {
    try {
        const { webServer, webServerMode, targetDir } = config;
        await fireShell(
            `npx @excli/proxy --${webServer} --${webServerMode}`,
            targetDir,
        );
    } catch (error) {
        throw new Error(`failed to setup proxy: ${error}`);
    }
}
