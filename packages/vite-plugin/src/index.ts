import path from "node:path";
import { fileURLToPath } from "node:url";

function rootDir(metaUrl: string) {
  return path.resolve(path.dirname(fileURLToPath(metaUrl)), "../../..");
}

export function xyzPlugin() {
  const root = rootDir(import.meta.url);
  const alias = {
    "@zeonjs/core": path.join(root, "packages/core/src/index.ts"),
    "@zeonjs/runtime": path.join(root, "packages/runtime/src/index.ts"),
    "@zeonjs/router": path.join(root, "packages/router/src/index.ts"),
    "@zeonjs/ssr": path.join(root, "packages/ssr/src/index.ts")
  };
  return {
    name: "xyz-plugin",
    config() {
      return { resolve: { alias } };
    }
  };
}

export default xyzPlugin;
