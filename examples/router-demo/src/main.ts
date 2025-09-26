import { createRouter, type PageModule } from "@zeonjs/router";

const pages = import.meta.glob<PageModule>("./routes/**/*.ts");

const router = createRouter({
  root: document.getElementById("app")!,
  pages
});
router.start();
