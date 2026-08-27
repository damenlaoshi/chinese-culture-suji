import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "zh" | "en";

type LangContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const LangContext = createContext<LangContextValue | null>(null);
const LANG_KEY = "cculture-lang";
const LANG_KEY_OLD = "wenyou-lang";

function persist(next: Lang) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LANG_KEY, next);
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("zh");

  useEffect(() => {
    const stored = window.localStorage.getItem(LANG_KEY) ?? window.localStorage.getItem(LANG_KEY_OLD);
    if (stored === "en") setLangState("en");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      setLang: (l) => {
        setLangState(l);
        persist(l);
      },
      toggle: () => {
        setLangState((prev) => {
          const next = prev === "zh" ? "en" : "zh";
          persist(next);
          return next;
        });
      },
    }),
    [lang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}

export function t(lang: Lang, zh: string, en: string) {
  return lang === "zh" ? zh : en;
}