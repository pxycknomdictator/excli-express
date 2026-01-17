#!/usr/bin/env node

import { displayBanner, showCompletionMessage } from "./cli";
import { createProject, getUserInputs, prepareProjectConfig } from "./core";

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
