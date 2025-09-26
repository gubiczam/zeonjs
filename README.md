<p align="left">
  <a href="https://github.com/gubiczam/zeonjs/actions">
    <img alt="CI" src="https://img.shields.io/github/actions/workflow/status/gubiczam/zeonjs/ci.yml?branch=main">
  </a>
  <a href="https://www.npmjs.com/package/@usezeon/core">
    <img alt="npm core" src="https://img.shields.io/npm/v/@usezeon/core?label=core">
  </a>
  <a href="https://www.npmjs.com/package/@usezeon/vite-plugin">
    <img alt="npm vite-plugin" src="https://img.shields.io/npm/v/@usezeon/vite-plugin?label=vite-plugin">
  </a>
  <a href="https://github.com/gubiczam/zeonjs/stargazers">
    <img alt="stars" src="https://img.shields.io/github/stars/gubiczam/zeonjs">
  </a>
  <img alt="license" src="https://img.shields.io/badge/license-MIT-blue">
</p>

# Zeon

**Resumable, HTML-first frontend framework. Zero hydration. Islands only.**

- 🚀 **Zero hydration**: SSR első festés, majd csak az „island”-ok kapnak JS-t  
- ⚡ **Signals**: finom-granulált reaktivitás, VDOM nélkül  
- 📁 **File-based router**: params, async loader, 404  
- 🛠️ **Vite-first** DX és plugin

---

## Quickstart

```bash
pnpm install

# Examples
pnpm dev:hello   # http://localhost:5173
pnpm dev:router  # http://localhost:5174
pnpm dev:ssr     # http://localhost:5175
```

Use the Vite plugin in your app:

```ts
// vite.config.ts
import { defineConfig, type PluginOption } from "vite";
import zeon from "@usezeon/vite-plugin";

export default defineConfig({
  plugins: [zeon() as PluginOption]
});
```

---

## Install (packages)

```bash
pnpm add @usezeon/core @usezeon/runtime
pnpm add @usezeon/router @usezeon/ssr -D
```

---

## Minimal example

```ts
// main.ts
import { signal } from "@usezeon/core";
import { h, mount } from "@usezeon/runtime";

const n = signal(0);
const view = h("div", {},
  h("p", {}, () => `Count: ${n.get()}`),
  h("button", { onClick: () => n.set(n.get() + 1) }, "Inc")
);

mount(document.getElementById("app")!, view);
```

Router:

```ts
// router entry
import { createRouter } from "@usezeon/router";
const pages = import.meta.glob("./routes/**/*.ts"); // file-based pages
createRouter({ root: document.getElementById("app")!, pages }).start();
```

SSR:

```ts
// server
import { renderToString, inject } from "@usezeon/ssr";
const { html } = renderToString(App());
res.end(inject(html, { user: { id: 1 } }));
```

---

## API snapshot

- **Core**: `signal`, `computed`, `effect`
- **Runtime**: `h()`, `mount()`, `repeat()`
- **Router**: `createRouter({ root, pages })`, `loader({ params, url })`
- **SSR**: `renderToString()`, `inject()`, `readState()`, `readIslands()`

---

## Roadmap

- [ ] Resumption API (state snapshot + event wire-up)
- [ ] Actions (forms-first RPC)
- [ ] Devtools (signals inspector, timeline)
- [ ] Official templates (dashboard, e-commerce, SaaS)
- [ ] Docs site

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).  
Good first issues: <https://github.com/gubiczam/zeonjs/issues>

---

## License

MIT © 2025 gubiczam
