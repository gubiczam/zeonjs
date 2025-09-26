import { defineConfig } from "vite";
import path from "node:path";
export default defineConfig({
  resolve: {
    alias: {
      "@usezeon/core": path.resolve(__dirname, "../../packages/core/src/index.ts"),
      "@usezeon/runtime": path.resolve(__dirname, "../../packages/runtime/src/index.ts"),
      "@usezeon/ssr": path.resolve(__dirname, "../../packages/ssr/src/index.ts")
    }
  }
});
