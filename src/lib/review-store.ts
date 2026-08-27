import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NEW_KEY, OLD_KEY, clampNote, emptyPersist, migrateFromV1, pickPersistData, unwrapOld } from "@/lib/review-migrate";

export type VocabStatus = "new" | "learning" | "known";
export type ReviewStatus = "unrated" | "need_review" | "can_say";

export type TopicReview = {
  favorite: boolean;
  review_status: ReviewStatus;
  opened_once: boolean;
  last_opened_at: string | null;
  last_reviewed_at: string | null;
  review_count: number;
  one_line_note: string;
};

type DisplaySettings = {
  show_pinyin: boolean;
  show_english: boolean;
};

type PersistShape = {
  schema_version: 2;
  storage_scope: "browser_profile_local";
  contains_student_identity: false;
  topic_state: Record<string, TopicReview>;
  vocabulary_state: Record<string, VocabStatus>;
  display_settings: DisplaySettings;
  migration: { from_version: 1; completed: boolean };
};

type ReviewStore = PersistShape & {
  topicOf: (slug: string) => TopicReview;
  markOpened: (slug: string) => void;
  toggleFavorite: (slug: string) => void;
  setReviewStatus: (slug: string, status: ReviewStatus) => void;
  setNote: (slug: string, note: string) => void;
  setVocab: (hanzi: string, status: VocabStatus) => void;
  cycleVocab: (hanzi: string) => void;
  setPinyin: (on: boolean) => void;
  setEnglish: (on: boolean) => void;
  importState: (raw: unknown) => boolean;
  exportState: () => PersistShape;
  clearPersonal: () => void;
};

const EMPTY_TOPIC: TopicReview = {
  favorite: false,
  review_status: "unrated",
  opened_once: false,
  last_opened_at: null,
  last_reviewed_at: null,
  review_count: 0,
  one_line_note: "",
};

function readOld(): unknown {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(OLD_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    return unwrapOld(parsed);
  } catch {
    return null;
  }
}

function ensureTopic(map: Record<string, TopicReview>, slug: string): TopicReview {
  return map[slug] ?? EMPTY_TOPIC;
}

function asPersist(raw: unknown): PersistShape {
  return pickPersistData(raw) as PersistShape;
}

export const useReview = create<ReviewStore>()(
  persist(
    (set, get) => ({
      ...(emptyPersist() as unknown as PersistShape),
      topicOf: (slug) => ensureTopic(get().topic_state, slug),
      markOpened: (slug) =>
        set((s) => {
          const prev = ensureTopic(s.topic_state, slug);
          return {
            topic_state: {
              ...s.topic_state,
              [slug]: { ...prev, opened_once: true, last_opened_at: new Date().toISOString() },
            },
          };
        }),
      toggleFavorite: (slug) =>
        set((s) => {
          const prev = ensureTopic(s.topic_state, slug);
          return {
            topic_state: {
              ...s.topic_state,
              [slug]: { ...prev, favorite: !prev.favorite },
            },
          };
        }),
      setReviewStatus: (slug, status) =>
        set((s) => {
          const prev = ensureTopic(s.topic_state, slug);
          return {
            topic_state: {
              ...s.topic_state,
              [slug]: {
                ...prev,
                review_status: status,
                last_reviewed_at: new Date().toISOString(),
                review_count: prev.review_count + 1,
              },
            },
          };
        }),
      setNote: (slug, note) =>
        set((s) => {
          const prev = ensureTopic(s.topic_state, slug);
          return {
            topic_state: {
              ...s.topic_state,
              [slug]: { ...prev, one_line_note: clampNote(note) },
            },
          };
        }),
      setVocab: (hanzi, status) =>
        set((s) => ({ vocabulary_state: { ...s.vocabulary_state, [hanzi]: status } })),
      cycleVocab: (hanzi) => {
        const cur = get().vocabulary_state[hanzi] ?? "new";
        const next: VocabStatus = cur === "new" ? "learning" : cur === "learning" ? "known" : "new";
        set((s) => ({ vocabulary_state: { ...s.vocabulary_state, [hanzi]: next } }));
      },
      setPinyin: (on) => set((s) => ({ display_settings: { ...s.display_settings, show_pinyin: on } })),
      setEnglish: (on) => set((s) => ({ display_settings: { ...s.display_settings, show_english: on } })),
      importState: (raw) => {
        if (!raw || typeof raw !== "object") return false;
        const rec = raw as PersistShape;
        if (rec.schema_version !== 2) return false;
        set({
          topic_state: rec.topic_state ?? {},
          vocabulary_state: rec.vocabulary_state ?? {},
          display_settings: {
            show_pinyin: Boolean(rec.display_settings?.show_pinyin),
            show_english: Boolean(rec.display_settings?.show_english),
          },
          migration: { from_version: 1, completed: true },
        });
        return true;
      },
      exportState: () => asPersist(get()),
      clearPersonal: () =>
        set({
          topic_state: {},
          vocabulary_state: {},
          display_settings: { show_pinyin: false, show_english: false },
          migration: { from_version: 1, completed: true },
        }),
    }),
    {
      name: NEW_KEY,
      partialize: (s) => asPersist(s),
      merge: (persisted, current) => {
        const data = asPersist(persisted ?? current);
        const migrated = data.migration.completed ? data : migrateFromV1(readOld(), data);
        return { ...current, ...asPersist(migrated) };
      },
    },
  ),
);
