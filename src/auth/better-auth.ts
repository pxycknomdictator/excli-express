import { join } from "node:path";
import type { ProjectConfig, SQL_DATABASE } from "../types";
import { appendLanguageExtension, generateFile } from "../utils";

const betterAuthDrizzleProvider = {
    mysql: "mysql",
    mariadb: "mysql",
    postgres: "pg",
    sqlite: "sqlite",
};

const betterAuthPrismaProvider = {
    mysql: "mysql",
    mariadb: "mysql",
    postgres: "postgresql",
    sqlite: "sqlite",
    mongodb: "mongodb",
};

function drizzleBetterAuth(config: ProjectConfig) {
    const sqlDatabase = config.database as SQL_DATABASE;
    const provider = betterAuthDrizzleProvider[sqlDatabase];

    return `import { db } from "../db/index.js";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
    appName: "${config.directory ?? "better-express"}",
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    trustedOrigins: [process.env.CLIENT_ORIGIN ${config.language === "ts" ? "as string" : ""}],
    emailAndPassword: { enabled: true },
    database: drizzleAdapter(db, { provider: "${provider}", usePlural: true }),
});
`;
}

function prismaBetterAuth(config: ProjectConfig) {
    const database = config.database as ProjectConfig["database"];
    const provider = betterAuthPrismaProvider[database!];

    return `import { prisma } from "../db/index.js";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth({
    appName: "${config.directory}",
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    emailAndPassword: { enabled: true },
    database: prismaAdapter(prisma, { provider: "${provider}", usePlural: true }),
});
`;
}

export async function setupBetterAuth(config: ProjectConfig) {
    const authName = join(config.targetDir, "src", "lib", "auth");
    const [authFile] = appendLanguageExtension(config.language, authName);

    if (config.databaseOrm === "drizzle") {
        const auth = drizzleBetterAuth(config);
        await generateFile({ fileLocation: authFile!, fileContent: auth });
    }

    if (config.databaseOrm === "prisma") {
        const auth = prismaBetterAuth(config);
        await generateFile({ fileLocation: authFile!, fileContent: auth });
    }
}
