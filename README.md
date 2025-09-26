<p align="left">
  <a href="https://github.com/<user>/<repo>/actions">
    <img alt="CI" src="https://img.shields.io/github/actions/workflow/status/<user>/<repo>/ci.yml?branch=main">
  </a>
  <a href="https://www.npmjs.com/package/@usezeon/vite-plugin">
    <img alt="npm" src="https://img.shields.io/npm/v/@usezeon/vite-plugin?label=vite-plugin">
  </a>
  <a href="https://github.com/<user>/<repo>/stargazers">
    <img alt="stars" src="https://img.shields.io/github/stars/<user>/<repo>">
  </a>
  <img alt="license" src="https://img.shields.io/badge/license-MIT-blue">
</p>

# XYZ (work-in-progress)

**Resumable, HTML-first mini framework. Zero hydration. Islands only.**

---

## Why?

- 🚀 **Zero hydration** – SSR first paint, then only islands get JS.  
- ⚡ **Fine-grained reactivity** – signals, no virtual DOM.  
- 📁 **File-based router** – async loaders, params, 404.  
- 🛠️ **Vite-first DX** – works out of the box with Vite.  

---

## Quickstart

```bash
pnpm install

pnpm dev:hello   # Counter demo → http://localhost:5173
pnpm dev:router  # File-based routing → http://localhost:5174
pnpm dev:ssr     # SSR first paint + CSR nav → http://localhost:5175
