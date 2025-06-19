import esbuild from "esbuild";

const ctx = await esbuild.context({
  entryPoints: ["src/main.ts"],
  outfile: "dist/main.js",
  bundle: true,
  platform: "node",
  target: "node20",
  format: "esm",
  sourcemap: true,
  external: ["express", "node:*"],
});

await ctx.watch();
console.log("🚀 Watching for changes...");
