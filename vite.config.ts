import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "node20",
    lib: {
      entry: "src/main.ts",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "node:fs",
        "node:path",
        "node:process",
        "node:url",
        "node:child_process",
        "node:util",
        "node:readline",
        "node:stream",
        "@clack/prompts",
        "@clack/core",
      ],
    },
    outDir: "dist",
  },
});
