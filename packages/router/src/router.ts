import { parsePath, matchSegments } from './parse';
import type { Route, LoaderCtx } from './types';

type Compiled = { r: Route; segs: ReturnType<typeof parsePath> };

export class Router {
  private compiled: Compiled[];
  private notFound: Route | null;

  constructor(routes: Route[], notFound?: Route) {
    this.compiled = routes.map(r => ({ r, segs: parsePath(r.path) }));
    this.notFound = notFound ?? null;
  }

  match(url: URL) {
    const path = url.pathname;
    for (const c of this.compiled) {
      const params = matchSegments(c.segs, path);
      if (params) return { route: c.r, params };
    }
    return this.notFound ? { route: this.notFound, params: {} } : null;
  }

  async resolve(urlLike: string | URL) {
    const url = typeof urlLike === 'string' ? new URL(urlLike, 'http://localhost') : urlLike;
    const m = this.match(url);
    if (!m) return { status: 404, element: null, data: null, params: {} as Record<string,string> };
    const ctx: LoaderCtx = { params: m.params, url };
    const data = m.route.loader ? await m.route.loader(ctx) : null;
    const status = m.route.path === '/404' ? 404 : 200;
    return { status, element: m.route.component, data, params: m.params };
  }
}
