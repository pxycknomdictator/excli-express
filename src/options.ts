import { database } from "./utils.js";

export const tsScripts = {
  build: "tsc",
  "win:dev": "node --watch --env-file=.env dist/main.js",
  dev: "tsc --watch & node --watch --env-file=.env dist/main.js",
  start: "node --env-file=.env dist/main.js",
  "db:start": "docker compose up -d",
  "db:stop": "docker compose down",
};

export const jsScripts = {
  dev: "node --watch --env-file=.env dist/main.js",
  start: "node --env-file=.env dist/main.js",
  "db:start": "docker compose up -d",
  "db:stop": "docker compose down",
};

export function prettier() {
  const prettierrcContent = `
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2
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

export function docker(db: string, dirName: string) {
  const composeFileContent = database(db, dirName);
  const dockerfileContent = "";
  const dockerignoreContent = `
node_modules
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.git
.gitignore
.env
.env.local
.env.development
.env.test
.env.production
.DS_Store
Thumbs.db
*.log
*.tmp
*.temp

# Ignore build artifacts in source, if applicable (Docker will build them)
build/
dist/
out/
output/
coverage/

# VSCode settings, IDE configs
.vscode/
.idea/

# Docker specific files
Dockerfile
docker-compose.yml
compose.yaml
`;

  return [
    {
      filename: "Dockerfile",
      content: dockerfileContent.trim(),
    },
    {
      filename: ".dockerignore",
      content: dockerignoreContent.trim(),
    },
    {
      filename: "compose.yaml",
      content: composeFileContent?.trim(),
    },
  ];
}

export function env() {
  const enVariables = `NODE_ENV=
PORT=
DATABASE_URL=
ARGON2_ROUND=
JWT_ACCESS_TOKEN_SECRET_KEY=
JWT_REFRESH_TOKEN_SECRET_KEY=
JWT_ACCESS_TOKEN_EXPIRY_TIME=
JWT_REFRESH_TOKEN_EXPIRY_TIME=
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
