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
            DATABASE_URL:
                "postgresql://admin:password123@localhost:5432/app_db",
        },
        mysql: {
            DATABASE_URL: "mysql://user:password123@localhost:3306/app_db",
        },
        mariadb: {
            DATABASE_URL: "mysql://user:password123@localhost:3306/app_db",
        },
    };

    const dockerConfigs = {
        mongodb: {
            MONGODB_PORT: "27017",
            ADMIN_PANEL_PORT: "6969",
            MONGODB_HOST: "localhost",

            MONGO_INITDB_DATABASE: "app_db",
            MONGO_INITDB_ROOT_USERNAME: "admin",
            MONGO_INITDB_ROOT_PASSWORD: "password123",

            ME_CONFIG_MONGODB_ADMINUSERNAME: "admin",
            ME_CONFIG_MONGODB_ADMINPASSWORD: "password123",
            ME_CONFIG_MONGODB_SERVER: "mongodb_container",
            ME_CONFIG_BASICAUTH_USERNAME: "admin",
            ME_CONFIG_BASICAUTH_PASSWORD: "adminpassword",
        },
        postgres: {
            POSTGRES_PORT: "5432",
            ADMIN_PANEL_PORT: "6969",
            POSTGRES_HOST: "localhost",

            POSTGRES_DB: "app_db",
            POSTGRES_USER: "admin",
            POSTGRES_PASSWORD: "password123",

            PGADMIN_DEFAULT_EMAIL: "admin@example.com",
            PGADMIN_DEFAULT_PASSWORD: "adminpassword",
        },
        mysql: {
            MYSQL_PORT: "3306",
            ADMIN_PANEL_PORT: "6969",
            MYSQL_HOST: "localhost",

            MYSQL_DATABASE: "app_db",
            MYSQL_USER: "user",
            MYSQL_PASSWORD: "password123",
            MYSQL_ROOT_PASSWORD: "rootpassword",

            PMA_HOST: "database",
        },
        mariadb: {
            MARIADB_PORT: "3306",
            ADMIN_PANEL_PORT: "6969",
            MARIADB_HOST: "localhost",

            MARIADB_DATABASE: "app_db",
            MARIADB_USER: "user",
            MARIADB_PASSWORD: "password123",
            MARIADB_ROOT_PASSWORD: "rootpassword",

            PMA_HOST: "database",
        },
    };

    const config = baseConfigs[database] || {};

    if (mode === "production") {
        return { ...requiredConfig, ...config, ...dockerConfigs[database] };
    }

    return requiredConfig;
}

function formatEnvWithComments(database: Database, mode: Mode): string {
    const vars = getEnvVariables(database, mode);
    const lines: string[] = [];

    lines.push("# Application Configuration");
    lines.push(`NODE_ENV=${vars.NODE_ENV}`);
    lines.push(`PORT=${vars.PORT}`);
    lines.push(`CLIENT_ORIGIN=${vars.CLIENT_ORIGIN}`);

    if (mode === "production") {
        lines.push("");
        lines.push("# Database Connection");
        lines.push(`DATABASE_URL=${vars.DATABASE_URL}`);

        if (database === "mongodb") {
            lines.push("");
            lines.push("# MongoDB Configuration");
            lines.push(`MONGODB_PORT=${vars.MONGODB_PORT}`);
            lines.push(`MONGODB_HOST=${vars.MONGODB_HOST}`);
            lines.push(`MONGO_INITDB_DATABASE=${vars.MONGO_INITDB_DATABASE}`);
            lines.push(
                `MONGO_INITDB_ROOT_USERNAME=${vars.MONGO_INITDB_ROOT_USERNAME}`,
            );
            lines.push(
                `MONGO_INITDB_ROOT_PASSWORD=${vars.MONGO_INITDB_ROOT_PASSWORD}`,
            );

            lines.push("");
            lines.push("# Mongo Express Admin Panel");
            lines.push(`ADMIN_PANEL_PORT=${vars.ADMIN_PANEL_PORT}`);
            lines.push(
                `ME_CONFIG_MONGODB_ADMINUSERNAME=${vars.ME_CONFIG_MONGODB_ADMINUSERNAME}`,
            );
            lines.push(
                `ME_CONFIG_MONGODB_ADMINPASSWORD=${vars.ME_CONFIG_MONGODB_ADMINPASSWORD}`,
            );
            lines.push(
                `ME_CONFIG_MONGODB_SERVER=${vars.ME_CONFIG_MONGODB_SERVER}`,
            );
            lines.push(
                `ME_CONFIG_BASICAUTH_USERNAME=${vars.ME_CONFIG_BASICAUTH_USERNAME}`,
            );
            lines.push(
                `ME_CONFIG_BASICAUTH_PASSWORD=${vars.ME_CONFIG_BASICAUTH_PASSWORD}`,
            );
        } else if (database === "postgres") {
            lines.push("");
            lines.push("# PostgreSQL Configuration");
            lines.push(`POSTGRES_PORT=${vars.POSTGRES_PORT}`);
            lines.push(`POSTGRES_HOST=${vars.POSTGRES_HOST}`);
            lines.push(`POSTGRES_DB=${vars.POSTGRES_DB}`);
            lines.push(`POSTGRES_USER=${vars.POSTGRES_USER}`);
            lines.push(`POSTGRES_PASSWORD=${vars.POSTGRES_PASSWORD}`);

            lines.push("");
            lines.push("# pgAdmin Admin Panel");
            lines.push(`ADMIN_PANEL_PORT=${vars.ADMIN_PANEL_PORT}`);
            lines.push(`PGADMIN_DEFAULT_EMAIL=${vars.PGADMIN_DEFAULT_EMAIL}`);
            lines.push(
                `PGADMIN_DEFAULT_PASSWORD=${vars.PGADMIN_DEFAULT_PASSWORD}`,
            );
        } else if (database === "mysql") {
            lines.push("");
            lines.push("# MySQL Configuration");
            lines.push(`MYSQL_PORT=${vars.MYSQL_PORT}`);
            lines.push(`MYSQL_HOST=${vars.MYSQL_HOST}`);
            lines.push(`MYSQL_DATABASE=${vars.MYSQL_DATABASE}`);
            lines.push(`MYSQL_USER=${vars.MYSQL_USER}`);
            lines.push(`MYSQL_PASSWORD=${vars.MYSQL_PASSWORD}`);
            lines.push(`MYSQL_ROOT_PASSWORD=${vars.MYSQL_ROOT_PASSWORD}`);

            lines.push("");
            lines.push("# phpMyAdmin Admin Panel");
            lines.push(`ADMIN_PANEL_PORT=${vars.ADMIN_PANEL_PORT}`);
            lines.push(`PMA_HOST=${vars.PMA_HOST}`);
        } else if (database === "mariadb") {
            lines.push("");
            lines.push("# MariaDB Configuration");
            lines.push(`MARIADB_PORT=${vars.MARIADB_PORT}`);
            lines.push(`MARIADB_HOST=${vars.MARIADB_HOST}`);
            lines.push(`MARIADB_DATABASE=${vars.MARIADB_DATABASE}`);
            lines.push(`MARIADB_USER=${vars.MARIADB_USER}`);
            lines.push(`MARIADB_PASSWORD=${vars.MARIADB_PASSWORD}`);
            lines.push(`MARIADB_ROOT_PASSWORD=${vars.MARIADB_ROOT_PASSWORD}`);

            lines.push("");
            lines.push("# phpMyAdmin Admin Panel");
            lines.push(`ADMIN_PANEL_PORT=${vars.ADMIN_PANEL_PORT}`);
            lines.push(`PMA_HOST=${vars.PMA_HOST}`);
        }
    }

    return lines.join("\n");
}

