import { h } from "@zeonjs/runtime";
export default function Page() {
  return h("div", {},
    h("h1", {}, "About Page"),
    h("a", { href: "/" }, "Home ←")
  );
}
