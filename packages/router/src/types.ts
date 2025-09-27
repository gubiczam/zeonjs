export type Params = Record<string, string>;
export type LoaderCtx = { params: Params; url: URL };
export type Route = {
  path: string;               
  component: any;             
  loader?: (ctx: LoaderCtx) => unknown | Promise<unknown>;
};
