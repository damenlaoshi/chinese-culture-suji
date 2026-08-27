import { useMemo } from "react";
import { tokenizePinyin } from "@/lib/pinyin";
import { cn } from "@/lib/utils";

export function RubyText({
  text,
  show,
  className,
}: {
  text: string;
  show: boolean;
  className?: string;
}) {
  const tokens = useMemo(() => (show ? tokenizePinyin(text) : null), [show, text]);

  if (!show || !tokens) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={cn("ruby-line", className)}>
      {tokens.map((tok, i) =>
        tok.pinyin ? (
          <ruby key={i}>
            {tok.origin}
            <rt>{tok.pinyin}</rt>
          </ruby>
        ) : (
          <span key={i}>{tok.origin}</span>
        ),
      )}
    </span>
  );
}
