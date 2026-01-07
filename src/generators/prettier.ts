import type { ConfigFile } from "@/types";

const prettierrcContent = `
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 4
}
`;

const prettierignoreContent = `
# Build outputs
build/
dist/
out/
output/
coverage/
.tmp/
.temp/

# Dependencies
node_modules/

# Environment files
.env
.env.*
.env.*.local

# Package manager lock files (do not touch)
package-lock.json
npm-shrinkwrap.json
yarn.lock
pnpm-lock.yaml
bun.lockb

# Editor & IDE
.vscode/
.idea/
*.swp

# Logs
*.log
npm-debug.log*
yarn-debug.log*
pnpm-debug.log*

# OS files
.DS_Store
Thumbs.db

# Cache directories
.cache/
.parcel-cache/
.next/
.nuxt/
.svelte-kit/
.turbo/

# Misc
*.snap
`;

export function generatePrettierConfig(): ConfigFile[] {
    return [
        { filename: ".prettierrc", content: prettierrcContent.trim() },
        { filename: ".prettierignore", content: prettierignoreContent.trim() },
    ];
}
