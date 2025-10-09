import type { ConfigFile } from "@/types";

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

export function generatePrettierConfig(): ConfigFile[] {
    return [
        { filename: ".prettierrc", content: prettierrcContent.trim() },
        { filename: ".prettierignore", content: prettierignoreContent.trim() },
    ];
}
