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
    "tsx",
    "@types/node",
    "@types/express",
    "typescript",
    "@types/cors",
];

export const installCmdMap: Record<string, string> = {
    npm: "install",
    pnpm: "add",
    yarn: "add",
    bun: "add",
};

export const BANNER_FONT = "Standard";
export const HUSKY_COMMIT_FILE_NAME = "pre-commit";
