import { RubyText } from "@/components/ruby-text";
import { useReview } from "@/lib/review-store";
import { cn } from "@/lib/utils";

export function BriefZh({
  zh,
  en,
  className,
  zhClassName,
}: {
  zh: string;
  en?: string;
  className?: string;
  zhClassName?: string;
}) {
  const pinyin = useReview((s) => s.display_settings.show_pinyin);
  const english = useReview((s) => s.display_settings.show_english);
  return (
    <div className={className}>
      <p className={cn("leading-relaxed", zhClassName)}>
        <RubyText text={zh} show={pinyin} />
      </p>
      {english && en ? <p className="mt-1 text-sm leading-relaxed text-fg-muted">{en}</p> : null}
    </div>
  );
}
