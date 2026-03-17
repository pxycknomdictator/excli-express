import type { ScriptConfig, INTERACTIVE_PROMPTS } from "src/types";

export const languages: INTERACTIVE_PROMPTS[] = [
    { label: "JavaScript", emoji: "🟡", value: "js" },
    { label: "TypeScript", emoji: "🔵", value: "ts" },
];

export const modes: INTERACTIVE_PROMPTS[] = [
    { label: "Development", emoji: "🛠️", value: "development" },
    { label: "Production", emoji: "🚀", value: "production" },
];

export const tools: INTERACTIVE_PROMPTS[] = [
    { label: "Git", emoji: "🐙", value: "git" },
    { label: "Prettier", emoji: "✨", value: "prettier" },
    { label: "Docker", emoji: "🐳", value: "docker" },
    { label: "Husky", emoji: "🐶", value: "husky" },
];

export const database_types: INTERACTIVE_PROMPTS[] = [
    { label: "SQL", emoji: "🗃️", value: "sql" },
    { label: "NoSQL", emoji: "🌿", value: "no_sql" },
];

export const pkg_managers: INTERACTIVE_PROMPTS[] = [
    { label: "None", emoji: "🚫", value: "none" },
    { label: "npm", emoji: "📦", value: "npm" },
    { label: "yarn", emoji: "🧶", value: "yarn" },
    { label: "pnpm", emoji: "🚀", value: "pnpm" },
    { label: "bun", emoji: "🥟", value: "bun" },
];

export const sql_database: INTERACTIVE_PROMPTS[] = [
    { label: "MySQL", emoji: "🐬", value: "mysql" },
    { label: "MariaDB", emoji: "🦭", value: "mariadb" },
    { label: "SQLite", emoji: "🪶", value: "sqlite" },
    { label: "PostgreSQL", emoji: "🐘", value: "postgres" },
];

export const no_sql_database: INTERACTIVE_PROMPTS[] = [
    { label: "MongoDB", emoji: "🍃", value: "mongodb" },
];

export const sql_orms: INTERACTIVE_PROMPTS[] = [
    { label: "Prisma", emoji: "📐", value: "prisma" },
    { label: "Drizzle", emoji: "⚡", value: "drizzle" },
    { label: "TypeORM", emoji: "🏗️", value: "typeorm" },
    { label: "Sequelize", emoji: "🐚", value: "sequelize" },
];

export const no_sql_orms: INTERACTIVE_PROMPTS[] = [
    { label: "Prisma", emoji: "📐", value: "prisma" },
    { label: "TypeORM", emoji: "🏗️", value: "typeorm" },
    { label: "Mongoose", emoji: "🦦", value: "mongoose" },
];

export const DIRECTORIES: string[] = [
    "config",
    "controllers",
    "routes",
    "middlewares",
    "services",
    "types",
    "utils",
    "models",
];

export const BASE_PACKAGES = [
    "express",
    "cors",
    "helmet",
    "express-rate-limit",
];

export const TS_DEV_PACKAGES = [
    "@types/node",
    "@types/express",
    "typescript",
    "@types/cors",
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
};

export const tsScripts: ScriptConfig = {
    build: "tsc",
    "build:watch": "tsc --watch",
    start: "node --env-file=.env dist/main.js",
    "start:watch": "node --watch --env-file=.env dist/main.js",
    dev: 'concurrently "npm run build:watch" "npm run start:watch"',
};

export const jsScripts: ScriptConfig = {
    dev: "node --watch --env-file=.env src/main.js",
    start: "node --env-file=.env src/main.js",
};

export const prettierScripts: ScriptConfig = {
    format: "prettier --write .",
};

export const dockerScripts: ScriptConfig = {
    "docker:up": "docker compose up -d",
    "docker:down": "docker compose down",
    "docker:run": "node dist/main.js",
};

export const BANNER_FONT = "Standard";
export const HUSKY_COMMIT_FILE_NAME = "pre-commit";

export function generateOptions(options: INTERACTIVE_PROMPTS[]) {
    return options.map(({ label, emoji, value }: INTERACTIVE_PROMPTS) => ({
        label: `${label} ${emoji}`,
        value: value,
    }));
}
