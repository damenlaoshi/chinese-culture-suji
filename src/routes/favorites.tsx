import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/favorites")({
  beforeLoad: () => {
    throw redirect({ to: "/review", search: { filter: "favorite" } });
  },
});
