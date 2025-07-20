export const tsScripts = {
    build: "tsc",
    dev: "tsx watch --env-file=.env src/main.ts",
    start: "node --env-file=.env dist/main.js",
    format: 'prettier --write "**/*.{js,ts,json,md,yml,yaml}"',
    "docker:up": "docker compose up -d",
    "docker:down": "docker compose down",
};

export const jsScripts = {
    dev: "node --watch --env-file=.env src/main.js",
    start: "node --env-file=.env src/main.js",
    format: 'prettier --write "**/*.{js,ts,json,md,yml,yaml}"',
    "docker:up": "docker compose up -d",
    "docker:down": "docker compose down",
};

export function prettier() {
    const prettierrcContent = `
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 4
}
`;

    const prettierignoreContent = `
build/
dist/
out/
output/

node_modules/

.env
.env.*.local
.env.development
.env.test
.env.production
.env.local
.env.example

.vscode/
.idea/

*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
`;

    return [
        {
            filename: ".prettierrc",
            content: prettierrcContent.trim(),
        },
        {
            filename: ".prettierignore",
            content: prettierignoreContent.trim(),
        },
    ];
}

export function env() {
    const enVariables = `NODE_ENV=
PORT=
DATABASE_URL=
CLIENT_ORIGIN=
`;
    return [
        {
            variables: enVariables,
            file: ".env",
        },
        {
            variables: enVariables,
            file: ".env.example",
        },
    ];
}
