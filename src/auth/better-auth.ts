import { join } from "node:path";
import type { ProjectConfig, SQL_DATABASE } from "../types";
import { appendLanguageExtension, generateFile } from "../utils";

const betterAuthSQLProvider = {
    mysql: "mysql",
    mariadb: "mysql",
    postgres: "pg",
    sqlite: "sqlite",
};

function drizzleBetterAuthSQL(config: ProjectConfig) {
    const sqlDatabase = config.database as SQL_DATABASE;
    const provider = betterAuthSQLProvider[sqlDatabase];

    return `import { db } from "../db/index.js";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
    appName: "${config.directory}",
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    emailAndPassword: { enabled: true },
    database: drizzleAdapter(db, { provider: "${provider}", usePlural: true }),
});
`;
}

export async function setupBetterAuth(config: ProjectConfig) {
    const authName = join(config.targetDir, "src", "lib", "auth");
    const [authFile] = appendLanguageExtension(config.language, authName);

    if (config.databaseType === "sql" && config.databaseOrm === "drizzle") {
        const auth = drizzleBetterAuthSQL(config);
        await generateFile({ fileLocation: authFile!, fileContent: auth });
    }
}
