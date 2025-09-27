import { defineConfig, type PluginOption } from "vite";
import zeonPlugin from "@usezeon/vite-plugin";

export default defineConfig({
  plugins: [zeonPlugin() as PluginOption] 
});
