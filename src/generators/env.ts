import { join } from "node:path";
import type { Database, Mode } from "@/types";
import { writeFile } from "node:fs/promises";

function getEnvVariables(
    database: Database,
    mode: Mode,
): Record<string, string> {
    const requiredConfig = {
        NODE_ENV: "development",
        PORT: "3000",
        CLIENT_ORIGIN: "http://localhost:5173",
    };

    const baseConfigs = {
        mongodb: {
            DATABASE_URL:
                "mongodb://admin:password123@localhost:27017/app_db?authSource=admin",
        },
        postgres: {
            DB_HOST: "localhost",
            DB_PORT: "5432",
            DB_NAME: "app_db",
            DB_USER: "admin",
            DB_PASSWORD: "password123",
            DATABASE_URL:
                "postgresql://admin:password123@localhost:5432/app_db",
        },
        mysql: {
            DB_HOST: "localhost",
            DB_PORT: "3306",
            DB_NAME: "app_db",
            DB_USER: "user",
            DB_PASSWORD: "password123",
            DB_ROOT_PASSWORD: "rootpassword",
            DATABASE_URL: "mysql://user:password123@localhost:3306/app_db",
        },
        mariadb: {
            DB_HOST: "localhost",
            DB_PORT: "3306",
            DB_NAME: "app_db",
            DB_USER: "user",
            DB_PASSWORD: "password123",
            DB_ROOT_PASSWORD: "rootpassword",
            DATABASE_URL: "mysql://user:password123@localhost:3306/app_db",
        },
    };

    const dockerConfigs = {
        mongodb: {
            MONGO_INITDB_DATABASE: "app_db",
            MONGO_INITDB_ROOT_USERNAME: "admin",
            MONGO_INITDB_ROOT_PASSWORD: "password123",
            ME_CONFIG_MONGODB_ADMINUSERNAME: "admin",
            ME_CONFIG_MONGODB_ADMINPASSWORD: "password123",
            ME_CONFIG_MONGODB_SERVER: "db",
            ME_CONFIG_BASICAUTH_USERNAME: "admin",
            ME_CONFIG_BASICAUTH_PASSWORD: "adminpassword",
            ADMIN_PANEL_PORT: "6969",
        },
        postgres: {
            PGADMIN_DEFAULT_EMAIL: "admin@example.com",
            PGADMIN_DEFAULT_PASSWORD: "adminpassword",
            ADMIN_PANEL_PORT: "6969",
        },
        mysql: {
            PMA_HOST: "database",
            ADMIN_PANEL_PORT: "6969",
        },
        mariadb: {
            PMA_HOST: "database",
            ADMIN_PANEL_PORT: "6969",
        },
    };

    const config = baseConfigs[database] || {};

    if (mode === "production") {
        return { ...requiredConfig, ...config, ...dockerConfigs[database] };
    }

    return requiredConfig;
}

export function generateEnvFile(database: Database, mode: Mode): string {
    const secret = getEnvVariables(database, mode);
    return Object.entries(secret)
        .map(([key, value]) => `${key}=${value}`)
        .join("\n");
}

export async function setupEnv(
    targetDir: string,
    mode: Mode,
    database: Database = "postgres",
) {
    const envFile = join(targetDir, ".env");
    const envExampleFile = join(targetDir, ".env.example");
    const secrets = generateEnvFile(database, mode);

    await Promise.all([
        writeFile(envFile, secrets, { encoding: "utf-8" }),
        writeFile(envExampleFile, secrets, { encoding: "utf-8" }),
    ]);
}
