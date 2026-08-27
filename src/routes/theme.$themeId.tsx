import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { TopicRow } from "@/components/topic-row";
import { briefsByTheme } from "@/data/catalog";
import { THEMES, getTheme } from "@/data/themes";
import type { ThemeId } from "@/data/types";
import { t, useLang } from "@/lib/lang";
import { pageHead } from "@/lib/page-head";

const IDS: ThemeId[] = ["identities", "experiences", "ingenuity", "society", "planet"];

export const Route = createFileRoute("/theme/$themeId")({
  beforeLoad: ({ params }) => {
    if (!IDS.includes(params.themeId as ThemeId)) throw notFound();
  },
  head: ({ params }) => {
    const theme = IDS.includes(params.themeId as ThemeId) ? getTheme(params.themeId as ThemeId) : undefined;
    return pageHead(theme?.title);
  },
  component: ThemePage,
});

function ThemePage() {
  const { themeId } = Route.useParams();
  const { lang } = useLang();
  const theme = getTheme(themeId as ThemeId);
  const topics = briefsByTheme(theme.id);
  const idx = THEMES.findIndex((x) => x.id === theme.id);
  const next = THEMES[(idx + 1) % THEMES.length];

  return (
    <div>
      <section className="relative h-[42dvh] min-h-72 overflow-hidden">
        <img src={theme.image} alt={theme.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-ink/90 via-bg-ink/30 to-bg-ink/35" />
        <div className="relative mx-auto flex h-full max-w-3xl flex-col justify-end px-4 pb-10 sm:px-6">
          <p className="type-kicker text-paper/75">
            {theme.number} · {theme.roman}
          </p>
          <h1 className="mt-2 font-display text-4xl text-paper sm:text-5xl">
            {lang === "zh" ? theme.title : theme.titleEn}
          </h1>
          <p className="mt-3 max-w-2xl text-paper/85">{lang === "zh" ? theme.focus : theme.focusEn}</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="mb-6 text-sm text-fg-muted">
          {t(lang, `${topics.length} 个文化点`, `${topics.length} cultural points`)}
        </p>
        <div className="grid gap-3">
          {topics.map((topic) => (
            <TopicRow key={topic.slug} topic={topic} />
          ))}
        </div>
        <div className="mt-14 flex justify-end">
          <Link to="/theme/$themeId" params={{ themeId: next.id }} className="text-sm text-cinnabar hover:underline">
            {t(lang, `下一主题 · ${next.title}`, `Next theme · ${next.titleEn}`)}
          </Link>
        </div>
      </section>
    </div>
  );
}
