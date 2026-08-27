import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { TopicRow } from "@/components/topic-row";
import { CATALOG, catalogHay } from "@/data/catalog";
import { THEMES } from "@/data/themes";
import type { ThemeId } from "@/data/types";
import { t, useLang } from "@/lib/lang";
import { pageHead } from "@/lib/page-head";
import { cn } from "@/lib/utils";

type Search = { q?: string };

export const Route = createFileRoute("/explore")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    q: typeof s.q === "string" ? s.q : undefined,
  }),
  head: () => pageHead("全部文化点"),
  component: Explore,
});

function Explore() {
  const { lang } = useLang();
  const navigate = useNavigate();
  const q = Route.useSearch().q ?? "";
  const [theme, setTheme] = useState<ThemeId | "all">("all");

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    return CATALOG.filter((topic) => {
      if (theme !== "all" && topic.theme !== theme) return false;
      if (!query) return true;
      return catalogHay(topic).includes(query);
    });
  }, [q, theme]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="type-kicker text-cinnabar">Catalog</p>
      <h1 className="mt-2 font-display text-4xl">{t(lang, "全部文化点", "All cultural points")}</h1>
      <p className="mt-3 max-w-2xl text-fg-muted">
        {t(
          lang,
          `${CATALOG.length} 个公共话题，按五大主题排列。未登录也能看完全部要点。`,
          `${CATALOG.length} shared topics across the five themes. The full brief is visible without signing in.`,
        )}
      </p>

      <div className="mt-8 flex flex-col gap-3">
        <input
          type="search"
          value={q}
          onChange={(e) => {
            const next = e.target.value;
            void navigate({ to: "/explore", search: { q: next || undefined }, replace: true });
          }}
          aria-label={t(lang, "搜索标题、要点、汉字或拼音", "Search titles, briefs, characters, pinyin")}
          placeholder={t(lang, "搜索标题、要点、汉字或拼音", "Search titles, briefs, characters, pinyin")}
          className="h-11 w-full rounded-lg border-0 bg-bg-elevated px-4 text-sm shadow-[var(--shadow-border)] outline-none ring-cinnabar/30 focus:ring-2"
        />
        <div className="flex flex-wrap gap-1.5">
          <FilterChip active={theme === "all"} onClick={() => setTheme("all")}>
            {t(lang, "全部", "All")}
          </FilterChip>
          {THEMES.map((th) => (
            <FilterChip key={th.id} active={theme === th.id} onClick={() => setTheme(th.id)}>
              {lang === "zh" ? th.title : th.titleEn}
            </FilterChip>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-fg-muted">{t(lang, `${list.length} 个文化点`, `${list.length} points`)}</p>
      <div className="mt-4 grid gap-3">
        {list.map((topic) => (
          <TopicRow key={topic.slug} topic={topic} />
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "h-11 rounded-full px-3 text-xs font-medium",
        active ? "bg-fg text-paper" : "bg-stone text-fg-muted hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}
