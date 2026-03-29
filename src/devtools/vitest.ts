import { join } from "node:path";
import { writeFile } from "node:fs/promises";
import { appendLanguageExtension, makeDirectory } from "src/utils";
import type { ProjectConfig } from "src/types";

export function generateTestTemplate() {
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

export async function setupVitest({ language, targetDir }: ProjectConfig) {
    try {
        const appTestName = "app.spec";
        const [appTestPath] = appendLanguageExtension(language, appTestName);
        const appTestContent = generateTestTemplate();
        const testDirectory = join(targetDir, "tests");
        const appPath = join(testDirectory, appTestPath as string);

        await Promise.all([
            makeDirectory(testDirectory),
            writeFile(appPath, appTestContent, { encoding: "utf-8" }),
        ]);
    } catch (error) {
        throw new Error(`failed to setup vitest: ${error}`);
    }
}
