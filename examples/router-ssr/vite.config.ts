import { defineConfig, type PluginOption } from "vite";
import xyz from "@zeonjs/vite-plugin";
export default defineConfig({
  plugins: [xyz() as PluginOption],
  server: { port: Number(process.env.PORT) || 5175 }
});
