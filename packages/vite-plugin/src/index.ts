import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import type { Plugin, ResolvedConfig } from "vite";

function rootDir(metaUrl: string) {
  return path.resolve(path.dirname(fileURLToPath(metaUrl)), "../../..");
}

export function zeonPlugin(): Plugin {
  const root = rootDir(import.meta.url);
  const alias = {
    "@usezeon/core": path.join(root, "packages/core/src/index.ts"),
    "@usezeon/runtime": path.join(root, "packages/runtime/src/index.ts"),
    "@usezeon/router": path.join(root, "packages/router/src/index.ts"),
    "@usezeon/ssr": path.join(root, "packages/ssr/src/index.ts"),
  };

  let cfg: ResolvedConfig;
  const islands = new Set<string>();

  return {
    name: "zeon-plugin",
    apply: "build", 
    enforce: "post",

    config() {
      return { resolve: { alias } };
    },

    configResolved(c) {
      cfg = c;
      islands.clear();
    },

    transform(code, id) {
      // csak saját forrás: ts/tsx, nem node_modules
      if (id.includes("node_modules")) return null;
      if (!/\.(ts|tsx)$/.test(id)) return null;

      if (code.includes("client:")) {
        // rövidebb, projektgyökeres útvonal
        const rel = path.posix.normalize(
          id.replaceAll("\\", "/").replace(cfg.root.replaceAll("\\", "/") + "/", "")
        );
        islands.add(rel);
      }
      return null;
    },

    closeBundle() {
      const outDir = path.resolve(cfg.root, cfg.build.outDir ?? "dist");
      fs.mkdirSync(outDir, { recursive: true });
      const manifestPath = path.join(outDir, "islands.manifest.json");
      fs.writeFileSync(manifestPath, JSON.stringify(Array.from(islands), null, 2));
    },
  };
}

export default zeonPlugin;
