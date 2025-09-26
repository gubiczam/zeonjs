import { h } from "@usezeon/runtime";
export default function Page() {
  return h("div", {},
    h("h1", {}, "Home (SSR+CSR)"),
    h("a", { href: "/about" }, "About →")
  );
}
