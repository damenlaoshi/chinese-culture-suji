export type ThemeId =
  | "identities"
  | "experiences"
  | "ingenuity"
  | "society"
  | "planet";

export type VocabItem = {
  hanzi: string;
  pinyin: string;
  pos: string;
  en: string;
  example: string;
  examplePinyin?: string;
  exampleEn: string;
};

export type Paragraph = {
  zh: string;
  en: string;
};

export type Prompt = {
  zh: string;
  en: string;
};

export type SectionKey = "scene" | "define" | "how" | "good" | "bad" | "sides" | "compare";

export type Section = {
  key: SectionKey;
  title: string;
  titleEn: string;
  zh: string;
  en: string;
};

export type SkeletonBeat = {
  time: string;
  zh: string;
  en: string;
};

export type Theme = {
  id: ThemeId;
  roman: string;
  title: string;
  titleEn: string;
  focus: string;
  focusEn: string;
  ibTopics: string[];
  image: string;
  color: string;
  number: string;
};

export type Topic = {
  slug: string;
  theme: ThemeId;
  title: string;
  titleEn: string;
  subtitle: string;
  ibLens: string;
  image: string;
  imageAlt: string;
  minutes: number;
  lookFor: Paragraph[];
  sections: Section[];
  oralSkeleton: SkeletonBeat[];
  oralPrompts: Prompt[];
  followUps: Prompt[];
  vocab: VocabItem[];
  related: string[];
};
