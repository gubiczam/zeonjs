import { mount } from "@usezeon/runtime";

export type Params = Record<string, string>;
export type LoaderCtx = { params: Params; url: URL };
export type Loader = (ctx: LoaderCtx) => Promise<any> | any;
export type PageModule = { default: (props: any) => Node; loader?: Loader };

type Route = { path: string; paramNames: string[]; re: RegExp; mod: () => Promise<PageModule> };

function pathToRe(path: string) {
  const names: string[] = [];
  const norm = path.replace(/\/index$/, "/");
  const reSrc = "^" +
    norm
      .replace(/\/\[\.\.\.(.*?)\]/g, (_m, p) => { names.push(p); return "/(.+)"; })   
      .replace(/\/\[(.*?)\]/g, (_m, p) => { names.push(p); return "/([^/]+)"; })     
  + "$";
  return { re: new RegExp(reSrc), names };
}

function sortRoutes(rs: Route[]) {
  // konkrétabb előre: több szegmens, kevesebb param, nincs catch-all
  return rs.sort((a, b) => {
    const segs = (s: string) => s.split("/").filter(Boolean);
    const sa = segs(a.path), sb = segs(b.path);
    const score = (r: Route, s: string[]) =>
      s.length * 100 - (r.path.match(/\[(?!\.\.\.)/g)?.length ?? 0) * 10 - (r.path.includes("[...") ? 50 : 0);
    return score(b, sb) - score(a, sa);
  });
}

export function createRouter(opts: {
  root: Element;
  pages: Record<string, () => Promise<PageModule>>; 
  base?: string;
}) {
  const base = (opts.base ?? "").replace(/\/$/, "");
  const routes: Route[] = sortRoutes(
    Object.keys(opts.pages).map((fsPath) => {
      const web = fsPath.replace(/^.*\/routes/, "").replace(/\.(t|j)sx?$/, "");
      const { re, names } = pathToRe(web);
      return { path: web, paramNames: names, re, mod: opts.pages[fsPath] };
    })
  );

  const notFound = Object.entries(opts.pages).find(([p]) =>
    p.replace(/^.*\/routes/, "").replace(/\.(t|j)sx?$/, "") === "/404"
  )?.[1];

  async function render(urlStr: string) {
    const url = new URL(urlStr, location.origin);
    const path = url.pathname.replace(base, "") || "/";

    for (const r of routes) {
      const m = path.match(r.re);
      if (!m) continue;

      const params: Params = Object.fromEntries(
        r.paramNames.map((n, i) => [n, decodeURIComponent(m[i + 1] ?? "")])
      );

      const mod = await r.mod();
      const data = mod.loader ? await mod.loader({ params, url }) : undefined;
      const node = mod.default({ params, data });

      while (opts.root.firstChild) opts.root.removeChild(opts.root.firstChild);
      mount(opts.root, node);
      return;
    }

    if (notFound) {
      const mod = await notFound();
      const node = mod.default({});
      while (opts.root.firstChild) opts.root.removeChild(opts.root.firstChild);
      mount(opts.root, node);
    } else {
      while (opts.root.firstChild) opts.root.removeChild(opts.root.firstChild);
      mount(opts.root, document.createTextNode("404"));
    }
  }

  async function navigate(to: string) {
    const href = to.startsWith("http") ? to : base + to;
    history.pushState({}, "", href);
    await render(location.href);
  }

  function linkInterceptor(e: MouseEvent) {
    const a = (e.target as Element)?.closest?.("a");
    if (!a) return;
    const href = a.getAttribute("href");
    const ext = a.getAttribute("target");
    if (!href || href.startsWith("http") || href.startsWith("mailto:") || ext === "_blank") return;
    e.preventDefault();
    navigate(href);
  }

  window.addEventListener("popstate", () => { render(location.href); });
  document.addEventListener("click", linkInterceptor);

  return { start: () => render(location.href), navigate };
}
