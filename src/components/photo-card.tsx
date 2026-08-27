import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type PhotoTo = "/theme/$themeId" | "/topic/$slug";

export function PhotoCard({
  to,
  params,
  image,
  alt,
  kicker,
  title,
  subtitle,
  className,
  tall,
}: {
  to: PhotoTo;
  params: { themeId: string } | { slug: string };
  image: string;
  alt: string;
  kicker?: string;
  title: string;
  subtitle?: string;
  className?: string;
  tall?: boolean;
}) {
  return (
    <Link
      to={to}
      params={params as never}
      className={cn(
        "group relative block overflow-hidden rounded-lg bg-stone shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-lift)]",
        tall ? "min-h-80 sm:min-h-[28rem]" : "min-h-64",
        className,
      )}
    >
      <img
        src={image}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-ink/85 via-bg-ink/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        {kicker ? <p className="type-kicker mb-1 text-paper/70">{kicker}</p> : null}
        <h3 className="font-display text-xl text-paper sm:text-2xl">{title}</h3>
        {subtitle ? <p className="mt-1 line-clamp-2 text-sm text-paper/80">{subtitle}</p> : null}
      </div>
    </Link>
  );
}
