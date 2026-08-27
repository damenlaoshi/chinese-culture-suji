import { chromium } from "playwright";

const BASE = "http://127.0.0.1:8080";

const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const errors = [];
const notes = [];

async function shot(page, name) {
  await page.screenshot({ path: `/workspace/screenshots/${name}.png`, fullPage: false });
}

try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  page.on("pageerror", (err) => errors.push(String(err)));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });

  await page.goto(`${BASE}/`, { waitUntil: "networkidle", timeout: 45000 });
  const homeText = await page.locator("body").innerText();
  if (!homeText.includes("中国文化速记")) throw new Error("home missing brand");
  if (!homeText.includes("41")) throw new Error("home missing 41");
  if (homeText.includes("已走访") || homeText.includes("文游中国")) throw new Error("old brand on home");
  await shot(page, "home");

  await page.goto(`${BASE}/explore`, { waitUntil: "networkidle" });
  const exploreCount = await page.locator('a[href^="/topic/"]').count();
  notes.push(`explore topic links: ${exploreCount}`);
  if (exploreCount < 41) throw new Error(`explore has ${exploreCount} topic links`);
  await shot(page, "explore");

  await page.goto(`${BASE}/themes`, { waitUntil: "networkidle" });
  if (!(await page.locator("body").innerText()).includes("五大主题")) throw new Error("themes heading");
  await shot(page, "themes");

  await page.goto(`${BASE}/topic/xiao-dao`, { waitUntil: "networkidle" });
  const topicText = await page.locator("body").innerText();
  if (!topicText.includes("先照顾家庭关系")) throw new Error("xiao-dao core missing");
  if (!topicText.includes("开始口语")) throw new Error("start oral missing");
  const ruby = await page.locator("rt").count();
  notes.push(`xiao-dao ruby rt count (expect 0): ${ruby}`);
  if (ruby > 0) throw new Error("pinyin should be off by default");
  await shot(page, "xiao-dao");

  await page.goto(`${BASE}/topic/shequ?tab=oral`, { waitUntil: "networkidle" });
  const before = await page.locator("body").innerText();
  if (before.includes("黄昏，天还没全黑")) throw new Error("cues visible before click");
  if (!before.includes("我已经回答")) throw new Error("cue button missing");
  await page.getByRole("button", { name: /我已经回答/ }).first().click();
  const after = await page.locator("body").innerText();
  if (!after.includes("黄昏") && !after.includes("广场")) throw new Error("cues did not open");
  await shot(page, "shequ-oral");

  await page.goto(`${BASE}/oral?slug=xiao-dao`, { waitUntil: "networkidle" });
  const oralText = await page.locator("body").innerText();
  if (!oralText.includes("三轮口语")) throw new Error("oral heading");
  if (!oralText.includes("第一轮")) throw new Error("round 1 missing");
  await shot(page, "oral");

  await page.goto(`${BASE}/review`, { waitUntil: "networkidle" });
  const reviewText = await page.locator("body").innerText();
  if (!reviewText.includes("浏览器配置文件")) throw new Error("local state note missing");
  if (!reviewText.includes("打开过")) throw new Error("opened filter missing");
  await shot(page, "review");

  await page.goto(`${BASE}/vocab`, { waitUntil: "networkidle" });
  if (!(await page.locator("body").innerText()).includes("核心词汇")) throw new Error("vocab heading");
  await shot(page, "vocab");

  const fav = await page.goto(`${BASE}/favorites`, { waitUntil: "networkidle" });
  notes.push(`favorites url: ${page.url()} status=${fav?.status()}`);
  if (!page.url().includes("/review")) throw new Error("favorites did not land on review");

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  mobile.on("pageerror", (err) => errors.push("mobile " + String(err)));
  await mobile.goto(`${BASE}/`, { waitUntil: "networkidle" });
  const overflowHome = await mobile.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  await mobile.screenshot({ path: "/workspace/screenshots/mobile-home.png" });
  await mobile.goto(`${BASE}/topic/xiao-dao`, { waitUntil: "networkidle" });
  const overflowTopic = await mobile.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  await mobile.screenshot({ path: "/workspace/screenshots/mobile-topic.png" });
  notes.push(`overflow home=${overflowHome} topic=${overflowTopic}`);
  if (overflowHome > 1 || overflowTopic > 1) throw new Error(`horizontal overflow ${overflowHome}/${overflowTopic}`);

  const tap = await mobile.evaluate(() => {
    const btns = [...document.querySelectorAll("a, button")].slice(0, 12);
    return btns.map((el) => {
      const r = el.getBoundingClientRect();
      return { h: Math.round(r.height), t: (el.textContent || "").trim().slice(0, 20) };
    });
  });
  notes.push({ tap });

  console.log(JSON.stringify({ ok: true, notes, errors }, null, 2));
  if (errors.length) process.exit(2);
} catch (err) {
  console.error(JSON.stringify({ ok: false, error: String(err?.message || err), notes, errors }, null, 2));
  process.exit(1);
} finally {
  await browser.close();
}
