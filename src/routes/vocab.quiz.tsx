import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AssistBar } from "@/components/assist-bar";
import { RubyText } from "@/components/ruby-text";
import { allEssentialWords } from "@/data/catalog";
import { t, useLang } from "@/lib/lang";
import { pageHead } from "@/lib/page-head";
import { sentencePinyin } from "@/lib/pinyin";
import { useReview } from "@/lib/review-store";
import { speakChinese } from "@/lib/speech";

export const Route = createFileRoute("/vocab/quiz")({
  component: QuizPage,
  head: () => pageHead("词义选择"),
});

const BANK = allEssentialWords().map((w) => ({
  hanzi: w.hanzi,
  pinyin: w.pinyin,
  en: w.en,
  example: w.collocation,
  exampleEn: w.collocationEn,
}));

type Item = (typeof BANK)[number];

function pick<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

function QuizPage() {
  const { lang } = useLang();
  const setVocab = useReview((s) => s.setVocab);
  const showPinyin = useReview((s) => s.display_settings.show_pinyin);
  const [deck, setDeck] = useState<Item[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    setDeck(pick(BANK, Math.min(12, BANK.length)));
    setIdx(0);
    setScore(0);
    setPicked(null);
  }, [nonce]);

  const current = deck?.[idx];
  const done = Boolean(deck) && idx >= deck!.length;

  const options = useMemo(() => {
    if (!current) return [];
    const distractors = pick(
      BANK.filter((x) => x.hanzi !== current.hanzi && x.en !== current.en),
      3,
    );
    return pick([current, ...distractors], 4).map((x) => x.en);
  }, [current]);

  if (!deck) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24">
        <p className="type-kicker text-cinnabar">Quiz</p>
        <h1 className="mt-2 font-display text-3xl">{t(lang, "词义选择", "Pick the meaning")}</h1>
        <p className="mt-3 text-sm text-fg-muted">{t(lang, "正在出题…", "Preparing a round…")}</p>
      </div>
    );
  }

  if (done || !current) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="type-kicker text-cinnabar">Quiz</p>
        <h1 className="mt-3 font-display text-4xl">
          {score} / {deck.length}
        </h1>
        <p className="mt-3 text-fg-muted">
          {t(lang, "答对的词已标为「会」。再练一轮会更稳。", "Correct words are marked known. Another round will settle them.")}
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/vocab" className="inline-flex h-11 items-center rounded-lg bg-cinnabar px-5 text-sm text-cinnabar-fg">
            {t(lang, "回到词库", "Back to studio")}
          </Link>
          <button
            type="button"
            className="inline-flex h-11 items-center rounded-xl border border-border px-5 text-sm"
            onClick={() => setNonce((n) => n + 1)}
          >
            {t(lang, "再来一轮", "Another round")}
          </button>
        </div>
      </div>
    );
  }

  const correct = picked === current.en;

  return (
    <div className="mx-auto max-w-lg px-4 py-12 sm:py-16">
      <p className="type-kicker text-cinnabar">Quiz</p>
      <h1 className="mt-2 font-display text-3xl">{t(lang, "词义选择", "Pick the meaning")}</h1>
      <div className="mt-4">
        <AssistBar />
      </div>
      <p className="mt-4 text-sm text-fg-muted">
        {idx + 1} / {deck.length}
      </p>
      <button
        type="button"
        onClick={() => speakChinese(current.hanzi)}
        className="mt-6 block w-full rounded-2xl border border-border bg-bg-elevated px-6 py-10 text-center shadow-[var(--shadow-border)]"
      >
        <span className="font-display text-5xl">{current.hanzi}</span>
        {showPinyin ? <span className="mt-3 block text-fg-muted">{current.pinyin}</span> : null}
      </button>
      <p className="mt-6 text-sm text-fg-subtle">{t(lang, "选出正确的英文意思", "Choose the English meaning")}</p>
      <div className="mt-3 grid gap-2">
        {options.map((opt) => {
          const show = picked !== null;
          const isRight = opt === current.en;
          return (
            <button
              key={opt}
              type="button"
              disabled={picked !== null}
              onClick={() => {
                setPicked(opt);
                if (opt === current.en) {
                  setScore((s) => s + 1);
                  setVocab(current.hanzi, "known");
                } else {
                  setVocab(current.hanzi, "learning");
                }
              }}
              className={[
                "min-h-12 rounded-xl border px-4 py-3 text-left text-sm",
                !show && "border-border bg-bg-elevated hover:bg-stone",
                show && isRight && "border-success bg-success/10",
                show && !isRight && opt === picked && "border-cinnabar bg-cinnabar/10",
                show && !isRight && opt !== picked && "border-border bg-bg-elevated opacity-60",
              ].join(" ")}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {picked ? (
        <div className="mt-6 space-y-4">
          <p className="text-sm text-fg-muted">
            {correct ? t(lang, "对了。", "Correct.") : t(lang, `是「${current.en}」。`, `It’s “${current.en}”.`)}
          </p>
          <div className="rounded-xl border border-border bg-bg-elevated px-4 py-3 text-left">
            <p className="text-[11px] tracking-[0.14em] text-fg-subtle uppercase">{t(lang, "搭配", "Collocation")}</p>
            <p className="mt-1.5 text-sm leading-relaxed">
              <RubyText text={current.example} show={showPinyin} />
            </p>
            {showPinyin ? <p className="mt-1 text-xs text-fg-muted">{sentencePinyin(current.example)}</p> : null}
            {current.exampleEn ? <p className="mt-1.5 text-sm text-fg-muted">{current.exampleEn}</p> : null}
          </div>
          <div className="flex items-center justify-end">
            <button
              type="button"
              className="h-11 shrink-0 rounded-xl bg-fg px-5 text-sm text-paper"
              onClick={() => {
                setPicked(null);
                setIdx((i) => i + 1);
              }}
            >
              {t(lang, "下一题", "Next")}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
