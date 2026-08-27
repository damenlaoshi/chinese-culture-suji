import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AssistBar } from "@/components/assist-bar";
import { VocabChip } from "@/components/vocab-chip";
import { allEssentialWords } from "@/data/catalog";
import { THEMES } from "@/data/themes";
import type { ThemeId } from "@/data/types";
import { t, useLang } from "@/lib/lang";
import { pageHead } from "@/lib/page-head";
import { useReview, type VocabStatus } from "@/lib/review-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/vocab/")({
  component: VocabPage,
  head: () => pageHead("核心词汇"),
});

const RAW = allEssentialWords();
const BANK = RAW.map((w) => ({
  hanzi: w.hanzi,
  pinyin: w.pinyin,
  pos: "词",
  en: w.en,
  example: w.collocation,
  exampleEn: w.collocationEn,
  theme: w.theme,
  topicTitle: w.topicTitle,
}));

function VocabPage() {
  const { lang } = useLang();
  const vocab = useReview((s) => s.vocabulary_state);
  const [theme, setTheme] = useState<ThemeId | "all">("all");
  const [status, setStatus] = useState<VocabStatus | "all">("all");
  const [q, setQ] = useState("");
  const [visible, setVisible] = useState(24);

  const known = Object.values(vocab).filter((x) => x === "known").length;
  const learning = Object.values(vocab).filter((x) => x === "learning").length;

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    return BANK.filter((item) => {
      if (theme !== "all" && item.theme !== theme) return false;
      const st = vocab[item.hanzi] ?? "new";
      if (status !== "all" && st !== status) return false;
      if (!query) return true;
      return `${item.hanzi} ${item.pinyin} ${item.en} ${item.topicTitle}`.toLowerCase().includes(query);
    });
  }, [theme, status, q, vocab]);

  useEffect(() => {
    setVisible(24);
  }, [theme, status, q]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="type-kicker text-cinnabar">Studio</p>
          <h1 className="mt-2 font-display text-4xl">{t(lang, "核心词汇", "Essential words")}</h1>
          <p className="mt-3 text-fg-muted">
            {t(
              lang,
              `公共词库 ${BANK.length} · 在学 ${learning} · 已会 ${known}（每话题最多 5 个核心词）`,
              `${BANK.length} shared words · ${learning} learning · ${known} known (up to 5 per topic)`,
            )}
          </p>
        </div>
        <Link
          to="/vocab/quiz"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-cinnabar px-5 text-sm font-medium text-cinnabar-fg hover:bg-cinnabar-hover"
        >
          {t(lang, "开始测验", "Start a quiz")}
        </Link>
      </div>

      <div className="mt-6">
        <AssistBar />
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label={t(lang, "搜汉字、拼音、英文", "Search character, pinyin, English")}
          placeholder={t(lang, "搜汉字、拼音、英文", "Search character, pinyin, English")}
          className="h-11 w-full rounded-xl border border-border bg-bg-elevated px-4 text-sm outline-none ring-cinnabar/30 focus:ring-2 sm:max-w-sm"
        />
        <div className="flex flex-wrap gap-1.5">
          {(["all", "new", "learning", "known"] as const).map((s) => (
            <Chip key={s} active={status === s} onClick={() => setStatus(s)}>
              {s === "all"
                ? t(lang, "全部状态", "Any status")
                : s === "new"
                  ? t(lang, "未学", "New")
                  : s === "learning"
                    ? t(lang, "在学", "Learning")
                    : t(lang, "已会", "Known")}
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Chip active={theme === "all"} onClick={() => setTheme("all")}>
            {t(lang, "全部主题", "All themes")}
          </Chip>
          {THEMES.map((th) => (
            <Chip key={th.id} active={theme === th.id} onClick={() => setTheme(th.id)}>
              {lang === "zh" ? th.title : th.titleEn}
            </Chip>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-fg-muted">{t(lang, `${list.length} 个词`, `${list.length} words`)}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.slice(0, visible).map((item) => (
          <VocabChip key={`${item.theme}-${item.hanzi}`} item={item} />
        ))}
      </div>
      {visible < list.length ? (
        <button
          type="button"
          className="mt-6 h-11 rounded-xl border border-border px-4 text-sm"
          onClick={() => setVisible((n) => n + 24)}
        >
          {t(lang, "再显示一些", "Show more")}
        </button>
      ) : null}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "h-11 rounded-full px-3 text-xs font-medium",
        active ? "bg-fg text-paper" : "bg-stone text-fg-muted hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}
