import { join } from "node:path";
import { fireShell, generateFile } from "../utils";

export async function setupGit(targetDir: string): Promise<void> {
    const destinationPath = join(targetDir, ".gitignore");
    try {
        await fireShell("git init", targetDir);
        await generateFile({
            fileLocation: destinationPath,
            fileContent: gitIgnoreContent(),
        });
    } catch (error) {
        throw new Error(`failed to setup git: ${error}`);
    }
}

function gitIgnoreContent() {
    return `# dependencies
/node_modules
/.pnp
.pnp.*
.npm
.bun
.pnpm-store
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# lockfiles
package-lock.json
yarn.lock
pnpm-lock.yaml
bun.lock
bun.lockb

# production
dist
output
build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*
bun-debug.log*

# environment files
.env*

# Editor
.vscode

# Database
drizzle
migrations
`;
}
