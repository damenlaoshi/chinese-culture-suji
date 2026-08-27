import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, Mic, Volume2 } from "lucide-react";
import { useEffect } from "react";
import { AssistBar } from "@/components/assist-bar";
import { BriefZh } from "@/components/brief-text";
import { OralItemCard } from "@/components/oral-item";
import { PhotoCard } from "@/components/photo-card";
import { RubyText } from "@/components/ruby-text";
import { getBrief } from "@/data/catalog";
import { CATALOG } from "@/data/catalog";
import { getTheme } from "@/data/themes";
import { getTopic } from "@/data/topics";
import { t, useLang } from "@/lib/lang";
import { pageHead } from "@/lib/page-head";
import { useReview, type ReviewStatus } from "@/lib/review-store";
import { speakChinese } from "@/lib/speech";
import { cn } from "@/lib/utils";

type Tab = "brief" | "oral" | "deep";

export const Route = createFileRoute("/topic/$slug")({
  validateSearch: (s: Record<string, unknown>): { tab?: Tab } => {
    if (s.tab === "oral" || s.tab === "deep" || s.tab === "brief") return { tab: s.tab };
    return {};
  },
  beforeLoad: ({ params }) => {
    if (!getBrief(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const brief = getBrief(params.slug);
    return pageHead(brief ? brief.titleZh : undefined);
  },
  component: TopicPage,
});

function TopicPage() {
  const { slug } = Route.useParams();
  const tab: Tab = Route.useSearch().tab ?? "brief";
  const brief = getBrief(slug);
  const deep = getTopic(slug);
  const { lang } = useLang();
  const markOpened = useReview((s) => s.markOpened);
  const topicState = useReview((s) => s.topic_state[slug]);
  const toggleFavorite = useReview((s) => s.toggleFavorite);
  const setReviewStatus = useReview((s) => s.setReviewStatus);
  const setNote = useReview((s) => s.setNote);
  const pinyin = useReview((s) => s.display_settings.show_pinyin);
  const english = useReview((s) => s.display_settings.show_english);

  useEffect(() => {
    if (brief) markOpened(brief.slug);
  }, [brief, markOpened]);

  if (!brief) return null;
  const theme = getTheme(brief.theme);
  const saved = Boolean(topicState?.favorite);
  const related = brief.related
    .map((id) => CATALOG.find((x) => x.slug === id))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));
  const status: ReviewStatus = topicState?.review_status ?? "unrated";

  return (
    <article>
      <div className="mx-auto max-w-lg px-4 pb-10 pt-6 sm:px-6 sm:pt-8">
        <figure className="overflow-hidden rounded-lg shadow-[var(--shadow-border)]">
          <img src={brief.image} alt={brief.imageAlt} className="aspect-[16/9] w-full object-cover" />
        </figure>

        <Link
          to="/theme/$themeId"
          params={{ themeId: theme.id }}
          className="type-kicker mt-5 inline-flex items-center gap-2 text-cinnabar hover:underline"
        >
          <span className="font-display tracking-normal">{theme.number}</span>
          {theme.roman} · {lang === "zh" ? theme.title : theme.titleEn}
        </Link>
        <h1 className="mt-1 font-display text-3xl sm:text-4xl">
          {lang === "zh" ? brief.titleZh : brief.titleEn}
        </h1>
        <p className="brief-core mt-4 font-display text-lg leading-snug sm:text-xl">{brief.oneLineCore.zh}</p>
        {english ? <p className="mt-2 pl-3.5 text-sm text-fg-muted">{brief.oneLineCore.en}</p> : null}

        <ol className="mt-5 divide-y divide-border border-y border-border">
          {brief.memoryPoints.map((p, i) => (
            <li key={i} className="flex gap-3 py-2.5">
              <span className="mt-0.5 w-6 shrink-0 font-display text-sm tabular-nums text-cinnabar">
                {String(i + 1).padStart(2, "0")}
              </span>
              <BriefZh zh={p.zh} en={p.en} zhClassName="text-sm sm:text-base" />
            </li>
          ))}
        </ol>

        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            to="/topic/$slug"
            params={{ slug: brief.slug }}
            search={{ tab: "oral" }}
            className="inline-flex h-12 min-w-40 flex-1 items-center justify-center gap-2 rounded-lg bg-cinnabar pl-5 pr-4 text-sm font-medium text-cinnabar-fg"
          >
            <Mic className="size-4" />
            {t(lang, "开始口语", "Start oral")}
          </Link>
          <button
            type="button"
            onClick={() => toggleFavorite(brief.slug)}
            aria-pressed={saved}
            className="inline-flex h-12 items-center gap-1 rounded-lg border border-border bg-bg-elevated px-4 text-sm"
          >
            <Heart className={cn("size-4", saved && "fill-cinnabar text-cinnabar")} />
            {saved ? t(lang, "已收藏", "Saved") : t(lang, "收藏", "Save")}
          </button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <TabBar slug={brief.slug} tab={tab} />
          <AssistBar />
        </div>

        {tab === "brief" ? (
          <BriefTab
            slug={brief.slug}
            status={status}
            note={topicState?.one_line_note ?? ""}
            onStatus={(s) => setReviewStatus(brief.slug, s)}
            onNote={(n) => setNote(brief.slug, n)}
          />
        ) : null}

        {tab === "oral" ? (
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
        ) : null}

        {tab === "deep" ? <DeepTab sections={deep?.sections ?? []} pinyin={pinyin} english={english} /> : null}
      </div>

      {related.length ? (
        <section className="border-t border-border bg-bg-elevated">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <h2 className="mb-6 font-display text-2xl">{t(lang, "相关文化点", "Related points")}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <PhotoCard
                  key={r.slug}
                  to="/topic/$slug"
                  params={{ slug: r.slug }}
                  image={r.image}
                  alt={r.imageAlt}
                  title={lang === "zh" ? r.titleZh : r.titleEn}
                  subtitle={r.oneLineCore.zh}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}

function TabBar({ slug, tab }: { slug: string; tab: Tab }) {
  const { lang } = useLang();
  const items: { id: Tab; zh: string; en: string }[] = [
    { id: "brief", zh: "速记", en: "Brief" },
    { id: "oral", zh: "口语", en: "Oral" },
    { id: "deep", zh: "深入了解", en: "Read more" },
  ];
  return (
    <div role="tablist" aria-label={t(lang, "话题页签", "Topic tabs")} className="flex rounded-lg bg-stone p-1">
      {items.map((item) => (
        <Link
          key={item.id}
          role="tab"
          aria-selected={tab === item.id}
          to="/topic/$slug"
          params={{ slug }}
          search={{ tab: item.id }}
          className={cn(
            "inline-flex h-11 min-w-16 items-center justify-center rounded-md px-3 text-sm",
            tab === item.id ? "bg-bg-elevated text-fg shadow-[var(--shadow-border)]" : "text-fg-muted",
          )}
        >
          {t(lang, item.zh, item.en)}
        </Link>
      ))}
    </div>
  );
}

function BriefTab({
  slug,
  status,
  note,
  onStatus,
  onNote,
}: {
  slug: string;
  status: ReviewStatus;
  note: string;
  onStatus: (s: ReviewStatus) => void;
  onNote: (n: string) => void;
}) {
  const { lang } = useLang();
  const brief = getBrief(slug)!;
  const pinyin = useReview((s) => s.display_settings.show_pinyin);
  const english = useReview((s) => s.display_settings.show_english);
  return (
    <div className="mt-8 space-y-8">
      {brief.imageEvidence.length ? (
        <section>
          <h2 className="font-display text-xl">{t(lang, "图上看得见", "Visible in the picture")}</h2>
          <ul className="mt-3 divide-y divide-border border-y border-border">
            {brief.imageEvidence.map((item, i) => (
              <li key={i} className="py-2.5">
                <BriefZh zh={item.zh} en={item.en} zhClassName="text-sm" />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section>
        <h2 className="font-display text-xl">{t(lang, "核心词", "Essential words")}</h2>
        <ul className="mt-3 divide-y divide-border border-y border-border">
          {brief.essentialLanguage.map((w) => (
            <li key={w.hanzi} className="py-3">
              <p className="font-display text-xl leading-none">{w.hanzi}</p>
              {pinyin || english ? (
                <p className="mt-1 text-sm text-fg-muted">
                  {pinyin ? w.pinyin : null}
                  {pinyin && english ? " · " : null}
                  {english ? w.en : null}
                </p>
              ) : null}
              <p className="mt-1 text-sm">
                {t(lang, "搭配", "Collocation")}：<RubyText text={w.collocation} show={pinyin} />
              </p>
              {english ? <p className="mt-1 text-sm text-fg-muted">{w.collocationEn}</p> : null}
            </li>
          ))}
        </ul>
      </section>

      <section className="brief-core py-1">
        <p className="type-kicker text-cinnabar">{t(lang, "比较锚", "Compare")}</p>
        <BriefZh className="mt-2" zh={brief.compareAnchor.zh} en={brief.compareAnchor.en} zhClassName="text-sm" />
      </section>

      <section className="brief-core py-1">
        <p className="type-kicker text-cinnabar">{t(lang, "表达提醒", "Caution")}</p>
        <BriefZh className="mt-2" zh={brief.expressionCaution.zh} en={brief.expressionCaution.en} zhClassName="text-sm" />
      </section>

      <section>
        <h2 className="font-display text-xl">{t(lang, "我的状态", "My status")}</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {(
            [
              ["unrated", "未标记", "Unrated"],
              ["need_review", "需要复习", "Need review"],
              ["can_say", "我会说", "I can say this"],
            ] as const
          ).map(([id, zh, en]) => (
            <button
              key={id}
              type="button"
              onClick={() => onStatus(id)}
              aria-pressed={status === id}
              className={cn(
                "h-11 rounded-full px-4 text-xs font-medium",
                status === id ? "bg-fg text-paper" : "bg-stone text-fg-muted",
              )}
            >
              {t(lang, zh, en)}
            </button>
          ))}
        </div>
        <label className="mt-4 block text-sm text-fg-muted" htmlFor={`note-${slug}`}>
          {t(lang, "一句个人笔记（只留在这台浏览器）", "One-line note (this browser only)")}
        </label>
        <textarea
          id={`note-${slug}`}
          value={note}
          maxLength={200}
          rows={2}
          onChange={(e) => onNote(e.target.value)}
          className="mt-1 w-full rounded-xl border border-border bg-bg-elevated px-3 py-2 text-sm outline-none ring-cinnabar/30 focus:ring-2"
        />
      </section>
    </div>
  );
}

function DeepTab({
  sections,
  pinyin,
  english,
}: {
  sections: { key: string; title: string; titleEn: string; zh: string; en: string }[];
  pinyin: boolean;
  english: boolean;
}) {
  const { lang } = useLang();
  if (!sections.length) {
    return (
      <p className="mt-8 text-sm text-fg-muted">
        {t(lang, "这一篇还没有更长的阅读。", "No longer reading for this topic yet.")}
      </p>
    );
  }
  return (
    <div className="mt-8">
      <p className="text-sm text-fg-muted">
        {t(
          lang,
          "下面是更长的学生安全阅读，默认收起。不是教师范文。",
          "Longer student-safe reading, collapsed by default. Not a teacher model answer.",
        )}
      </p>
      <div className="mt-4 border-t border-border">
        {sections.map((sec) => (
          <details key={sec.key} className="border-b border-border py-1">
            <summary className="min-h-11 cursor-pointer py-2 font-display text-lg">
              {sec.title}
              <span className="ml-2 text-xs font-sans text-fg-subtle">{sec.titleEn}</span>
            </summary>
            <div className="border-t border-border py-3">
              <p className="text-base leading-[1.9]">
                <RubyText text={sec.zh} show={pinyin} />
              </p>
              <button
                type="button"
                onClick={() => speakChinese(sec.zh)}
                className="mt-2 inline-flex h-11 items-center gap-1 text-xs text-cinnabar"
              >
                <Volume2 className="size-3.5" />
                {t(lang, "听这一段", "Hear this section")}
              </button>
              {english ? <p className="mt-3 border-l-2 border-cinnabar/40 pl-4 text-sm text-fg-muted">{sec.en}</p> : null}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
