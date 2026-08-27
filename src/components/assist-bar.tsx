import { useReview } from "@/lib/review-store";
import { t, useLang } from "@/lib/lang";
import { cn } from "@/lib/utils";

export function AssistBar() {
  const { lang } = useLang();
  const pinyin = useReview((s) => s.display_settings.show_pinyin);
  const english = useReview((s) => s.display_settings.show_english);
  const setPinyin = useReview((s) => s.setPinyin);
  const setEnglish = useReview((s) => s.setEnglish);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle on={pinyin} onClick={() => setPinyin(!pinyin)}>
        {pinyin ? t(lang, "拼音开", "Pinyin on") : t(lang, "拼音关", "Pinyin off")}
      </Toggle>
      <Toggle on={english} onClick={() => setEnglish(!english)}>
        {english ? t(lang, "英文开", "English on") : t(lang, "英文关", "English off")}
      </Toggle>
    </div>
  );
}

function Toggle({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={cn(
        "inline-flex h-11 items-center rounded-md px-4 text-xs font-medium",
        on ? "bg-fg text-paper" : "bg-stone text-fg-muted",
      )}
    >
      {children}
    </button>
  );
}
