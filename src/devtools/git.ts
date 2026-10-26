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
    return `# Dependencies
node_modules/

# Package manager caches
.npm/
.pnpm-store/
.yarn/*
!.yarn/patches/
!.yarn/plugins/
!.yarn/releases/
!.yarn/versions/
.pnp.*

# Environment variables and secrets
.env
.env.*
!.env.example
!.env.sample
!.env.template
.npmrc.local

# Private keys and certificates
*.key
*.pem
*.p12
*.pfx

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
bun-debug.log*

# Build output
dist/
build/
output/
coverage/
.nyc_output/
*.tsbuildinfo

# Runtime and temporary files
tmp/
temp/
*.pid
*.pid.lock
*.seed
.cache/

# Local database data
data/
docker-data/
*.sqlite
*.sqlite3
*.db-journal
dump.rdb

# Test reports
test-results/
playwright-report/
.nyc_output/

# IDE and editor
.idea/
.vscode/*
!.vscode/extensions.json
!.vscode/launch.json
!.vscode/tasks.json
*.swp
*.swo

# Operating system
.DS_Store
Thumbs.db
Desktop.ini

# Debug dumps
npm-debug.log*
lerna-debug.log*
report.*.json

# Local uploads (uncomment if files are user-generated)
# uploads/*
# !uploads/.gitkeep

# Database
drizzle
migrations
`;
}
