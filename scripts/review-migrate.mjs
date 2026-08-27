/** Pure migration from wenyou-progress v1 → cculture_local_review_state_v2. */

export const NEW_KEY = "cculture_local_review_state_v2";
export const OLD_KEY = "wenyou-progress";
export const NOTE_MAX = 200;

export function emptyPersist() {
  return {
    schema_version: 2,
    storage_scope: "browser_profile_local",
    contains_student_identity: false,
    topic_state: {},
    vocabulary_state: {},
    display_settings: { show_pinyin: false, show_english: false },
    migration: { from_version: 1, completed: false },
  };
}

function emptyTopic() {
  return {
    favorite: false,
    review_status: "unrated",
    opened_once: false,
    last_opened_at: null,
    last_reviewed_at: null,
    review_count: 0,
    one_line_note: "",
  };
}

export function clampNote(raw) {
  const s = String(raw ?? "")
    .replace(/<[^>]*>/g, "")
    .slice(0, NOTE_MAX);
  return s;
}

/** Zustand persist wraps as `{ state, version }`. Raw v1 objects pass through. */
export function unwrapOld(oldParsed) {
  if (!oldParsed || typeof oldParsed !== "object") return oldParsed;
  const rec = oldParsed;
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
export function pickPersistData(raw) {
  const fallback = emptyPersist();
  if (!raw || typeof raw !== "object") return fallback;
  if (raw.schema_version !== 2) return fallback;
  const topic = raw.topic_state && typeof raw.topic_state === "object" && !Array.isArray(raw.topic_state) ? raw.topic_state : {};
  const vocab =
    raw.vocabulary_state && typeof raw.vocabulary_state === "object" && !Array.isArray(raw.vocabulary_state)
      ? raw.vocabulary_state
      : {};
  const display = raw.display_settings && typeof raw.display_settings === "object" ? raw.display_settings : {};
  const migration = raw.migration && typeof raw.migration === "object" ? raw.migration : {};
  const picked = {
    schema_version: 2,
    storage_scope: "browser_profile_local",
    contains_student_identity: false,
    topic_state: topic,
    vocabulary_state: vocab,
    display_settings: {
      show_pinyin: Boolean(display.show_pinyin),
      show_english: Boolean(display.show_english),
    },
    migration: {
      from_version: 1,
      completed: Boolean(migration.completed),
    },
  };
  try {
    return JSON.parse(JSON.stringify(picked));
  } catch {
    return fallback;
  }
}

/**
 * @param {unknown} oldParsed
 * @param {object | null} existingV2
 */
export function migrateFromV1(oldParsed, existingV2) {
  const base = pickPersistData(existingV2);
  const unwrapped = unwrapOld(oldParsed);
  if (!unwrapped || typeof unwrapped !== "object") {
    base.migration = { from_version: 1, completed: true };
    return base;
  }
  const old = unwrapped;
  const favorites = Array.isArray(old.favorites) ? old.favorites.filter((x) => typeof x === "string") : [];
  const visited = Array.isArray(old.visited) ? old.visited.filter((x) => typeof x === "string") : [];
  const vocab = old.vocab && typeof old.vocab === "object" ? old.vocab : {};

  const topic_state = { ...(base.topic_state || {}) };
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

  const vocabulary_state = { ...(base.vocabulary_state || {}) };
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
      show_pinyin: Boolean(base.display_settings?.show_pinyin),
      show_english: Boolean(base.display_settings?.show_english),
    },
    migration: { from_version: 1, completed: true },
  };
}
