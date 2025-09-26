import { h } from "@usezeon/runtime";
export default function Page() {
  return h("div", {}, 
    h("h1", {}, "Home"),
    h("p", {}, "File-based routing működik."),
    h("a", { href: "/about" }, "About →")
  );
}
