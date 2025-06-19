import esbuild from "esbuild";
import { nodeExternalsPlugin } from "esbuild-node-externals";

const ctx = await esbuild.context({
  entryPoints: ["src/main.ts"],
  outfile: "dist/main.js",
  bundle: true,
  platform: "node",
  target: "node20",
  format: "esm",
  sourcemap: true,
  plugins: [nodeExternalsPlugin()],
});

await ctx.watch();
console.log("🚀 Watching for changes...");
