import esbuild from "esbuild";
import { nodeExternalsPlugin } from "esbuild-node-externals";

await esbuild.build({
    entryPoints: ["src/index.ts"],
    outfile: "dist/index.js",
    bundle: true,
    platform: "node",
    target: "node20",
    format: "esm",
    sourcemap: true,
    plugins: [nodeExternalsPlugin()],
});
