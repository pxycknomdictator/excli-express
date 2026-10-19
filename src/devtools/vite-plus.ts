import { join } from "node:path";
import { VITE_PLUS_COMMIT_FILE_NAME } from "../config";
import { appendLanguageExtension, generateFile, makeDirectory } from "../utils";
import type { GenerateFileArgs, ProjectConfig, VitePlusParams } from "../types";

function generateTestTemplate() {
    return `import request from "supertest";
import { app } from "../src/app.js";
import { describe, it, expect } from "vite-plus/test";

describe("GET /", () => {
    it("should return the status of app", async () => {
        const response = await request(app).get("/");
        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body).toStrictEqual({
            status: "OK"
        });
    });
});
`;
}

function vitePlusConfig(language: ProjectConfig["language"]) {
    const entryFile = language === "ts" ? "src/main.ts" : "src/main.js";

    return `import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env" });
    
import { defineConfig } from "vite-plus";

const config = defineConfig({
    staged: { "*": "vp check --fix" },
    test: {
        include: ["test/**/*.{test,spec}.{js,ts,mjs,mts,cjs,cts,jsx,tsx}"],
    },
    fmt: { semi: true, singleQuote: false, tabWidth: 4 },
    lint: {
        jsPlugins: [
            { name: "vite-plus", specifier: "vite-plus/oxlint-plugin" },
        ],
        rules: { "vite-plus/prefer-vite-plus-imports": "error" },
        options: { typeAware: true, typeCheck: true },
    },
    run: { cache: true },
    build: {
        target: "node20",
        ssr: true,
        outDir: "dist",
        sourcemap: true,
        rollupOptions: { input: "${entryFile}", output: { format: "esm" } },
    },
});

export default config;
`;
}

export async function setupVitePlus({ language, targetDir }: VitePlusParams) {
    try {
        const vitePlusLang = appendLanguageExtension(
            language,
            "app.spec",
            "vite.config",
        );
        const testDirectory = join(targetDir, "test");
        const appPath = join(testDirectory, vitePlusLang[0] as string);
        const vitePlusPath = join(targetDir, vitePlusLang[1] as string);

        const vite: GenerateFileArgs[] = [
            { fileLocation: appPath, fileContent: generateTestTemplate() },
            {
                fileLocation: vitePlusPath,
                fileContent: vitePlusConfig(language),
            },
        ];

        await makeDirectory(testDirectory);
        await setupHooks(targetDir);
        await Promise.all(vite.map((vite) => generateFile({ ...vite })));
    } catch (error) {
        throw new Error(`failed to setup vite-plus: ${error}`);
    }
}

export async function setupHooks(targetDir: string): Promise<void> {
    try {
        const hooksDirectory = join(targetDir, ".vite-hooks");
        await makeDirectory(hooksDirectory);
        const vitePlusFileLocation = join(
            targetDir,
            ".vite-hooks",
            VITE_PLUS_COMMIT_FILE_NAME,
        );
        await generateFile({
            fileLocation: vitePlusFileLocation,
            fileContent: "vp staged",
        });
    } catch (error) {
        throw new Error(`failed to setup vite hooks: ${error}`);
    }
}
