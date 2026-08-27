import { createFileRoute, Outlet } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/vocab")({
  component: () => <Outlet />,
  head: () => pageHead("核心词汇"),
});