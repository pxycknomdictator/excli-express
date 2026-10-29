import type {
    ScriptConfig,
    INTERACTIVE_PROMPTS,
    ProjectConfig,
} from "../types";

export const tsconfigJson = "tsconfig.json";
export const pnpmWorkSpaceYaml = "pnpm-workspace.yaml";

export const languages: INTERACTIVE_PROMPTS[] = [
    {
        label: "JavaScript",
        emoji: "🟡",
        value: "js",
        hint: "Flexible and forgiving",
    },
    {
        label: "TypeScript",
        emoji: "🔵",
        value: "ts",
        hint: "JavaScript with trust issues",
    },
];

export const modes: INTERACTIVE_PROMPTS[] = [
    {
        label: "Development",
        emoji: "🛠️",
        value: "development",
        hint: "Break things freely",
    },
    {
        label: "Production",
        emoji: "🚀",
        value: "production",
        hint: "No room for mistakes",
    },
];

export const tools: INTERACTIVE_PROMPTS[] = [
    { label: "Git", emoji: "🐙", value: "git", hint: "Real version control" },
    {
        label: "Logger",
        emoji: "🪵",
        value: "logger",
        hint: "Structured app logging",
    },
    {
        label: "Vite+",
        emoji: "⚡",
        value: "vite_plus",
        hint: "Unified build, lint, format, native hooks & testing",
    },
    {
        label: "Docker",
        emoji: "🐳",
        value: "docker",
        hint: "Works everywhere, promise",
    },
];

export const loggers: INTERACTIVE_PROMPTS[] = [
    {
        label: "Winston",
        emoji: "🪵",
        value: "winston",
        hint: "Flexible and widely used",
    },
    {
        label: "Pino",
        emoji: "🌲",
        value: "pino",
        hint: "Blazing fast, low overhead",
    },
];

export const database_types: INTERACTIVE_PROMPTS[] = [
    {
        label: "SQL",
        emoji: "🗃️",
        value: "sql",
        hint: "Structured and relational",
    },
    {
        label: "NoSQL",
        emoji: "🌿",
        value: "no_sql",
        hint: "Flexible schemas",
    },
];

export const pkg_managers: INTERACTIVE_PROMPTS[] = [
    { label: "npm", emoji: "📦", value: "npm", hint: "The default choice" },
    {
        label: "yarn",
        emoji: "🧶",
        value: "yarn",
        hint: "Deterministic lockfiles",
    },
    {
        label: "pnpm",
        emoji: "🚀",
        value: "pnpm",
        hint: "Fast and disk-friendly",
    },
    {
        label: "bun",
        emoji: "🥟",
        value: "bun",
        hint: "Runtime and manager in one",
    },
];

export const sql_database: INTERACTIVE_PROMPTS[] = [
    {
        label: "MySQL",
        emoji: "🐬",
        value: "mysql",
        hint: "Industry standard",
    },
    {
        label: "MariaDB",
        emoji: "🦭",
        value: "mariadb",
        hint: "MySQL's open-source cousin",
    },
    {
        label: "SQLite",
        emoji: "🪶",
        value: "sqlite",
        hint: "Zero-config, file-based",
    },
    {
        label: "PostgreSQL",
        emoji: "🐘",
        value: "postgres",
        hint: "Developer favorite",
    },
];

export const no_sql_database: INTERACTIVE_PROMPTS[] = [
    {
        label: "MongoDB",
        emoji: "🍃",
        value: "mongodb",
        hint: "Document-based storage",
    },
];

export const sql_orms: INTERACTIVE_PROMPTS[] = [
    {
        label: "Prisma",
        emoji: "📐",
        value: "prisma",
        hint: "Type-safe and intuitive",
    },
    {
        label: "Drizzle",
        emoji: "⚡",
        value: "drizzle",
        hint: "Lightweight, SQL-first",
    },
    {
        label: "TypeORM",
        emoji: "🏗️",
        value: "typeorm",
        hint: "Classic decorator-based ORM",
    },
    {
        label: "Sequelize",
        emoji: "🐚",
        value: "sequelize",
        hint: "Battle-tested for Node.js",
    },
];

export const no_sql_orms: INTERACTIVE_PROMPTS[] = [
    {
        label: "Prisma",
        emoji: "📐",
        value: "prisma",
        hint: "Type-safe and intuitive",
    },
    {
        label: "TypeORM",
        emoji: "🏗️",
        value: "typeorm",
        hint: "Classic decorator-based ORM",
    },
    {
        label: "Mongoose",
        emoji: "🦦",
        value: "mongoose",
        hint: "Schema-based modeling",
    },
    {
        label: "Native Driver",
        emoji: "🌱",
        value: "native_driver",
        hint: "Raw, direct access",
    },
];

