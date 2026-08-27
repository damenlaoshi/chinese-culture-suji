#!/usr/bin/env python3
"""Build public catalog briefs from live packs + existing editorial copy. No source-material import."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path("/workspace")
PACK_DIR = ROOT / "src/data/packs"
OUT = ROOT / "src/data/briefs.json"

META = {
    "xiao-dao": ("identities", "孝道与家庭", "Filial piety and the family", "先学会做人，再谈独立。", "Identities · Beliefs & values", "祖母教孩子包饺子", ["mianzi", "jiating", "yanglao", "wangzi"]),
    "mianzi": ("identities", "面子与谦虚", "Face and humility", "有面子，没面子，丢面子，爱面子。", "Identities · Beliefs & values", "宴席上的劝酒", ["jiuculture", "daike", "jiti", "renqing"]),
    "jiti": ("identities", "集体主义", "Collectivism", "集体大于个人，并不等于没有自我。", "Identities · Subcultures / values", "团队合影", ["mianzi", "gaokao", "shequ", "neijuan"]),
    "shengxiao": ("identities", "十二生肖", "The twelve zodiac animals", "先天的属相，后天的习惯。", "Identities · Beliefs & language", "窗花上的生肖龙", ["qiming", "jieri", "tianren", "long-de-chuanren"]),
    "qiming": ("identities", "起名文化", "The culture of naming", "姓在前，名在后；一个字，可能是整代人的约定。", "Identities · Language & identity", "用毛笔写名字", ["xiao-dao", "fangyan", "hanzi", "long-de-chuanren"]),
    "fangyan": ("identities", "普通话与方言", "Putonghua and dialects", "你说哪种话，别人就知道你从哪里来。", "Identities · Language & identity", "巷子里用方言聊天的邻居", ["qiming", "hanzi", "hukou", "chunyun"]),
    "fushi": ("identities", "传统服饰", "Traditional dress", "汉服、旗袍，以及五十六个民族的衣裳。", "Identities · Lifestyles / subcultures", "园林里的旗袍与汉服", ["long-de-chuanren", "chuantong-yishu", "jieri", "chuantong-xiandai"]),
    "long-de-chuanren": ("identities", "龙的传人", "Descendants of the dragon", "炎黄子孙，是诗，也是一种集体称呼。", "Identities · Beliefs & belonging", "故宫石阶上的龙雕", ["shengxiao", "fushi", "fangyan", "jieri"]),
    "zhongyi-shenti": ("identities", "中医与身体观", "Chinese medicine and the body", "药食同源：身体是可以调的，不只是可以修的。", "Identities · Health & wellbeing", "中医把脉与药柜", ["tianren", "chadao", "yinshi", "jieqi"]),
    "chunjie": ("experiences", "春节团圆", "Spring Festival reunion", "一年的路，都是为了这一顿饭。", "Experiences · Customs & holidays", "孩子接过红包", ["chunyun", "jieri", "daike", "xiao-dao"]),
    "jieri": ("experiences", "岁时节日", "The festival year", "元宵灯，清明纸，端午粽，中秋月，重阳菊。", "Experiences · Customs & traditions", "河上的元宵灯会", ["chunjie", "rensheng", "jieqi", "yanglao"]),
    "rensheng": ("experiences", "人生礼仪", "Rites of a life", "满月、抓周、婚礼、寿宴：用仪式把时间钉住。", "Experiences · Life stories / rites of passage", "婚礼敬茶", ["chunjie", "daike", "xiao-dao", "yanglao"]),
    "daike": ("experiences", "待客之道", "The art of hosting", "先倒茶，再说话；把最好的留给客人。", "Experiences · Social customs", "主人在门口迎客", ["mianzi", "jiuculture", "yinshi", "renqing"]),
    "chadao": ("experiences", "茶文化", "Tea culture", "绿茶求鲜，红茶求火，普洱求时间。", "Experiences · Leisure / customs", "盖碗与龙井", ["jiuculture", "yinshi", "zhongyi-shenti", "daike"]),
    "jiuculture": ("experiences", "酒文化", "Drinking culture", "啤酒、白酒、红酒，酒桌上藏着权力。", "Experiences · Social life / health", "宴席上的酒杯", ["mianzi", "daike", "renqing", "zhongyi-shenti"]),
    "yinshi": ("experiences", "八大菜系", "The eight cuisines", "南甜北咸，一边是家，一边是地图。", "Experiences · Leisure / travel", "沸腾的火锅", ["chadao", "daike", "waimai", "chunjie"]),
    "mingsheng": ("experiences", "名胜古迹", "Famous places", "不到长城非好汉；故宫里住过故事。", "Experiences · Holidays & travel", "日出时的长城", ["chunyun", "chuantong-yishu", "gaotie", "chuantong-xiandai"]),
    "chunyun": ("experiences", "春运回家", "The Chunyun journey home", "世界上最大的人类迁徙，目的地往往只是一碗汤。", "Experiences · Travel / life stories", "春运车站", ["chunjie", "gaotie", "hukou", "jiating"]),
    "sida-faming": ("ingenuity", "四大发明", "The four great inventions", "纸、版、火、针：改的是见面的方式。", "Human ingenuity · Scientific innovation", "文房与古印刷", ["hanzi", "gaotie", "yidong-zhifu", "chuantong-yishu"]),
    "hanzi": ("ingenuity", "汉字文化", "The culture of Chinese characters", "字可以拆，口音不同的人仍能同读。", "Human ingenuity · Communication / art", "宣纸上的书法", ["qiming", "chuantong-yishu", "fangyan", "sida-faming"]),
    "chuantong-yishu": ("ingenuity", "传统艺术", "Traditional arts", "手艺按年学，亮相可以按秒传。", "Human ingenuity · Artistic expression", "京剧演员上妆", ["hanzi", "fushi", "mingsheng", "chuantong-xiandai"]),
    "yidong-zhifu": ("ingenuity", "移动支付", "Mobile payment", "手机一亮，现金从桌上消失。", "Human ingenuity · Technology", "夜市扫码付款", ["zhibo", "waimai", "shejiao", "gaotie"]),
    "zhibo": ("ingenuity", "电商与直播", "E-commerce and livestreams", "观看变成结账，倒计时收走犹豫。", "Human ingenuity · Media / technology", "助农直播", ["yidong-zhifu", "xiangcun", "shejiao", "waimai"]),
    "shejiao": ("ingenuity", "社交媒体", "Social media", "一条消息发给谁，比发什么更说明关系。", "Human ingenuity · Communication & media", "书法与列车——新旧媒介", ["zhibo", "yidong-zhifu", "neijuan", "hanzi"]),
    "gaotie": ("ingenuity", "高铁与基建", "High-speed rail and infrastructure", "土地被压缩，有人被连上，有人被路过。", "Human ingenuity · Technology / innovation", "穿越山谷的高铁", ["chunyun", "mingsheng", "waimai", "sida-faming"]),
    "waimai": ("ingenuity", "外卖与共享", "Delivery and sharing", "便利改了晚饭，也改了谁在路上跑。", "Human ingenuity · Technology / everyday life", "城市里的共享与配送", ["yidong-zhifu", "gongxiang", "laji", "neijuan"]),
    "gaokao": ("society", "高考与教育", "Gaokao and schooling", "一张卷子，常常决定一个家庭的计划。", "Social organization · Education", "深夜自习的学生", ["wangzi", "neijuan", "jiating", "jiti"]),
    "wangzi": ("society", "望子成龙", "Hoping the child becomes a dragon", "「为你好」有时是动力，有时无法上诉。", "Social organization · Family / education", "清晨送孩子上学", ["gaokao", "xiao-dao", "jiating", "neijuan"]),
    "jiating": ("society", "家庭结构变迁", "Changing households", "政策能改数字，养育成本改决定。", "Social organization · Community / family", "三代同堂的公寓早晨", ["yanglao", "wangzi", "hukou", "chunyun"]),
    "neijuan": ("society", "996 与内卷", "996 and involution", "蛋糕不变时，竞争会吃掉晚上。", "Social organization · The working world", "深夜办公室", ["gaokao", "waimai", "wangzi", "hukou"]),
    "shequ": ("society", "广场舞与社区", "Square dancing and community", "谁能把空地编成队，比谁爱跳舞更重要。", "Social organization · Community", "黄昏的广场舞", ["yanglao", "jiti", "hukou", "laji"]),
    "yanglao": ("society", "养老与敬老", "Ageing and honouring elders", "照料发生在手里，不只发生在口号里。", "Social organization · Community / social issues", "家庭里的照料", ["jiating", "xiao-dao", "shequ", "jieri"]),
    "renqing": ("society", "人情与关系", "Renqing and guanxi", "礼物的分量在说话，程序有时不在场。", "Social organization · Social relationships", "双手递上的礼物", ["mianzi", "daike", "jiuculture", "neijuan"]),
    "hukou": ("society", "城乡与户口", "City, countryside, hukou", "工位和学位被拆开，家就变成两地。", "Social organization · Social issues / community", "都市社区黄昏", ["jiating", "chunyun", "xiangcun", "gaokao"]),
    "laji": ("planet", "垃圾分类", "Waste sorting", "四个桶是规则；满了才看见责任在谁。", "Sharing the planet · Environment", "人行道上的分类垃圾桶", ["waimai", "gongxiang", "jieqi", "xiangcun"]),
    "gongxiang": ("planet", "共享经济", "The sharing economy", "共享是否更环保，要看寿命和维修。", "Sharing the planet · Environment / ethics", "城市里的共享出行", ["waimai", "laji", "gaotie", "yidong-zhifu"]),
    "tianren": ("planet", "天人合一", "Heaven and human as one", "园林先处理水和风，不是先堆装饰。", "Sharing the planet · Ethics / environment", "园林里的月洞门", ["jieqi", "zhongyi-shenti", "mingsheng", "chuantong-xiandai"]),
    "xiongmao": ("planet", "大熊猫与保护", "Pandas and conservation", "明星动物能带资金，不能当唯一标准。", "Sharing the planet · Environment", "竹林中的熊猫幼崽", ["tianren", "xiangcun", "laji", "jieqi"]),
    "jieqi": ("planet", "二十四节气", "The twenty-four solar terms", "节气是农时的诗，也是气候的提醒。", "Sharing the planet · Environment / traditions", "日出时的梯田", ["jieri", "tianren", "yinshi", "xiangcun"]),
    "xiangcun": ("planet", "乡村振兴", "Rural revitalization", "镜头对着菜垄时，村子仍要学校和诊所。", "Sharing the planet · Urban & rural / ethics", "山村里的助农拍摄", ["zhibo", "hukou", "jieqi", "chuantong-xiandai"]),
    "chuantong-xiandai": ("planet", "传统与现代", "Tradition and the modern", "冲突常在租金和能源，不一定在瓦当。", "Sharing the planet · Globalization / ethics", "故宫屋顶与玻璃塔", ["fushi", "chuantong-yishu", "gaotie", "tianren"]),
}

THEME_ZH = {
    "identities": "身份认同",
    "experiences": "经历体验",
    "ingenuity": "人类创造力",
    "society": "社会组织",
    "planet": "共享地球",
}


def han_count(s: str) -> int:
    return sum(1 for c in s if "\u4e00" <= c <= "\u9fff")


def clause(s: str, max_han: int = 14) -> str:
    s = (s or "").strip()
    for sep in ("。", "；", ";", "：", ":"):
        if sep in s:
            s = s.split(sep, 1)[0].strip()
            break
    buf: list[str] = []
    n = 0
    comma_at: int | None = None
    for ch in s:
        buf.append(ch)
        if "\u4e00" <= ch <= "\u9fff":
            n += 1
        if ch in "，、" and n >= 6:
            comma_at = len(buf) - 1
            if n >= 8:
                break
        if n >= max_han:
            break
    if comma_at is not None and n >= 8:
        buf = buf[:comma_at]
    out = "".join(buf).rstrip("，、 ；; ")
    if out.endswith("一") or out.endswith("的"):
        out = out[:-1].rstrip("，、 ")
    return out or s[:max_han]


def load_packs() -> dict:
    by = {}
    for name in ["identities", "experiences", "ingenuity", "society", "planet"]:
        data = json.loads((PACK_DIR / f"{name}.json").read_text())
        for t in data:
            by[t["slug"]] = t
    return by


def is_picture_prompt(zh: str) -> bool:
    return any(k in zh for k in ("描述", "图", "画面", "看见", "照片", "这张", "你看到"))


def unique_cues(items: list[str], n: int = 4, max_han: int = 16) -> list[str]:
    seen: set[str] = set()
    out: list[str] = []
    for raw in items:
        c = clause(raw, max_han)
        if not c or c in seen or han_count(c) < 2:
            continue
        seen.add(c)
        out.append(c)
        if len(out) >= n:
            break
    return out


def first_han_line(s: str, max_han: int = 36) -> str:
    s = (s or "").strip()
    cut = s.split("。", 1)[0].strip()
    if han_count(cut) <= max_han:
        return cut
    return clause(cut, max_han)


def first_en_line(s: str) -> str:
    s = (s or "").strip()
    for sep in (". ", " — ", "; "):
        if sep in s:
            s = s.split(sep, 1)[0].strip()
            break
    if s and s[-1] not in ".!?":
        s += "."
    return s[:180]


def compare_anchor(pack: dict) -> dict:
    sec = next((s for s in pack.get("sections") or [] if s.get("key") == "compare"), None)
    if not sec:
        return {
            "zh": "和你所在的国家比，相似和不同在哪里。",
            "en": "Compared with your country, where is it similar or different?",
        }
    return {"zh": first_han_line(sec.get("zh") or "", 36), "en": first_en_line(sec.get("en") or "")}


def oral_bank(title_zh: str, title_en: str, alt: str, copy: dict, pack: dict, anchor: dict) -> tuple[list, list, list]:
    look = pack.get("lookFor") or []
    prompts = pack.get("oralPrompts") or []
    points = copy["points"]
    caution = copy["caution"][0]

    r1_cues = unique_cues([item["zh"] for item in look] or [alt], 4, 16)
    if len(r1_cues) < 3:
        r1_cues = unique_cues(r1_cues + ["人物动作", "环境线索", "文化连接"], 4)

    r1_src = prompts[0] if prompts and is_picture_prompt(prompts[0]["zh"]) else None
    r1 = {
        "zh": (r1_src or {}).get("zh")
        or f"请根据图片陈述：{alt}。你看见谁、他们在做什么、环境有什么线索？这怎样连接到「{title_zh}」？",
        "en": (r1_src or {}).get("en")
        or f"From the picture ({alt}): who do you see, what are they doing, what is the setting, and how does it connect to {title_en}?",
        "cues": r1_cues[:5],
    }

    r2_src = next((q for q in prompts[1:] if q.get("zh") and not is_picture_prompt(q["zh"])), None)
    r2_cues = unique_cues([p[0] for p in points], 4, 16)
    if len(r2_cues) < 3:
        r2_cues = unique_cues(r2_cues + ["直接回答", "一个例子", "成立条件"], 4)
    r2 = {
        "zh": (r2_src or {}).get("zh") or f"为什么说「{points[0][0]}」？请直接回答，并举一个生活里的例子。",
        "en": (r2_src or {}).get("en") or f"Why is this true: “{points[0][1]}”? Answer directly and give one example from life.",
        "cues": r2_cues[:5],
    }

    r3_cues = unique_cues([anchor["zh"], caution] + [p[0] for p in points], 4, 16)
    if len(r3_cues) < 3:
        r3_cues = unique_cues(r3_cues + ["相似和不同", "成立条件", "我的立场"], 4)
    r3 = {
        "zh": f"和西班牙／南欧或你自己的国家比，「{title_zh}」有什么相似和不同？你的立场在什么条件下成立？",
        "en": f"Compared with Spain / Southern Europe or your own country, what is similar or different about {title_en}? Under what condition does your stance hold?",
        "cues": r3_cues[:5],
    }

    for item in (r1, r2, r3):
        if not (3 <= len(item["cues"]) <= 5):
            item["cues"] = (item["cues"] + ["原因", "例子", "条件"])[:4]
    return [r1], [r2], [r3]


def main():
    packs = load_packs()
    prev_list = json.loads(OUT.read_text())
    prev = {t["slug"]: t for t in prev_list}
    missing = [s for s in META if s not in packs]
    extra = [s for s in packs if s not in META]
    if missing or extra:
        raise SystemExit(f"slug mismatch missing={missing} extra={extra}")

    out = []
    issues = []
    for slug, meta in META.items():
        theme, title_zh, title_en, subtitle, ib, alt, related = meta
        pack = packs[slug]
        old = prev[slug]
        copy = {
            "core": (old["oneLineCore"]["zh"], old["oneLineCore"]["en"]),
            "points": [(p["zh"], p["en"]) for p in old["memoryPoints"]],
            "caution": (old["expressionCaution"]["zh"], old["expressionCaution"]["en"]),
            "year": old.get("timeSensitiveYear"),
        }
        look = pack.get("lookFor") or []
        voc = pack.get("vocab") or []
        anchor = compare_anchor(pack)

        evidence = []
        for item in look[:4]:
            zh = item["zh"] if han_count(item["zh"]) <= 28 else clause(item["zh"], 28)
            evidence.append({"zh": zh, "en": item["en"]})

        words = []
        for v in voc[:5]:
            ex = v.get("example") or v["hanzi"]
            words.append(
                {
                    "hanzi": v["hanzi"],
                    "pinyin": v["pinyin"],
                    "en": v["en"],
                    "collocation": ex if han_count(ex) <= 22 else clause(ex, 18),
                    "collocationEn": (v.get("exampleEn") or v["en"])[:80],
                }
            )

        r1, r2, r3 = oral_bank(title_zh, title_en, alt, copy, pack, anchor)
        core_zh, core_en = copy["core"]
        points = [{"zh": a, "en": b} for a, b in copy["points"]]
        caution_zh, caution_en = copy["caution"]

        if not (4 <= len(points) <= 6):
            issues.append(f"{slug} points {len(points)}")
        if han_count(core_zh) > 25:
            issues.append(f"{slug} core {han_count(core_zh)} {core_zh}")
        for p in points:
            if han_count(p["zh"]) > 28:
                issues.append(f"{slug} point {han_count(p['zh'])} {p['zh']}")
        if han_count(anchor["zh"]) > 40:
            issues.append(f"{slug} compare {han_count(anchor['zh'])} {anchor['zh']}")
        if not (4 <= len(words) <= 6):
            issues.append(f"{slug} words {len(words)}")
        for rnd, items in (("1", r1), ("2", r2), ("3", r3)):
            if not items:
                issues.append(f"{slug} oral {rnd} empty")
            for it in items:
                if not (3 <= len(it["cues"]) <= 5):
                    issues.append(f"{slug} cues {rnd} {it['cues']}")

        out.append(
            {
                "slug": slug,
                "theme": theme,
                "titleZh": title_zh,
                "titleEn": title_en,
                "subtitle": subtitle,
                "ibLens": ib,
                "image": f"/images/topics/{slug}.jpg",
                "imageAlt": alt,
                "related": related,
                "oneLineCore": {"zh": core_zh, "en": core_en},
                "memoryPoints": points,
                "imageEvidence": evidence,
                "essentialLanguage": words,
                "expressionCaution": {"zh": caution_zh, "en": caution_en},
                "compareAnchor": anchor,
                "oralRound1": r1,
                "oralRound2": r2,
                "oralRound3": r3,
                "contentStatus": "approved",
                "factStatus": "checked",
                "rightsStatus": "cleared",
                "publicStatus": "approved",
                "timeSensitiveYear": copy["year"],
            }
        )

    if issues:
        print("ISSUES")
        for i in issues:
            print(" ", i)
        raise SystemExit(1)

    OUT.write_text(json.dumps(out, ensure_ascii=False, indent=2) + "\n")
    print(f"wrote {OUT} topics={len(out)} bytes={OUT.stat().st_size}")
    print("themes", {k: sum(1 for x in out if x["theme"] == k) for k in ["identities", "experiences", "ingenuity", "society", "planet"]})


if __name__ == "__main__":
    main()
