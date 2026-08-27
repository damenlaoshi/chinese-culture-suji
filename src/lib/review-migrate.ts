export const NEW_KEY = "cculture_local_review_state_v2";
export const OLD_KEY = "wenyou-progress";
export const NOTE_MAX = 200;

export function emptyPersist() {
  return {
    schema_version: 2 as const,
    storage_scope: "browser_profile_local" as const,
    contains_student_identity: false as const,
    topic_state: {} as Record<string, unknown>,
    vocabulary_state: {} as Record<string, string>,
    display_settings: { show_pinyin: false, show_english: false },
    migration: { from_version: 1 as const, completed: false },
  };
}

function emptyTopic() {
  return {
    favorite: false,
    review_status: "unrated" as const,
    opened_once: false,
    last_opened_at: null as string | null,
    last_reviewed_at: null as string | null,
    review_count: 0,
    one_line_note: "",
  };
}

export function clampNote(raw: unknown) {
  return String(raw ?? "")
    .replace(/<[^>]*>/g, "")
    .slice(0, NOTE_MAX);
}

/** Zustand persist wraps as `{ state, version }`. Raw v1 objects pass through. */
export function unwrapOld(oldParsed: unknown) {
  if (!oldParsed || typeof oldParsed !== "object") return oldParsed;
  const rec = oldParsed as { state?: unknown; version?: unknown; schema_version?: unknown; favorites?: unknown };
  if (
    rec.state &&
    typeof rec.state === "object" &&
    rec.version !== undefined &&
    rec.schema_version == null &&
    rec.favorites == null
  ) {
    return rec.state;
  }
  return rec;
}

/** Data fields only — never clone actions. structuredClone of a live store throws DataCloneError. */
export function pickPersistData(raw: unknown): ReturnType<typeof emptyPersist> {
  const fallback = emptyPersist();
  if (!raw || typeof raw !== "object") return fallback;
  const rec = raw as Record<string, unknown>;
  if (rec.schema_version !== 2) return fallback;
  const topic =
    rec.topic_state && typeof rec.topic_state === "object" && !Array.isArray(rec.topic_state)
      ? rec.topic_state
      : {};
  const vocab =
    rec.vocabulary_state && typeof rec.vocabulary_state === "object" && !Array.isArray(rec.vocabulary_state)
      ? rec.vocabulary_state
      : {};
  const display =
    rec.display_settings && typeof rec.display_settings === "object"
      ? (rec.display_settings as Record<string, unknown>)
      : {};
  const migration =
    rec.migration && typeof rec.migration === "object" ? (rec.migration as Record<string, unknown>) : {};
  const picked = {
    schema_version: 2 as const,
    storage_scope: "browser_profile_local" as const,
    contains_student_identity: false as const,
    topic_state: topic,
    vocabulary_state: vocab as Record<string, string>,
    display_settings: {
      show_pinyin: Boolean(display.show_pinyin),
      show_english: Boolean(display.show_english),
    },
    migration: {
      from_version: 1 as const,
      completed: Boolean(migration.completed),
    },
  };
  try {
    return JSON.parse(JSON.stringify(picked)) as ReturnType<typeof emptyPersist>;
  } catch {
    return fallback;
  }
}

export function migrateFromV1(oldParsed: unknown, existingV2: Record<string, unknown> | null) {
  const base = pickPersistData(existingV2);
  const unwrapped = unwrapOld(oldParsed);
  if (!unwrapped || typeof unwrapped !== "object") {
    return { ...base, migration: { from_version: 1 as const, completed: true } };
  }
  const old = unwrapped as {
    favorites?: unknown;
    visited?: unknown;
    vocab?: unknown;
  };
  const favorites = Array.isArray(old.favorites) ? old.favorites.filter((x) => typeof x === "string") : [];
  const visited = Array.isArray(old.visited) ? old.visited.filter((x) => typeof x === "string") : [];
  const vocab = old.vocab && typeof old.vocab === "object" ? (old.vocab as Record<string, string>) : {};

  const topic_state = { ...((base.topic_state as Record<string, ReturnType<typeof emptyTopic>>) || {}) };
  for (const slug of new Set([...favorites, ...visited, ...Object.keys(topic_state)])) {
    const prev = topic_state[slug] || emptyTopic();
    topic_state[slug] = {
      ...emptyTopic(),
      ...prev,
      favorite: prev.favorite || favorites.includes(slug),
      opened_once: prev.opened_once || visited.includes(slug),
      last_opened_at: prev.last_opened_at ?? null,
    };
  }

  const vocabulary_state = { ...((base.vocabulary_state as Record<string, string>) || {}) };
  for (const [hanzi, status] of Object.entries(vocab)) {
    if (vocabulary_state[hanzi]) continue;
    if (status === "new" || status === "learning" || status === "known") {
      vocabulary_state[hanzi] = status;
    }
  }

  return {
    ...base,
    topic_state,
    vocabulary_state,
    display_settings: {
      show_pinyin: Boolean((base.display_settings as { show_pinyin?: boolean } | undefined)?.show_pinyin),
      show_english: Boolean((base.display_settings as { show_english?: boolean } | undefined)?.show_english),
    },
    migration: { from_version: 1 as const, completed: true },
  };
}
