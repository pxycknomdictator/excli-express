import { fireShell } from "../utils";
import type { ProxyParams } from "../types";

export async function setupProxy(config: ProxyParams): Promise<void> {
    try {
        const { webServer, webServerMode, targetDir } = config;
        const modifyFormat = webServerMode?.replace("_", "-");
        await fireShell(
            `npx @excli/proxy --${webServer} --${modifyFormat}`,
            targetDir,
        );
    } catch (error) {
        throw new Error(`failed to setup proxy: ${error}`);
    }
}
