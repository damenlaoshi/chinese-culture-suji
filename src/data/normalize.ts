import type { Prompt, Section, SectionKey, Topic } from "./types";

const KEYS: SectionKey[] = ["scene", "define", "how", "good", "bad", "sides", "compare"];

const TITLES: Record<SectionKey, [string, string]> = {
  scene: ["画面与现象", "The scene"],
  define: ["这是什么", "What it is"],
  how: ["谁在过、怎么过", "Who, and how"],
  good: ["三层好处", "Three layers of good"],
  bad: ["两层问题", "Two kinds of trouble"],
  sides: ["广度侧面", "Other sides"],
  compare: ["比较与主题", "Comparison and the theme"],
};

type Raw = {
  slug: string;
  theme: Topic["theme"] | string;
  title: string;
  titleEn: string;
  subtitle: string;
  ibLens: string;
  image: string;
  imageAlt: string;
  minutes: number;
  vocab: Topic["vocab"];
  related: string[];
  paragraphs?: { zh: string; en: string }[];
  oralPrompts?: Prompt[];
  lookFor?: Topic["lookFor"];
  sections?: Section[];
  oralSkeleton?: Topic["oralSkeleton"];
  followUps?: Prompt[];
};

export function normalizeTopic(raw: Raw): Topic {
  const sections: Section[] =
    raw.sections && raw.sections.length
      ? raw.sections
      : (raw.paragraphs ?? []).map((p, i) => {
          const key = KEYS[i] ?? "sides";
          return { key, title: TITLES[key][0], titleEn: TITLES[key][1], zh: p.zh, en: p.en };
        });

  const oralPrompts = raw.oralPrompts ?? [];
  const oralSkeleton =
    raw.oralSkeleton && raw.oralSkeleton.length
      ? raw.oralSkeleton
      : oralPrompts.slice(0, 4).map((p, i) => ({
          time: ["0:00", "1:00", "2:20", "3:20"][i] ?? "3:40",
          zh: p.zh,
          en: p.en,
        }));

  return {
    slug: raw.slug,
    theme: raw.theme as Topic["theme"],
    title: raw.title,
    titleEn: raw.titleEn,
    subtitle: raw.subtitle,
    ibLens: raw.ibLens,
    image: raw.image,
    imageAlt: raw.imageAlt,
    minutes: raw.minutes,
    lookFor: raw.lookFor?.length ? raw.lookFor : [{ zh: raw.imageAlt, en: raw.imageAlt }],
    sections,
    oralSkeleton,
    oralPrompts,
    followUps: raw.followUps ?? [],
    vocab: raw.vocab,
    related: raw.related,
  };
}
