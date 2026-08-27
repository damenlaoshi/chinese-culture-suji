import briefsJson from "./briefs.json";
import type { ThemeId } from "./types";
import type { TopicBrief } from "./catalog-types";

export const CATALOG: TopicBrief[] = briefsJson as TopicBrief[];

export function getBrief(slug: string): TopicBrief | undefined {
  return CATALOG.find((t) => t.slug === slug);
}

export function briefsByTheme(theme: ThemeId): TopicBrief[] {
  return CATALOG.filter((t) => t.theme === theme);
}

export function catalogHay(t: TopicBrief): string {
  return [
    t.titleZh,
    t.titleEn,
    t.subtitle,
    t.ibLens,
    t.oneLineCore.zh,
    t.oneLineCore.en,
    t.expressionCaution.zh,
    t.expressionCaution.en,
    t.compareAnchor?.zh ?? "",
    t.compareAnchor?.en ?? "",
    ...t.memoryPoints.map((p) => `${p.zh} ${p.en}`),
    ...t.essentialLanguage.map((w) => `${w.hanzi} ${w.pinyin} ${w.en} ${w.collocation}`),
  ]
    .join(" ")
    .toLowerCase();
}

export function allEssentialWords() {
  return CATALOG.flatMap((t) =>
    t.essentialLanguage.map((w) => ({
      ...w,
      topicSlug: t.slug,
      theme: t.theme,
      topicTitle: t.titleZh,
    })),
  );
}

export function randomBrief(exclude?: string): TopicBrief {
  const pool = exclude ? CATALOG.filter((t) => t.slug !== exclude) : CATALOG;
  return pool[Math.floor(Math.random() * pool.length)] ?? CATALOG[0];
}
