import { Link } from "@tanstack/react-router";
import { UserRound } from "lucide-react";
import { authEnabled, signOut } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { t, useLang } from "@/lib/lang";

export function AuthSlot() {
  const { user, isPending } = useCurrentUserState();
  const { lang } = useLang();

  if (isPending) {
    return <div className="size-11 animate-pulse rounded-full bg-stone" />;
  }
  if (!user) {
    return (
      <Link
        to="/login"
        className="grid size-11 place-items-center rounded-lg text-current opacity-80 hover:bg-stone/40 hover:opacity-100"
        aria-label={t(lang, "登录", "Sign in")}
      >
        <UserRound className="size-4" />
      </Link>
    );
  }

  const label = user.displayName ?? user.primaryEmail ?? t(lang, "已登录", "Signed in");
  return (
    <div className="hidden items-center gap-2 sm:flex">
      {user.profileImageUrl ? (
        <img src={user.profileImageUrl} alt="" className="size-8 rounded-full object-cover" />
      ) : (
        <span className="grid size-8 place-items-center rounded-full bg-stone text-xs font-medium">
          {label.slice(0, 1).toUpperCase()}
        </span>
      )}
      {authEnabled ? (
        <button
          type="button"
          onClick={() => void signOut()}
          className="inline-flex h-11 items-center px-2 text-xs text-fg-muted hover:text-fg"
        >
          {t(lang, "退出", "Sign out")}
        </button>
      ) : null}
    </div>
  );
}
