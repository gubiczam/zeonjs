import { defineConfig, type PluginOption } from "vite";
import zeon from "@usezeon/vite-plugin";
export default defineConfig({
plugins: [zeon() as PluginOption],
  server: { port: Number(process.env.PORT) || 5173 }
});
