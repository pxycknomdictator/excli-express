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

export const ENV_VARIABLES = `NODE_ENV="development"
PORT=3000
DATABASE_URL=
CLIENT_ORIGIN="http://localhost:5173"
`;

export const BANNER_FONT = "Standard";