function formatEnvExampleWithComments(database: Database, mode: Mode): string {
    getEnvVariables(database, mode);
    const lines: string[] = [];

    lines.push("# Application Configuration");
    lines.push("NODE_ENV=");
    lines.push("PORT=");
    lines.push("CLIENT_ORIGIN=");

    if (mode === "production") {
        lines.push("");
        lines.push("# Database Connection");
        lines.push("DATABASE_URL=");

        if (database === "mongodb") {
            lines.push("");
            lines.push("# MongoDB Configuration");
            lines.push("MONGODB_PORT=");
            lines.push("MONGODB_HOST=");
            lines.push("MONGO_INITDB_DATABASE=");
            lines.push("MONGO_INITDB_ROOT_USERNAME=");
            lines.push("MONGO_INITDB_ROOT_PASSWORD=");

            lines.push("");
            lines.push("# Mongo Express Admin Panel");
            lines.push("ADMIN_PANEL_PORT=");
            lines.push("ME_CONFIG_MONGODB_ADMINUSERNAME=");
            lines.push("ME_CONFIG_MONGODB_ADMINPASSWORD=");
            lines.push("ME_CONFIG_MONGODB_SERVER=");
            lines.push("ME_CONFIG_BASICAUTH_USERNAME=");
            lines.push("ME_CONFIG_BASICAUTH_PASSWORD=");
        } else if (database === "postgres") {
            lines.push("");
            lines.push("# PostgreSQL Configuration");
            lines.push("POSTGRES_PORT=");
            lines.push("POSTGRES_HOST=");
            lines.push("POSTGRES_DB=");
            lines.push("POSTGRES_USER=");
            lines.push("POSTGRES_PASSWORD=");

            lines.push("");
            lines.push("# pgAdmin Admin Panel");
            lines.push("ADMIN_PANEL_PORT=");
            lines.push("PGADMIN_DEFAULT_EMAIL=");
            lines.push("PGADMIN_DEFAULT_PASSWORD=");
        } else if (database === "mysql") {
            lines.push("");
            lines.push("# MySQL Configuration");
            lines.push("MYSQL_PORT=");
            lines.push("MYSQL_HOST=");
            lines.push("MYSQL_DATABASE=");
            lines.push("MYSQL_USER=");
            lines.push("MYSQL_PASSWORD=");
            lines.push("MYSQL_ROOT_PASSWORD=");

            lines.push("");
            lines.push("# phpMyAdmin Admin Panel");
            lines.push("ADMIN_PANEL_PORT=");
            lines.push("PMA_HOST=");
        } else if (database === "mariadb") {
            lines.push("");
            lines.push("# MariaDB Configuration");
            lines.push("MARIADB_PORT=");
            lines.push("MARIADB_HOST=");
            lines.push("MARIADB_DATABASE=");
            lines.push("MARIADB_USER=");
            lines.push("MARIADB_PASSWORD=");
            lines.push("MARIADB_ROOT_PASSWORD=");

            lines.push("");
            lines.push("# phpMyAdmin Admin Panel");
            lines.push("ADMIN_PANEL_PORT=");
            lines.push("PMA_HOST=");
        }
    }

    return lines.join("\n");
}

export async function setupEnv(
    targetDir: string,
    mode: Mode,
    database: Database = "postgres",
) {
    const envFile = join(targetDir, ".env");
    const envExampleFile = join(targetDir, ".env.example");

    const envContent = formatEnvWithComments(database, mode);
    const envExampleContent = formatEnvExampleWithComments(database, mode);

    await Promise.all([
        writeFile(envFile, envContent, { encoding: "utf-8" }),
        writeFile(envExampleFile, envExampleContent, { encoding: "utf-8" }),
    ]);
}
