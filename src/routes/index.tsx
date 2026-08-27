import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Mic, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { LocalStateNote } from "@/components/local-state-note";
import { PhotoCard } from "@/components/photo-card";
import { Seal } from "@/components/seal";
import { TopicRow } from "@/components/topic-row";
import { CATALOG, catalogHay, randomBrief } from "@/data/catalog";
import { THEMES } from "@/data/themes";
import { t, useLang } from "@/lib/lang";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => pageHead(),
});

function Home() {
  const { lang } = useLang();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const liveHits = useMemo(() => {
    if (!query) return [];
    return CATALOG.filter((topic) => catalogHay(topic).includes(query)).slice(0, 6);
  }, [query]);
  const starters = CATALOG.slice(0, 8);

  return (
    <div>
      <section className="relative min-h-[78dvh] overflow-hidden">
        <img
          src="/images/hero.jpg"
          alt={t(lang, "江南水乡夜色", "Jiangnan water town at dusk")}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-ink via-bg-ink/35 to-bg-ink/40" />
        <div className="relative mx-auto flex min-h-[78dvh] max-w-6xl flex-col justify-end px-4 pb-12 pt-28 sm:px-6 sm:pb-16">
          <div className="mb-4 flex items-center gap-3">
            <Seal className="size-8 text-cinnabar" />
            <p className="type-kicker text-paper/75">IB Chinese B · 41 points</p>
          </div>
          <h1 className="max-w-3xl font-display text-4xl leading-[1.12] text-paper sm:text-6xl">
            {t(lang, "中国文化速记", "Chinese culture briefs")}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-paper/85 sm:text-lg">
            {t(
              lang,
              "一分钟抓住文化重点，三分钟完成一次 IB 口语练习。所有学生看到同一套 41 个文化点。",
              "One minute to catch the point, three minutes for an IB oral. Every student sees the same 41 topics.",
            )}
          </p>
          <form
            role="search"
            className="relative mt-8 max-w-lg"
            onSubmit={(e) => {
              e.preventDefault();
              void navigate({ to: "/explore", search: { q: q.trim() } });
            }}
          >
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-fg-muted" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                aria-label={t(lang, "搜索文化点、汉字或拼音", "Search a topic, character or pinyin")}
                placeholder={t(lang, "搜索文化点、汉字或拼音", "Search a topic, character or pinyin")}
                className="h-12 w-full rounded-lg border-0 bg-paper px-10 text-sm text-fg shadow-[var(--shadow-lift)] outline-none ring-cinnabar/30 focus:ring-2"
              />
            </div>
            {query ? (
              <ul className="mt-2 max-h-64 overflow-auto rounded-lg bg-paper py-1 shadow-[var(--shadow-lift)]">
                {liveHits.length === 0 ? (
                  <li className="px-4 py-3 text-sm text-fg-muted">{t(lang, "没有匹配的文化点", "No matching topics")}</li>
                ) : (
                  liveHits.map((topic) => (
                    <li key={topic.slug}>
                      <Link
                        to="/topic/$slug"
                        params={{ slug: topic.slug }}
                        className="flex min-h-11 items-center justify-between gap-3 px-4 py-2 text-sm hover:bg-stone"
                      >
                        <span className="font-medium">{lang === "zh" ? topic.titleZh : topic.titleEn}</span>
                        <span className="shrink-0 text-xs text-fg-subtle">{topic.ibLens}</span>
                      </Link>
                    </li>
                  ))
                )}
                <li className="border-t border-border">
                  <button
                    type="submit"
                    className="flex h-11 w-full items-center px-4 text-sm text-cinnabar hover:bg-stone"
                  >
                    {t(lang, "在总览里看全部结果", "See all results in the catalog")}
                  </button>
                </li>
              </ul>
            ) : null}
          </form>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/explore"
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-cinnabar pl-5 pr-4 text-sm font-medium text-cinnabar-fg hover:bg-cinnabar-hover"
            >
              {t(lang, "浏览全部 41 个文化点", "Browse all 41 points")}
              <ArrowRight className="size-4" />
            </Link>
            <button
              type="button"
              onClick={() => {
                const pick = randomBrief();
                void navigate({ to: "/oral", search: { slug: pick.slug } });
              }}
              className="inline-flex h-12 items-center gap-2 rounded-lg border border-paper/35 bg-bg-ink/25 px-5 text-sm font-medium text-paper backdrop-blur-sm hover:bg-paper/10"
            >
              <Mic className="size-4" />
              {t(lang, "开始随机口语", "Random oral")}
            </button>
          </div>
          <nav aria-label={t(lang, "五大主题", "Five themes")} className="mt-5 flex flex-wrap gap-2">
            {THEMES.map((th) => (
              <Link
                key={th.id}
                to="/theme/$themeId"
                params={{ themeId: th.id }}
                className="inline-flex h-11 items-center rounded-lg border border-paper/35 bg-bg-ink/25 px-3 text-xs font-medium text-paper backdrop-blur-sm hover:bg-paper/10"
              >
                <span className="mr-1.5 font-display tabular-nums">{th.number}</span>
                {lang === "zh" ? th.title : th.titleEn}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="type-kicker text-cinnabar">Prescribed themes</p>
            <h2 className="mt-2 font-display text-3xl">{t(lang, "五大规定主题", "The five themes")}</h2>
          </div>
          <Link to="/themes" className="text-sm text-cinnabar hover:underline">
            {t(lang, "看全部主题", "All themes")}
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {THEMES.map((th, i) => (
            <PhotoCard
              key={th.id}
              to="/theme/$themeId"
              params={{ themeId: th.id }}
              image={th.image}
              alt={th.title}
              kicker={`${th.number}  ${th.roman}`}
              title={lang === "zh" ? th.title : th.titleEn}
              subtitle={lang === "zh" ? th.focus : th.focusEn}
              tall={i === 0 || i === 3}
              className={i === 0 || i === 3 ? "md:row-span-2" : ""}
            />
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-bg-elevated/70">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="type-kicker text-cinnabar">{t(lang, "从这里开始", "Start here")}</p>
          <h2 className="mt-2 font-display text-3xl">{t(lang, "先看这几个文化点", "Start with these")}</h2>
          <p className="mt-2 max-w-2xl text-fg-muted">
            {t(
              lang,
              "每张卡片是同一套公共要点，不是某位同学的课堂记录。",
              "Each card is the shared brief, not one student’s class notes.",
            )}
          </p>
          <div className="mt-6 grid gap-3">
            {starters.map((topic) => (
              <TopicRow key={topic.slug} topic={topic} />
            ))}
          </div>
          <div className="mt-6">
            <Link to="/explore" className="inline-flex h-11 items-center text-sm text-cinnabar hover:underline">
              {t(lang, `查看全部 ${CATALOG.length} 个文化点`, `See all ${CATALOG.length} points`)}
            </Link>
          </div>
          <div className="mt-10">
            <LocalStateNote />
          </div>
        </div>
      </section>
    </div>
  );
}
