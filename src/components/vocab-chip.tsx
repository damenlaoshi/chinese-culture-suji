import { Volume2 } from "lucide-react";
import { useMemo } from "react";
import type { VocabItem } from "@/data/types";
import { sentencePinyin } from "@/lib/pinyin";
import { speakChinese } from "@/lib/speech";
import { useReview, type VocabStatus } from "@/lib/review-store";
import { cn } from "@/lib/utils";
import { t, useLang } from "@/lib/lang";
import { RubyText } from "@/components/ruby-text";

const nextLabel: Record<VocabStatus, string> = {
  new: "新",
  learning: "学",
  known: "会",
};

export function VocabChip({ item, compact }: { item: VocabItem; compact?: boolean }) {
  const { lang } = useLang();
  const status = useReview((s) => s.vocabulary_state[item.hanzi] ?? "new");
  const cycleVocab = useReview((s) => s.cycleVocab);
  const showPinyin = useReview((s) => s.display_settings.show_pinyin);
  const showEnglish = useReview((s) => s.display_settings.show_english);
  const examplePy = useMemo(
    () => item.examplePinyin || sentencePinyin(item.example),
    [item.example, item.examplePinyin],
  );

  return (
    <article
      className={cn(
        "paper-sheet rounded-lg p-4",
        compact && "p-3",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-display text-2xl leading-none">{item.hanzi}</p>
          {showPinyin ? <p className="mt-1 text-sm text-fg-muted">{item.pinyin}</p> : null}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => speakChinese(item.hanzi)}
            className="grid size-11 place-items-center rounded-lg text-fg-muted hover:bg-stone hover:text-fg"
            aria-label={t(lang, "朗读", "Speak")}
          >
            <Volume2 className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => cycleVocab(item.hanzi)}
            className={cn(
              "h-11 min-w-11 rounded-lg px-2 text-xs font-medium",
              status === "known" && "bg-success/15 text-success",
              status === "learning" && "bg-warn/15 text-warn",
              status === "new" && "bg-stone text-fg-muted",
            )}
            aria-label={t(lang, `词汇状态：${nextLabel[status]}`, `Vocab status: ${status}`)}
          >
            {nextLabel[status]}
          </button>
        </div>
      </div>
      {showEnglish ? (
        <p className="mt-2 text-sm">
          {item.pos ? <span className="text-fg-subtle">{item.pos}</span> : null}
          {item.pos ? <span className="mx-1.5 text-border-strong">·</span> : null}
          {item.en}
        </p>
      ) : item.pos ? (
        <p className="mt-2 text-sm text-fg-subtle">{item.pos}</p>
      ) : null}
      {!compact ? (
        <div className="mt-3 border-t border-border pt-3">
          <p className="type-kicker text-fg-subtle">{t(lang, "搭配 / 例句", "Collocation")}</p>
          <p className="mt-1.5 text-sm leading-relaxed">
            <RubyText text={item.example} show={showPinyin} />
          </p>
          {showPinyin ? <p className="mt-1 text-xs leading-relaxed text-fg-muted">{examplePy}</p> : null}
          {showEnglish ? <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{item.exampleEn}</p> : null}
          <button
            type="button"
            onClick={() => speakChinese(item.example)}
            className="mt-2 inline-flex h-11 items-center gap-1 text-xs text-cinnabar hover:underline"
          >
            <Volume2 className="size-3" />
            {t(lang, "听句子", "Hear sentence")}
          </button>
        </div>
      ) : null}
    </article>
  );
}
