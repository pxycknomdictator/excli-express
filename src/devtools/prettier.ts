import { writeConfigFiles } from "src/utils";
import { generatePrettierConfig } from "src/generators";

export async function setupPrettier(targetDir: string): Promise<void> {
    const prettierConfigs = generatePrettierConfig();
    await writeConfigFiles(targetDir, prettierConfigs);
}
