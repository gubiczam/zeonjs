import { createRouter, type PageModule } from "@usezeon/router";
import { renderRoute } from "@usezeon/ssr";

// Válassz EGYET:

// A) Generikus:
const pages = import.meta.glob<PageModule>("./routes/**/*.ts");

// B) Vagy biztos cast (ha A még panaszkodik az editorban):
// const pages = (import.meta as any).glob("./routes/**/*.ts") as Record<string, () => Promise<PageModule>>;

async function bootstrap() {
  const { html } = await renderRoute(pages, location.href);
  document.getElementById("app")!.innerHTML = html;
  const router = createRouter({ root: document.getElementById("app")!, pages });
  router.start();
}
bootstrap();
