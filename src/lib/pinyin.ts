import { pinyin } from "pinyin-pro";

export type PinyinToken = {
  origin: string;
  pinyin: string;
};

export function tokenizePinyin(text: string): PinyinToken[] {
  const raw = pinyin(text, { type: "all", nonZh: "consecutive" }) as Array<{
    origin: string;
    pinyin: string;
  }>;
  return raw.map((t) => ({
    origin: t.origin,
    pinyin: t.pinyin && /[\u4e00-\u9fff]/.test(t.origin) ? t.pinyin : "",
  }));
}

export function sentencePinyin(text: string): string {
  return pinyin(text, { toneType: "symbol", nonZh: "consecutive", type: "string" }) as string;
}
