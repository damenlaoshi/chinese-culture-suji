export const NEW_KEY: string;
export const OLD_KEY: string;
export const NOTE_MAX: number;
export function emptyPersist(): {
  schema_version: 2;
  storage_scope: "browser_profile_local";
  contains_student_identity: false;
  topic_state: Record<string, unknown>;
  vocabulary_state: Record<string, string>;
  display_settings: { show_pinyin: boolean; show_english: boolean };
  migration: { from_version: 1; completed: boolean };
};
export function clampNote(raw: unknown): string;
export function unwrapOld(oldParsed: unknown): unknown;
export function pickPersistData(raw: unknown): ReturnType<typeof emptyPersist>;
export function migrateFromV1(oldParsed: unknown, existingV2: object | null): ReturnType<typeof emptyPersist>;
