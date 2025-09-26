import { signal } from "@xyz/core";
import { h, mount } from "@xyz/runtime";

const n = signal(0);
const view = h("div", { class: "card" },
  h("p", {}, () => `Count: ${n.get()}`),
  h("button", { onClick: () => n.set(n.get() + 1) }, "Inc"),
  h("button", { onClick: () => n.set(0) }, "Reset")
);

mount(document.getElementById("app")!, view);
