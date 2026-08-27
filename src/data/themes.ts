import type { Theme, ThemeId } from "./types";

export const THEMES: Theme[] = [
  {
    id: "identities",
    roman: "Identities",
    title: "身份认同",
    titleEn: "Identities",
    focus: "人如何认识自己：家庭、面子、语言、服饰与身体观。",
    focusEn: "How people understand the self: family, face, language, dress, and the body.",
    ibTopics: ["Lifestyles", "Beliefs & values", "Language & identity", "Subcultures"],
    image: "/images/themes/identities.jpg",
    color: "cinnabar",
    number: "01",
  },
  {
    id: "experiences",
    roman: "Experiences",
    title: "经历体验",
    titleEn: "Experiences",
    focus: "人如何过一生：节日、礼仪、饮食、旅行与回家。",
    focusEn: "How a life is lived: festivals, rites, food, travel, and going home.",
    ibTopics: ["Leisure", "Holidays & travel", "Life stories", "Customs & traditions"],
    image: "/images/themes/experiences.jpg",
    color: "cinnabar",
    number: "02",
  },
  {
    id: "ingenuity",
    roman: "Human Ingenuity",
    title: "人类创造力",
    titleEn: "Human Ingenuity",
    focus: "人如何创造世界：汉字、艺术、支付、高铁与屏幕。",
    focusEn: "How people invent the world: characters, art, payments, rail, and screens.",
    ibTopics: ["Technology", "Artistic expression", "Communication & media", "Innovation"],
    image: "/images/themes/ingenuity.jpg",
    color: "cinnabar",
    number: "03",
  },
  {
    id: "society",
    roman: "Social Organization",
    title: "社会组织",
    titleEn: "Social Organization",
    focus: "人如何组织在一起：教育、家庭、工作、人情与城乡。",
    focusEn: "How people organize: school, family, work, guanxi, city and countryside.",
    ibTopics: ["Education", "The working world", "Community", "Social relationships"],
    image: "/images/themes/society.jpg",
    color: "cinnabar",
    number: "04",
  },
  {
    id: "planet",
    roman: "Sharing the Planet",
    title: "共享地球",
    titleEn: "Sharing the Planet",
    focus: "人如何与自然共处：节气、熊猫、共享、乡村与平衡。",
    focusEn: "How people live with nature: solar terms, pandas, sharing, villages, balance.",
    ibTopics: ["Environment", "Urban & rural", "Ethics", "Globalization"],
    image: "/images/themes/planet.jpg",
    color: "cinnabar",
    number: "05",
  },
];

export function getTheme(id: ThemeId): Theme {
  const t = THEMES.find((x) => x.id === id);
  if (!t) throw new Error(`Unknown theme: ${id}`);
  return t;
}
