import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const MANIFEST = [
  ["identities", "xiao-dao"],
  ["identities", "mianzi"],
  ["identities", "jiti"],
  ["identities", "shengxiao"],
  ["identities", "qiming"],
  ["identities", "fangyan"],
  ["identities", "fushi"],
  ["identities", "long-de-chuanren"],
  ["identities", "zhongyi-shenti"],
  ["experiences", "chunjie"],
  ["experiences", "jieri"],
  ["experiences", "rensheng"],
  ["experiences", "daike"],
  ["experiences", "chadao"],
  ["experiences", "jiuculture"],
  ["experiences", "yinshi"],
  ["experiences", "mingsheng"],
  ["experiences", "chunyun"],
  ["ingenuity", "sida-faming"],
  ["ingenuity", "hanzi"],
  ["ingenuity", "chuantong-yishu"],
  ["ingenuity", "yidong-zhifu"],
  ["ingenuity", "zhibo"],
  ["ingenuity", "shejiao"],
  ["ingenuity", "gaotie"],
  ["ingenuity", "waimai"],
  ["society", "gaokao"],
  ["society", "wangzi"],
  ["society", "jiating"],
  ["society", "neijuan"],
  ["society", "shequ"],
  ["society", "yanglao"],
  ["society", "renqing"],
  ["society", "hukou"],
  ["planet", "laji"],
  ["planet", "gongxiang"],
  ["planet", "tianren"],
  ["planet", "xiongmao"],
  ["planet", "jieqi"],
  ["planet", "xiangcun"],
  ["planet", "chuantong-xiandai"],
];

const FORBIDDEN_KEYS = [
  "teacher_answer",
  "model_answer_full",
  "model_answer",
  "scoring_rubric",
  "student_name",
  "student_feedback",
  "transcript",
  "recording",
  "teacher_notes",
  "class_date",
  "private_reference",
];

const HAN = /[\u4e00-\u9fff]/g;
const hanCount = (s) => (String(s).match(HAN) || []).length;

const briefs = JSON.parse(readFileSync(new URL("../src/data/briefs.json", import.meta.url), "utf8"));

test("exactly 41 public topics matching live manifest slugs and themes", () => {
  assert.equal(briefs.length, 41);
  const bySlug = Object.fromEntries(briefs.map((t) => [t.slug, t]));
  for (const [theme, slug] of MANIFEST) {
    assert.equal(bySlug[slug]?.theme, theme, slug);
  }
  const counts = {};
  for (const t of briefs) counts[t.theme] = (counts[t.theme] || 0) + 1;
  assert.deepEqual(counts, { identities: 9, experiences: 9, ingenuity: 8, society: 8, planet: 7 });
});

test("each topic has core, 4–6 bullets, 4–6 words, 3 oral rounds, 3–5 cues", () => {
  for (const t of briefs) {
    assert.ok(hanCount(t.oneLineCore.zh) <= 25, `${t.slug} core`);
    assert.ok(t.memoryPoints.length >= 4 && t.memoryPoints.length <= 6, t.slug);
    for (const p of t.memoryPoints) {
      assert.ok(hanCount(p.zh) <= 28, `${t.slug} ${p.zh}`);
    }
    assert.ok(t.essentialLanguage.length >= 4 && t.essentialLanguage.length <= 6, t.slug);
    assert.ok(t.imageEvidence.length <= 4, t.slug);
    assert.ok(t.oralRound1.length >= 1, t.slug);
    assert.ok(t.oralRound2.length >= 1, t.slug);
    assert.ok(t.oralRound3.length >= 1, t.slug);
    for (const item of [...t.oralRound1, ...t.oralRound2, ...t.oralRound3]) {
      assert.ok(item.cues.length >= 3 && item.cues.length <= 5, `${t.slug} ${item.zh}`);
    }
    assert.equal(t.contentStatus, "approved");
    assert.equal(t.publicStatus, "approved");
    assert.equal(t.rightsStatus, "cleared");
  }
});

test("public schema has no teacher/student private fields", () => {
  for (const t of briefs) {
    for (const k of FORBIDDEN_KEYS) {
      assert.equal(Object.hasOwn(t, k), false, k);
    }
  }
});

test("no absolute “all Chinese people” claims in visible briefs", () => {
  const blob = JSON.stringify(briefs);
  assert.equal(blob.includes("所有中国人都"), false);
});

test("time-sensitive year appears in visible copy when set", () => {
  for (const t of briefs) {
    if (!t.timeSensitiveYear) continue;
    const visible = [t.oneLineCore.zh, t.expressionCaution.zh, ...t.memoryPoints.map((p) => p.zh)].join("");
    assert.ok(visible.includes(String(t.timeSensitiveYear)), t.slug);
  }
});

test("each topic has a short Spain / Southern Europe compare anchor", () => {
  let spainish = 0;
  for (const t of briefs) {
    assert.ok(t.compareAnchor?.zh, t.slug);
    assert.ok(t.compareAnchor?.en, t.slug);
    assert.ok(hanCount(t.compareAnchor.zh) <= 40, `${t.slug} ${t.compareAnchor.zh}`);
    const blob = `${t.compareAnchor.zh} ${t.compareAnchor.en}`;
    if (/西班牙|南欧|Spain|Southern Europe|AVE|Bizum|BiciMAD|Bicing|Andalus|Mediterranean|Instagram/.test(blob)) {
      spainish += 1;
    }
  }
  assert.ok(spainish >= 35, `compare anchors with Spain/S.Europe markers: ${spainish}`);
});
