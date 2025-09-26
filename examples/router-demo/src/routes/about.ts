import { h } from "@zeonjs/runtime";
export default function Page() {
  return h("div", {}, 
    h("h1", {}, "About"),
    h("p", {}, "Zero-hydration framework demo."),
    h("a", { href: "/" }, "Home ←")
  );
}