export const authLibraries: INTERACTIVE_PROMPTS[] = [
    {
        label: "Better Auth",
        emoji: "🔒",
        value: "better-auth",
        hint: "Drizzle, Prisma, Mongo native only",
    },
    {
        label: "Clerk",
        emoji: "🔑",
        value: "clerk",
        hint: "Drop-in auth, zero hassle",
    },
];

export const WEB_SERVERS: INTERACTIVE_PROMPTS[] = [
    {
        label: "Nginx",
        emoji: "⚡",
        value: "nginx",
        hint: "Battle-tested go-to",
    },
    {
        label: "Caddy",
        emoji: "🪄",
        value: "caddy",
        hint: "Automatic HTTPS",
    },
    {
        label: "Traefik",
        emoji: "🛣️",
        value: "traefik",
        hint: "Built for containers",
    },
];

export const USES_OF_WEB_SERVER: INTERACTIVE_PROMPTS[] = [
    {
        label: "Reverse Proxy",
        emoji: "🚦",
        value: "reverse_proxy",
        hint: "Route to the right service",
    },
    {
        label: "Load Balancing",
        emoji: "⚖️",
        value: "load_balancing",
        hint: "Spread the load",
    },
];

export const DIRECTORIES: string[] = [
    "middlewares",
    "services",
    "types",
    "lib",
];

export const BASE_PACKAGES = ["express"];
export const DEV_DEPENDENCIES = ["vite-plus", "supertest", "dotenv"];
export const ADDITIONAL_PACKAGES = ["cors", "helmet", "express-rate-limit"];

export const TS_DEV_DEPENDENCIES = ["@types/supertest"];
export const TS_ADDITIONAL_PACKAGES = ["@types/cors"];
export const TS_DEV_PACKAGES = [
    "tsc-alias",
    "@types/node",
    "@types/express",
    "typescript",
    "concurrently",
];

export const installCmdMap: Record<string, string> = {
    npm: "install",
    pnpm: "add",
    yarn: "add",
    bun: "add",
};

export const envConfig = {
    NODE_ENV: "development",
    PORT: "3000",
    CLIENT_ORIGIN: "http://localhost:5173",
    BETTER_AUTH_URL: "http://localhost:3000",
    BETTER_AUTH_SECRET: "D6XJhKQQAYOc4StRfLV0qibGhN3WMEiP",
    CLERK_PUBLISHABLE_KEY: "<clerk-publishable-key>",
    CLERK_SECRET_KEY: "<clerk-secret-key>",
};

export const tsScripts: ScriptConfig = {
    build: "tsc && tsc-alias",
    "build:watch": 'concurrently "tsc --watch" "tsc-alias -w"',
    start: "node --env-file=.env dist/main.js",
    "start:watch": "node --watch --env-file=.env dist/main.js",
    dev: 'concurrently -k "npm:build:watch" "npm:start:watch"',
};

export const jsScripts: ScriptConfig = {
    dev: "node --watch --env-file=.env src/main.js",
    start: "node --env-file=.env src/main.js",
};

export const vitePlusScripts: ScriptConfig = {
    test: "vp test",
    check: "vp check",
    format: "vp fmt",
    "check:fix": "vp check --fix",
};

export const drizzleScripts: ScriptConfig = {
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio",
    "db:migrate": "drizzle-kit migrate",
    "db:generate": "drizzle-kit generate",
};

export const prismaScripts: ScriptConfig = {
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
    "db:format": "prisma format",
    "db:dev": "prisma migrate dev",
    "db:generate": "prisma generate",
    "db:reset": "prisma migrate reset",
    "db:deploy": "prisma migrate deploy",
    "db:status": "prisma migrate status",
};

export function getDockerScripts(
    config: Pick<
        ProjectConfig,
        "cache" | "mode" | "webServer" | "database" | "databaseOrm"
    >,
): ScriptConfig {
    if (config.database === "sqlite") return {};

    const services = ["database", "admin"];
    const productionServices = ["database", "admin", "server"];

    if (config.cache === "redis") services.push("redis");
    if (config.webServer) productionServices.push(config.webServer);

    return {
        ...(config.databaseOrm === "drizzle" ? drizzleScripts : {}),
        ...(config.databaseOrm === "prisma" ? prismaScripts : {}),
        "db:up": `docker compose up -d ${services.join(" ")}`,
        "db:down": `docker compose down ${services.join(" ")}`,
        "db:prod:up": `docker compose up -d ${productionServices.join(" ")}`,
        "db:prod:down": `docker compose down ${productionServices.join(" ")}`,
    };
}

export const BANNER_FONT = "Standard";
export const betterAuthAdapterSupport = ["drizzle", "prisma", "native_driver"];
