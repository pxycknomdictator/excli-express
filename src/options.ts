export const tsScripts = {
  build: "tsc",
  dev: "tsx watch --env-file=.env src/main.ts",
  start: "node dist/main.js",
  "db:start": "docker compose up -d",
  "db:stop": "docker compose down",
};

export const jsScripts = {
  dev: "node --watch --env-file=.env src/main.js",
  start: "node src/main.js",
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
