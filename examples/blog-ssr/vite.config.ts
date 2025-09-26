import { defineConfig } from "vite";
import path from "node:path";
export default defineConfig({
  resolve: {
    alias: {
      "@zeonjs/core": path.resolve(__dirname, "../../packages/core/src/index.ts"),
      "@zeonjs/runtime": path.resolve(__dirname, "../../packages/runtime/src/index.ts"),
      "@zeonjs/ssr": path.resolve(__dirname, "../../packages/ssr/src/index.ts")
    }
  }
});
