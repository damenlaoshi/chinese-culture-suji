import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { LocalStateNote } from "@/components/local-state-note";
import { TopicRow } from "@/components/topic-row";
import { CATALOG } from "@/data/catalog";
import { toast } from "sonner";
import { t, useLang } from "@/lib/lang";
import { pageHead } from "@/lib/page-head";
import { useReview } from "@/lib/review-store";
import { cn } from "@/lib/utils";

type Filter = "all" | "favorite" | "need_review" | "can_say" | "opened";

export const Route = createFileRoute("/review")({
  validateSearch: (s: Record<string, unknown>): { filter: Filter } => {
    const f = s.filter;
    if (f === "favorite" || f === "need_review" || f === "can_say" || f === "opened") return { filter: f };
    return { filter: "all" };
  },
  head: () => pageHead("我的复习"),
  component: ReviewPage,
});

function ReviewPage() {
  const { lang } = useLang();
  const { filter } = Route.useSearch();
  const topicState = useReview((s) => s.topic_state);
  const exportState = useReview((s) => s.exportState);
  const importState = useReview((s) => s.importState);
  const clearPersonal = useReview((s) => s.clearPersonal);
  const fileRef = useRef<HTMLInputElement>(null);

  const list = CATALOG.filter((t) => {
    const st = topicState[t.slug];
    if (filter === "favorite") return Boolean(st?.favorite);
    if (filter === "need_review") return st?.review_status === "need_review";
    if (filter === "can_say") return st?.review_status === "can_say";
    if (filter === "opened") return Boolean(st?.opened_once);
    return true;
  });

  const counts = {
    favorite: CATALOG.filter((t) => topicState[t.slug]?.favorite).length,
    need_review: CATALOG.filter((t) => topicState[t.slug]?.review_status === "need_review").length,
    can_say: CATALOG.filter((t) => topicState[t.slug]?.review_status === "can_say").length,
    opened: CATALOG.filter((t) => topicState[t.slug]?.opened_once).length,
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="type-kicker text-cinnabar">Review</p>
      <h1 className="mt-2 font-display text-4xl">{t(lang, "我的复习", "My review")}</h1>
      <div className="mt-3">
        <LocalStateNote />
      </div>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {(
          [
            ["all", t(lang, "全部文化点", "All points"), CATALOG.length],
            ["favorite", t(lang, "收藏", "Saved"), counts.favorite],
            ["need_review", t(lang, "需要复习", "Need review"), counts.need_review],
            ["can_say", t(lang, "我会说", "I can say"), counts.can_say],
            ["opened", t(lang, "打开过", "Opened"), counts.opened],
          ] as const
        ).map(([id, label, n]) => (
          <Link
            key={id}
            to="/review"
            search={{ filter: id }}
            className={cn(
              "inline-flex h-11 items-center rounded-full px-3 text-xs font-medium",
              filter === id ? "bg-fg text-paper" : "bg-stone text-fg-muted",
            )}
          >
            {label} {n}
          </Link>
        ))}
      </div>

      <p className="mt-4 text-xs text-fg-subtle">
        {t(
          lang,
          "「打开过」只说明这台浏览器打开过页面，不代表已经学会或复习过。",
          "“Opened” only means this browser opened the page — not that it was learned or reviewed.",
        )}
      </p>

      <div className="mt-6 grid gap-3">
        {list.length === 0 ? (
          <p className="text-sm text-fg-muted">
            {t(lang, "这一栏还是空的。", "Nothing in this filter yet.")}{" "}
            <Link to="/explore" className="text-cinnabar hover:underline">
              {t(lang, "去全部文化点", "Browse points")}
            </Link>
          </p>
        ) : (
          list.map((topic) => <TopicRow key={topic.slug} topic={topic} />)
        )}
      </div>

      <section className="mt-12 border-t border-border pt-8">
        <h2 className="font-display text-xl">{t(lang, "本机状态", "This-device state")}</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            className="inline-flex h-11 items-center rounded-xl border border-border px-4 text-sm"
            onClick={() => {
              const blob = new Blob([JSON.stringify(exportState(), null, 2)], { type: "application/json" });
              const a = document.createElement("a");
              a.href = URL.createObjectURL(blob);
              a.download = "chinese-culture-review-local.json";
              a.click();
              toast.success(t(lang, "已导出本机状态", "Local state exported"));
            }}
          >
            {t(lang, "导出本机状态", "Export local state")}
          </button>
          <button
            type="button"
            className="inline-flex h-11 items-center rounded-xl border border-border px-4 text-sm"
            onClick={() => fileRef.current?.click()}
          >
            {t(lang, "导入本机状态", "Import local state")}
          </button>
          <button
            type="button"
            className="inline-flex h-11 items-center rounded-xl border border-border px-4 text-sm text-cinnabar"
            onClick={() => {
              if (window.confirm(t(lang, "清除本机个人状态？公共文化点不会被删。", "Clear personal state on this device? Shared topics stay."))) {
                clearPersonal();
                toast.success(t(lang, "本机个人状态已清除", "Personal state on this device cleared"));
              }
            }}
          >
            {t(lang, "清除本机个人状态", "Clear personal state")}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              try {
                const text = await file.text();
                const ok = importState(JSON.parse(text));
                if (!ok) toast.error(t(lang, "无法导入这份文件。", "Could not import that file."));
                else toast.success(t(lang, "已导入本机状态", "Local state imported"));
              } catch {
                toast.error(t(lang, "无法导入这份文件。", "Could not import that file."));
              }
              e.target.value = "";
            }}
          />
        </div>
      </section>
    </div>
  );
}

