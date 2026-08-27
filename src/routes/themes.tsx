import { createFileRoute } from "@tanstack/react-router";
import { PhotoCard } from "@/components/photo-card";
import { briefsByTheme } from "@/data/catalog";
import { THEMES } from "@/data/themes";
import { t, useLang } from "@/lib/lang";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/themes")({
  component: ThemesPage,
  head: () => pageHead("五大主题"),
});

function ThemesPage() {
  const { lang } = useLang();
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="type-kicker text-cinnabar">IB prescribed themes</p>
      <h1 className="mt-2 font-display text-4xl">{t(lang, "五大主题", "Five themes")}</h1>
      <p className="mt-3 max-w-2xl text-fg-muted">
        {t(
          lang,
          "身份认同、经历体验、人类创造力、社会组织、共享地球。每个主题下的文化点对所有学生相同。",
          "Identities, Experiences, Human Ingenuity, Social Organization, Sharing the Planet. Topics under each theme are the same for every student.",
        )}
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {THEMES.map((th) => (
          <PhotoCard
            key={th.id}
            to="/theme/$themeId"
            params={{ themeId: th.id }}
            image={th.image}
            alt={th.title}
            kicker={`${th.number} · ${briefsByTheme(th.id).length} ${t(lang, "个文化点", "points")}`}
            title={lang === "zh" ? th.title : th.titleEn}
            subtitle={lang === "zh" ? th.focus : th.focusEn}
            tall
          />
        ))}
      </div>
    </div>
  );
}
