import { writeConfigFiles } from "../managers";
import { generatePrettierConfig } from "../generators";

export async function setupPrettier(targetDir: string): Promise<void> {
    try {
        const prettierConfigs = generatePrettierConfig();
        await writeConfigFiles(targetDir, prettierConfigs);
    } catch (error) {
        throw new Error(`failed to setup prettier: ${error}`);
    }
}
