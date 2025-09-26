import { signal } from "@zeonjs/core";
import { h, mount } from "@zeonjs/runtime";
import { renderToString } from "@zeonjs/ssr";

// szerveroldali szimuláció
function App() {
  const count = signal(0);
  return h("div", {},
    h("p", {}, () => `SSR Count: ${count.get()}`),
    h("button", { onClick: () => count.set(count.get() + 1) }, "Inc")
  );
}

// SSR string
const ssrHtml = renderToString(App());

// insert SSR output
document.querySelector("#app")!.innerHTML = ssrHtml;

// "resumption": ugyanazt a komponenst újra mountoljuk → eventek élnek
mount(document.getElementById("app")!, App());
