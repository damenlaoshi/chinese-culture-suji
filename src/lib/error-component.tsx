import { Link, isNotFound, type ErrorComponentProps } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";
import { t, useLang } from "@/lib/lang";

export function AppNotFoundComponent() {
  const { lang } = useLang();
  return (
    <div className="mx-auto max-w-lg px-6 py-24 text-center">
      <p className="text-[11px] tracking-[0.18em] text-fg-subtle uppercase">404</p>
      <h1 className="mt-3 font-display text-3xl">{t(lang, "这一页还没有开", "This page is not open yet")}</h1>
      <p className="mt-3 text-fg-muted">
        {t(lang, "41 个文化点都在首页和总览里。", "All 41 cultural points are on the home page and catalog.")}
      </p>
      <Link to="/" className="mt-6 inline-flex h-11 items-center text-sm text-cinnabar hover:underline">
        {t(lang, "回到首页", "Back to home")}
      </Link>
    </div>
  );
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  const { lang } = useLang();
  if (isNotFound(error)) return <AppNotFoundComponent />;
  return (
    <div className="mx-auto flex min-h-[70dvh] max-w-lg flex-col items-center justify-center gap-3 px-6 text-center">
      <span className="text-cinnabar" aria-hidden="true">
        <TriangleAlert className="size-8" strokeWidth={1.75} />
      </span>
      <h1 className="font-display text-xl">{t(lang, "路上出了点问题", "Something went wrong")}</h1>
      <p className="max-w-md text-sm break-words text-fg-muted">
        {error.message || t(lang, "请再试一次，或回到首页。", "Try again, or go back home.")}
      </p>
    </div>
  );
}