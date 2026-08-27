import assert from "node:assert/strict";
import { test } from "node:test";
import { clampNote, emptyPersist, migrateFromV1, pickPersistData, unwrapOld } from "./review-migrate.mjs";

function fav(slug) {
  return migrateFromV1({ favorites: [slug], visited: [], vocab: {} }, null).topic_state[slug];
}

test("emptyPersist flags: local browser, no identity, assists off, not yet migrated", () => {
  const e = emptyPersist();
  assert.equal(e.schema_version, 2);
  assert.equal(e.storage_scope, "browser_profile_local");
  assert.equal(e.contains_student_identity, false);
  assert.equal(e.display_settings.show_pinyin, false);
  assert.equal(e.display_settings.show_english, false);
  assert.equal(e.migration.completed, false);
  assert.equal(e.migration.from_version, 1);
  assert.deepEqual(e.topic_state, {});
  assert.deepEqual(e.vocabulary_state, {});
});

test("empty old state still completes migration", () => {
  const out = migrateFromV1(null, null);
  assert.equal(out.migration.completed, true);
  assert.deepEqual(out.topic_state, {});
  assert.equal(out.contains_student_identity, false);
});

test("favorites only → favorite true, not can_say, no invented timestamp", () => {
  const out = migrateFromV1({ favorites: ["xiao-dao"], visited: [], vocab: {} }, null);
  const t = out.topic_state["xiao-dao"];
  assert.equal(t.favorite, true);
  assert.equal(t.opened_once, false);
  assert.equal(t.review_status, "unrated");
  assert.equal(t.last_opened_at, null);
  assert.equal(t.last_reviewed_at, null);
  assert.equal(t.review_count, 0);
  assert.equal(t.one_line_note, "");
});

test("visited does not become can_say or reviewed", () => {
  const out = migrateFromV1({ favorites: [], visited: ["chunjie"], vocab: {} }, null);
  const t = out.topic_state["chunjie"];
  assert.equal(t.opened_once, true);
  assert.equal(t.favorite, false);
  assert.equal(t.review_status, "unrated");
  assert.equal(t.last_opened_at, null);
  assert.equal(t.last_reviewed_at, null);
});

test("overlap: favorite + visited on same slug", () => {
  const out = migrateFromV1({ favorites: ["shequ"], visited: ["shequ", "laji"], vocab: {} }, null);
  assert.equal(out.topic_state.shequ.favorite, true);
  assert.equal(out.topic_state.shequ.opened_once, true);
  assert.equal(out.topic_state.shequ.review_status, "unrated");
  assert.equal(out.topic_state.laji.favorite, false);
  assert.equal(out.topic_state.laji.opened_once, true);
});

test("vocab kept when status is stable", () => {
  const out = migrateFromV1(
    { favorites: [], visited: [], vocab: { 孝道: "known", 面子: "learning", 垃圾: "new", 坏: "nope" } },
    null,
  );
  assert.equal(out.vocabulary_state["孝道"], "known");
  assert.equal(out.vocabulary_state["面子"], "learning");
  assert.equal(out.vocabulary_state["垃圾"], "new");
  assert.equal(out.vocabulary_state["坏"], undefined);
});

test("unknown old slug is kept in topic_state without crashing", () => {
  const out = migrateFromV1({ favorites: ["not-a-live-slug"], visited: ["also-missing"], vocab: {} }, null);
  assert.equal(out.topic_state["not-a-live-slug"].favorite, true);
  assert.equal(out.topic_state["also-missing"].opened_once, true);
});

test("corrupt non-object does not throw and does not invent topics", () => {
  for (const bad of [undefined, null, 3, "nope", true, []]) {
    const out = migrateFromV1(bad, null);
    assert.equal(out.migration.completed, true);
    assert.deepEqual(out.topic_state, {});
  }
});

test("idempotent: v2 notes and review_status win on re-run", () => {
  const first = migrateFromV1({ favorites: ["xiao-dao"], visited: ["chunjie"], vocab: { 孝道: "learning" } }, null);
  first.topic_state["xiao-dao"].one_line_note = "keep me";
  first.topic_state["xiao-dao"].review_status = "can_say";
  first.topic_state["xiao-dao"].review_count = 2;
  first.vocabulary_state["孝道"] = "known";
  const second = migrateFromV1({ favorites: ["xiao-dao", "mianzi"], visited: ["chunjie"], vocab: { 孝道: "new" } }, first);
  assert.equal(second.topic_state["xiao-dao"].one_line_note, "keep me");
  assert.equal(second.topic_state["xiao-dao"].review_status, "can_say");
  assert.equal(second.topic_state["xiao-dao"].review_count, 2);
  assert.equal(second.topic_state["xiao-dao"].favorite, true);
  assert.equal(second.topic_state["mianzi"].favorite, true);
  assert.equal(second.vocabulary_state["孝道"], "known");
});

test("clampNote strips tags and caps at 200", () => {
  assert.equal(clampNote("<b>hi</b>"), "hi");
  assert.equal(clampNote("a".repeat(250)).length, 200);
  assert.equal(clampNote(null), "");
});

test("unwrapOld unwraps zustand {state, version} wrapper", () => {
  const wrapped = { state: { favorites: ["xiao-dao"], visited: ["chunjie"], vocab: {} }, version: 0 };
  assert.deepEqual(unwrapOld(wrapped), wrapped.state);
  const raw = { favorites: ["mianzi"], visited: [], vocab: {} };
  assert.equal(unwrapOld(raw), raw);
});

test("zustand persist wrapper is unwrapped inside migrateFromV1", () => {
  const wrapped = { state: { favorites: ["xiao-dao"], visited: ["chunjie"], vocab: { 孝道: "known" } }, version: 0 };
  const out = migrateFromV1(wrapped, null);
  assert.equal(out.topic_state["xiao-dao"].favorite, true);
  assert.equal(out.topic_state["chunjie"].opened_once, true);
  assert.equal(out.topic_state["chunjie"].review_status, "unrated");
  assert.equal(out.vocabulary_state["孝道"], "known");
});

test("helper: favorites produce a topic row", () => {
  assert.equal(fav("hanzi").favorite, true);
});

test("live zustand store with actions does not throw; v2 favorites survive", () => {
  const live = {
    ...emptyPersist(),
    topic_state: {
      "xiao-dao": {
        favorite: true,
        review_status: "can_say",
        opened_once: true,
        last_opened_at: "2026-08-23T00:00:00.000Z",
        last_reviewed_at: "2026-08-23T00:00:00.000Z",
        review_count: 1,
        one_line_note: "",
      },
    },
    toggleFavorite() {},
    markOpened() {},
  };
  assert.throws(() => structuredClone(live), { name: "DataCloneError" });
  const stripped = pickPersistData(live);
  assert.equal(stripped.toggleFavorite, undefined);
  const out = migrateFromV1(null, live);
  assert.equal(out.migration.completed, true);
  assert.equal(out.topic_state["xiao-dao"].favorite, true);
  assert.equal(out.topic_state["xiao-dao"].review_status, "can_say");
  assert.equal(out.toggleFavorite, undefined);
});
