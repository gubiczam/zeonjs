import { h } from "@usezeon/runtime";
import type { Loader } from "@usezeon/router";

export const loader: Loader = async ({ params }) => {
  return { user: { id: params.id, role: "admin" } };
};

export default function Page({ data }: { data: any }) {
  return h("div", {},
    h("h1", {}, `User: ${data.user.id}`),
    h("p", {}, `Role: ${data.user.role}`),
    h("a", { href: "/" }, "Home ←")
  );
}
