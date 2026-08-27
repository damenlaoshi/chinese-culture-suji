import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { AssistBar } from "@/components/assist-bar";
import { OralItemCard } from "@/components/oral-item";
import { CATALOG, getBrief, randomBrief } from "@/data/catalog";
import { t, useLang } from "@/lib/lang";
import { pageHead } from "@/lib/page-head";

type Search = { slug?: string };

export const Route = createFileRoute("/oral")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    slug: typeof s.slug === "string" ? s.slug : undefined,
  }),
  beforeLoad: ({ search }) => {
    if (!search.slug || !getBrief(search.slug)) {
      throw redirect({
        to: "/oral",
        search: { slug: randomBrief().slug },
        replace: true,
      });
    }
  },
  head: () => pageHead("IB 口语"),
  component: OralPage,
});

function OralPage() {
  const { lang } = useLang();
  const navigate = useNavigate();
  const slug = Route.useSearch().slug;
  const brief = (slug && getBrief(slug)) || CATALOG[0];

  const shuffle = () => {
    const next = randomBrief(brief.slug);
    void navigate({ to: "/oral", search: { slug: next.slug } });
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-10 sm:px-6 sm:py-14">
      <p className="type-kicker text-cinnabar">IB oral</p>
      <h1 className="mt-2 font-display text-4xl">{t(lang, "三轮口语练习", "Three-round oral")}</h1>
      <p className="mt-3 text-fg-muted">
        {t(
          lang,
          "第一轮看图，第二轮追问，第三轮放大到主题。提示要等你先回答。",
          "Round 1: the picture. Round 2: follow-up. Round 3: the wider theme. Cues wait until you have spoken.",
        )}
      </p>
      <div className="mt-6">
        <AssistBar />
      </div>

      <figure className="mt-8 overflow-hidden rounded-lg shadow-[var(--shadow-border)]">
        <img src={brief.image} alt={brief.imageAlt} className="aspect-[16/9] w-full object-cover" />
      </figure>
      <p className="type-kicker mt-4 text-fg-subtle">{brief.ibLens}</p>
      <h2 className="font-display text-2xl">{lang === "zh" ? brief.titleZh : brief.titleEn}</h2>
      <p className="brief-core mt-2 text-sm text-fg-muted">{brief.oneLineCore.zh}</p>

      <div className="mt-8 space-y-4">
        {brief.oralRound1.map((item, i) => (
          <OralItemCard key={`1-${i}`} item={item} index={i} roundLabel={t(lang, "第一轮 · 看图", "Round 1 · Picture")} />
        ))}
        {brief.oralRound2.map((item, i) => (
          <OralItemCard key={`2-${i}`} item={item} index={i} roundLabel={t(lang, "第二轮 · 追问", "Round 2 · Follow-up")} />
        ))}
        {brief.oralRound3.map((item, i) => (
          <OralItemCard key={`3-${i}`} item={item} index={i} roundLabel={t(lang, "第三轮 · 主题", "Round 3 · Theme")} />
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/topic/$slug"
          params={{ slug: brief.slug }}
          search={{ tab: "brief" }}
          className="inline-flex h-11 items-center rounded-lg border border-border bg-bg-elevated px-4 text-sm"
        >
          {t(lang, "看速记要点", "Open the brief")}
        </Link>
        <button
          type="button"
          onClick={shuffle}
          className="inline-flex h-11 items-center rounded-lg bg-cinnabar px-4 text-sm text-cinnabar-fg"
        >
          {t(lang, "换一个文化点", "Another topic")}
        </button>
      </div>
      <p className="mt-6 text-xs text-fg-subtle">
        {t(lang, `题库 ${CATALOG.length} 个文化点，每人看到的题目正文相同。`, `Bank of ${CATALOG.length} topics. The prompt text is the same for everyone.`)}
      </p>
    </div>
  );
}
