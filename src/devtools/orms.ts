import { fireShell } from "../utils";
import type { OrmParams } from "../types";

export async function setupOrm(config: OrmParams): Promise<void> {
    try {
        const { language, database, databaseOrm, pkgManager, targetDir } =
            config;

        await fireShell(
            `npx @excli/orm-init --${language} --${pkgManager} --${database} --${databaseOrm}`,
            targetDir,
        );
    } catch (error) {
        throw new Error(`failed to setup orm: ${error}`);
    }
}
