import { fireShell } from "../utils";
import type { OrmParams } from "../types";

export async function setupOrm(config: OrmParams): Promise<void> {
    try {
        const { language, database, databaseOrm, pkgManager, targetDir } =
            config;

        const modifyORM =
            databaseOrm === "native_driver"
                ? databaseOrm.replace("_", "-")
                : databaseOrm;

        await fireShell(
            `npx @excli/orm-init --${language} --${pkgManager} --${database} --${modifyORM}`,
            targetDir,
        );
    } catch (error) {
        throw new Error(`failed to setup orm: ${error}`);
    }
}
