import { Link } from "@tanstack/react-router";
import type { TopicBrief } from "@/data/catalog-types";
import { t, useLang } from "@/lib/lang";
import { useReview } from "@/lib/review-store";
import { cn } from "@/lib/utils";

export function TopicRow({ topic }: { topic: TopicBrief }) {
  const { lang } = useLang();
  const state = useReview((s) => s.topic_state[topic.slug]);
  const english = useReview((s) => s.display_settings.show_english);
  const title = lang === "zh" ? topic.titleZh : topic.titleEn;
  const core = english || lang === "en" ? topic.oneLineCore.en : topic.oneLineCore.zh;

  return (
    <Link
      to="/topic/$slug"
      params={{ slug: topic.slug }}
      className="group flex min-h-16 items-stretch overflow-hidden rounded-lg bg-bg-elevated shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]"
    >
      <img
        src={topic.image}
        alt={topic.imageAlt}
        className="h-20 w-[4.75rem] shrink-0 object-cover sm:h-24 sm:w-28"
        loading="lazy"
      />
      <div className="flex min-w-0 flex-1 flex-col justify-center px-3 py-2 sm:px-4">
        <p className="type-kicker text-fg-subtle">{topic.ibLens}</p>
        <h3 className="font-display text-lg leading-tight">{title}</h3>
        <p className="mt-0.5 line-clamp-2 text-sm text-fg-muted">{core}</p>
      </div>
      {state?.favorite ? (
        <span className="sr-only">{t(lang, "已收藏", "Saved")}</span>
      ) : null}
      {state?.review_status && state.review_status !== "unrated" ? (
        <span
          className={cn(
            "m-2 self-start rounded-full px-2.5 py-1 text-kicker font-medium",
            state.review_status === "can_say" ? "bg-success/15 text-success" : "bg-warn/15 text-warn",
          )}
        >
          {state.review_status === "can_say" ? t(lang, "会说", "Can say") : t(lang, "待复习", "Review")}
        </span>
      ) : null}
    </Link>
  );
}
