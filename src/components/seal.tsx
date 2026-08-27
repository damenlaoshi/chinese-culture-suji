import { cn } from "@/lib/utils";

export function Seal({
  className,
  title = "速",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 72 72"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <rect width="72" height="72" rx="6" fill="currentColor" />
      <rect
        x="5"
        y="5"
        width="62"
        height="62"
        rx="3"
        fill="none"
        stroke="var(--color-cinnabar-fg)"
        strokeWidth="1.4"
      />
      <text
        x="36"
        y="48"
        textAnchor="middle"
        fill="var(--color-cinnabar-fg)"
        fontFamily="var(--font-display)"
        fontSize="38"
        fontWeight="600"
      >
        {title}
      </text>
    </svg>
  );
}
