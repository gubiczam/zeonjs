import { signal } from "@usezeon/core";
import { h, mount, repeat } from "@usezeon/runtime";

type Todo = { id:number; t:string };
const todos = signal<Todo[]>([{ id:1, t:"Alpha" }, { id:2, t:"Beta" }]);

const view = h("div", {},
  h("div", {},
    h("button", { onClick: () => todos.set([...todos.get(), { id: Date.now(), t:"New" }]) }, "Add"),
    h("button", { onClick: () => todos.set(todos.get().slice(0, -1)) }, "Remove last")
  ),
  (() => repeat(
    () => todos.get(),
    (it) => h("div", { class:"row" }, it.t),
    (it) => it.id
  ))()
);

mount(document.getElementById("app")!, view);
