import { createRouter, type PageModule } from "@usezeon/router";

const pages = import.meta.glob<PageModule>("./routes/**/*.ts");

const router = createRouter({
  root: document.getElementById("app")!,
  pages
});
router.start();
