import { useState } from "react";
import type { OralItem as OralItemType } from "@/data/catalog-types";
import { BriefZh } from "@/components/brief-text";
import { t, useLang } from "@/lib/lang";
import { speakChinese } from "@/lib/speech";
import { Volume2 } from "lucide-react";

export function OralItemCard({
  item,
  index,
  roundLabel,
}: {
  item: OralItemType;
  index: number;
  roundLabel: string;
}) {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <article className="paper-sheet rounded-lg p-4">
      <p className="type-kicker text-cinnabar">
        {roundLabel} · {String(index + 1).padStart(2, "0")}
      </p>
      <div className="mt-2">
        <BriefZh zh={item.zh} en={item.en} zhClassName="text-base" />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => speakChinese(item.zh)}
          className="inline-flex h-11 items-center gap-1 rounded-md px-3 text-xs text-cinnabar hover:bg-stone"
        >
          <Volume2 className="size-3.5" />
          {t(lang, "听题目", "Hear prompt")}
        </button>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 items-center rounded-md bg-fg px-4 text-xs font-medium text-paper"
        >
          {open
            ? t(lang, "收起提示", "Hide cues")
            : t(lang, "我已经回答／看提示", "I have answered / show cues")}
        </button>
      </div>
      {open ? (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {item.cues.map((c, ci) => (
            <li key={`${c}-${ci}`} className="rounded-md bg-stone px-3 py-1.5 text-xs text-fg">
              {c}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-xs text-fg-subtle">
          {t(lang, "先开口说。提示只有关键词，没有范文。", "Speak first. Cues are keywords, not a model answer.")}
        </p>
      )}
    </article>
  );
}
