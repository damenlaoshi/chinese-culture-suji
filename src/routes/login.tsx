import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { Seal } from "@/components/seal";
import { t, useLang } from "@/lib/lang";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => pageHead("登录"),
});

function Login() {
  const { lang } = useLang();
  return (
    <div className="relative min-h-[80dvh] overflow-hidden">
      <img
        src="/images/themes/identities.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-bg-ink/55" />
      <div className="relative mx-auto flex min-h-[80dvh] max-w-md flex-col justify-center px-4 py-16">
        <div className="rounded-xl bg-bg/95 p-6 shadow-[var(--shadow-lift)] sm:p-8">
          <Seal className="size-8 text-cinnabar" />
          <p className="type-kicker mt-4 text-fg-subtle">中国文化速记</p>
          <h1 className="mt-2 font-display text-3xl">{t(lang, "登录", "Sign in")}</h1>
          <p className="mt-2 text-sm text-fg-muted">
            {t(
              lang,
              "未登录也能看完全部 41 个文化点。登录不会自动同步收藏和笔记，也不等于按学生账号隔离。",
              "All 41 points are visible without signing in. Sign-in does not sync saves and notes, and is not per-student isolation.",
            )}
          </p>
          <div className="mt-6 space-y-2">
            {authEnabled ? (
              GROK_PROVIDERS.map((p) => (
                <button
                  key={p.providerId}
                  type="button"
                  onClick={() => signIn(p.providerId, { callbackURL: "/" })}
                  className="h-12 w-full rounded-lg border border-border bg-bg-elevated text-sm font-medium hover:bg-stone"
                >
                  {t(lang, `使用 ${p.label} 继续`, `Continue with ${p.label}`)}
                </button>
              ))
            ) : (
              <p className="text-sm text-fg-muted">{t(lang, "登录未开启。", "Sign-in is disabled.")}</p>
            )}
          </div>
          <Link to="/" className="mt-6 inline-block text-sm text-cinnabar hover:underline">
            {t(lang, "先去练习", "Start practising")}
          </Link>
        </div>
      </div>
    </div>
  );
}
