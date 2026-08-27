export type Bilingual = {
  zh: string;
  en: string;
};

export type EssentialWord = {
  hanzi: string;
  pinyin: string;
  en: string;
  collocation: string;
  collocationEn: string;
};

export type OralItem = {
  zh: string;
  en: string;
  cues: string[];
};

export type TopicBrief = {
  slug: string;
  theme: "identities" | "experiences" | "ingenuity" | "society" | "planet";
  titleZh: string;
  titleEn: string;
  subtitle: string;
  ibLens: string;
  image: string;
  imageAlt: string;
  related: string[];
  oneLineCore: Bilingual;
  memoryPoints: Bilingual[];
  imageEvidence: Bilingual[];
  essentialLanguage: EssentialWord[];
  expressionCaution: Bilingual;
  compareAnchor: Bilingual;
  oralRound1: OralItem[];
  oralRound2: OralItem[];
  oralRound3: OralItem[];
  contentStatus: "approved";
  factStatus: "checked" | "needs_review";
  rightsStatus: "cleared";
  publicStatus: "approved";
  timeSensitiveYear: number | null;
};
