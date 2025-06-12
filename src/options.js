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

export function git() {
  const gitignoreContent = `node_modules
.vscode
dist
output
.env
.DS_Store
Thumbs.db
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
`;
  return {
    gitignoreContent,
  };
}

export function docker() {
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
  ];
}
