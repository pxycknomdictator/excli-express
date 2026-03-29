import { join } from "node:path";
import {
    appendLanguageExtension,
    generateFile,
    makeDirectory,
} from "src/utils";
import type { GenerateFileArgs, ProjectConfig } from "src/types";

function generateTestTemplate() {
    return `import request from "supertest";
import { app } from "../src/app.js";
import { describe, it, expect } from "vitest";

describe("GET /", () => {
    it("should return the correct HTML heading", async () => {
        const response = await request(app).get("/");
        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toMatch(/html/);
        expect(response.text).toBe("<h1>Thanks for using Express Cli</h1>");
    });
    it("should contain the expected text content", async () => {
        const response = await request(app).get("/");
        expect(response.text).toContain("Express Cli");
    });
});
`;
}

function vitestConfig() {
    return `import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        environment: "node",
        include: ["src/**/*.test.{js,ts}", "tests/**/*.spec.{js,ts}"],
        exclude: ["**/node_modules/**", "**/dist/**"],
    },
});
`;
}

export async function setupVitest({ language, targetDir }: ProjectConfig) {
    try {
        const vitestLang = appendLanguageExtension(
            language,
            "app.spec",
            "vitest.config",
        );
        const testDirectory = join(targetDir, "tests");
        const appPath = join(testDirectory, vitestLang[0] as string);
        const vitestPath = join(targetDir, vitestLang[1] as string);

        const vitest: GenerateFileArgs[] = [
            { fileLocation: appPath, fileContent: generateTestTemplate() },
            { fileLocation: vitestPath, fileContent: vitestConfig() },
        ];

        await makeDirectory(testDirectory);
        await Promise.all(
            vitest.map(async (vite) => await generateFile({ ...vite })),
        );
    } catch (error) {
        throw new Error(`failed to setup vitest: ${error}`);
    }
}
