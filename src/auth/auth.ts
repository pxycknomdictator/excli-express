import type { Auth, ProjectConfig } from "../types";
import { setupBetterAuth } from "./better-auth";

const authList = {
    "better-auth": setupBetterAuth,
};

export async function setupAuth(config: ProjectConfig) {
    try {
        const auth = authList[config.auth as Auth];
        await auth(config);
    } catch (error) {
        throw new Error(`failed to setup Auth: ${error}`);
    }
}
