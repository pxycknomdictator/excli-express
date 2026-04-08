#!/usr/bin/env node

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { displayBanner, showCompletionMessage } from "./cli";
import { createProject, getUserInputs, prepareProjectConfig } from "./core";

async function main() {
    displayBanner();
    const underScoreFilename = fileURLToPath(import.meta.url);
    const underScoreDirname = dirname(underScoreFilename);

    const userInputs = await getUserInputs();
    const config = await prepareProjectConfig(userInputs, underScoreDirname);

    await createProject(config);
    showCompletionMessage(config);
}

main().catch((error) => {
    console.error("❌ Error creating project:", error);
    process.exit(1);
});
