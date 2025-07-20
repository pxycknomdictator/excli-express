import esbuild from "esbuild";
import { nodeExternalsPlugin } from "esbuild-node-externals";

await esbuild.build({
    entryPoints: ["src/main.ts"],
    outfile: "dist/main.js",
    bundle: true,
    platform: "node",
    target: "node20",
    format: "esm",
    sourcemap: true,
    plugins: [nodeExternalsPlugin()],
});

console.log("✅ Build completed.");
