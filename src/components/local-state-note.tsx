import { t, useLang } from "@/lib/lang";

export function LocalStateNote({ compact }: { compact?: boolean }) {
  const { lang } = useLang();
  return (
    <p className={compact ? "text-xs text-fg-subtle" : "text-sm text-fg-muted"}>
      {t(
        lang,
        "未登录时，收藏、笔记和词汇状态只保存在当前浏览器配置文件里。共用同一配置文件的人会看到同一份记录。这不是学生账号隔离，登录也不代表已经跨设备同步。",
        "While signed out, saves, notes and vocab live only in this browser profile. Anyone using the same profile sees the same record. That is not per-student isolation, and signing in does not mean cloud sync.",
      )}
    </p>
  );
}
