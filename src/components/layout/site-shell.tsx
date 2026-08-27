import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Compass, Layers, Menu, Mic, NotebookPen, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AuthSlot } from "@/components/auth-slot";
import { Seal } from "@/components/seal";
import { t, useLang } from "@/lib/lang";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/explore" as const, zh: "全部文化点", en: "All points", icon: Compass },
  { to: "/themes" as const, zh: "五大主题", en: "Five themes", icon: Layers },
  { to: "/oral" as const, zh: "IB 口语", en: "Oral", icon: Mic },
  { to: "/review" as const, zh: "我的复习", en: "My review", icon: NotebookPen },
  { to: "/vocab" as const, zh: "核心词汇", en: "Vocab", icon: BookOpen },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const { lang, toggle } = useLang();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overHero = pathname === "/" || pathname.startsWith("/theme/") || pathname.startsWith("/login");
  const ghost = overHero && !scrolled && !open;

  useEffect(() => {
    setScrolled(false);
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-dvh flex-col bg-bg text-fg">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:inline-flex focus:h-11 focus:items-center focus:rounded-lg focus:bg-cinnabar focus:px-4 focus:text-sm focus:text-cinnabar-fg"
      >
        {t(lang, "跳到正文", "Skip to content")}
      </a>
      <header
        className={cn(
          "sticky top-0 z-40 transition-colors duration-200",
          ghost
            ? "border-b border-transparent bg-gradient-to-b from-bg-ink/80 to-transparent"
            : "border-b border-border/80 bg-bg/92 backdrop-blur-md",
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link to="/" className="flex h-11 shrink-0 items-center gap-2">
            <Seal className="size-7 text-cinnabar" />
            <span className={cn("font-display text-xl tracking-tight", ghost && "text-paper")}>速记</span>
            <span className={cn("hidden text-xs sm:inline", ghost ? "text-paper/70" : "text-fg-muted")}>
              {t(lang, "中国文化", "Chinese culture")}
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {NAV.map((item) => {
              const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "inline-flex h-11 items-center rounded-md px-3 text-sm transition-colors duration-150",
                    ghost
                      ? "text-paper/80 hover:bg-paper/10 hover:text-paper"
                      : "text-fg-muted hover:bg-stone hover:text-fg",
                    active && (ghost ? "bg-paper/15 text-paper" : "bg-stone text-fg"),
                  )}
                >
                  {t(lang, item.zh, item.en)}
                </Link>
              );
            })}
          </nav>

          <div className={cn("flex items-center gap-1", ghost && "text-paper")}>
            <button
              type="button"
              onClick={toggle}
              aria-label={lang === "zh" ? "Switch to English" : "切换到中文"}
              className={cn(
                "hidden h-11 min-w-11 items-center justify-center rounded-lg px-2 text-xs font-medium sm:inline-flex",
                ghost ? "text-paper/80 hover:bg-paper/10" : "text-fg-muted hover:bg-stone hover:text-fg",
              )}
            >
              {lang === "zh" ? "EN" : "中"}
            </button>
            <div className={ghost ? "opacity-90" : undefined}>
              <AuthSlot />
            </div>
            <button
              type="button"
              className={cn("grid size-11 place-items-center rounded-lg lg:hidden", ghost ? "text-paper" : "text-fg")}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t(lang, "关闭菜单", "Close menu") : t(lang, "打开菜单", "Open menu")}
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {open ? (
          <div id="mobile-nav" className="border-t border-border bg-bg px-4 py-3 lg:hidden">
            <div className="grid gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="inline-flex h-11 items-center rounded-lg px-3 text-sm hover:bg-stone"
                >
                  {t(lang, item.zh, item.en)}
                </Link>
              ))}
              <button
                type="button"
                onClick={toggle}
                className="inline-flex h-11 items-center rounded-lg px-3 text-left text-sm hover:bg-stone"
              >
                {lang === "zh" ? "Switch to English" : "切换到中文"}
              </button>
            </div>
          </div>
        ) : null}
      </header>
      <main id="main-content" className={cn("flex-1", overHero && "-mt-16")}>
        {children}
      </main>
      <footer className="border-t border-border bg-bg-elevated">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="flex items-center gap-2 font-display text-fg">
            <Seal className="size-6 text-cinnabar" />
            {t(lang, "中国文化速记", "Chinese culture briefs")}
          </p>
          <p className="text-sm text-fg-muted">
            {t(
              lang,
              "面向所有学生的公共文化速记与 IB 中文 B 口语练习。内容供学习讨论，不代表官方大纲全文。",
              "Shared cultural briefs and IB Chinese B oral practice for every student. For study, not an official syllabus.",
            )}
          </p>
        </div>
      </footer>
    </div>
  );
}
