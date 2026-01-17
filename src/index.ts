#!/usr/bin/env node

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { displayBanner, showCompletionMessage } from "./cli";
import { createProject, getUserInputs, prepareProjectConfig } from "./core";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

async function main() {
    displayBanner();

    const userInputs = await getUserInputs();
    const config = await prepareProjectConfig(userInputs);

    await createProject(config);
    showCompletionMessage(config);
}

main().catch((error) => {
    console.error("❌ Error creating project:", error);
    process.exit(1);
});
