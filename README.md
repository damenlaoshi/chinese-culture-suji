# 中国文化速记

IB 中文 B 公共文化要点与口语练习。给**所有学生**用的速记站：先看要点，再开口说。

对应 IB DP 五个规定主题：**社会认同 / 经历 / 人类发明创造 / 社会组织 / 共享地球**。全站冻结 **41** 个文化站，不扩站。

## 学生怎么用

- **首页**：站名 + IB 主题 + 一句核心 + 4–6 条速记要点（每条不超过 28 个汉字）+「开始口语」
- **口语三轮**：提示先藏着，答完再展开；第三轮固定是西 / 南欧对照
- **拼音、英语默认关闭**，需要时在辅助栏打开
- **深入了解**里才是长文，默认折叠
- **收藏 / 复习 / 词义选择**都在本机浏览器里，不上传账号进度

进度键：`cculture_local_review_state_v2`（会从旧版 `wenyou-progress` 自动迁移）。

## 本地运行

需要 Node.js 20+。

```bash
npm install
npm run dev
```

开发服务器默认 `http://localhost:8080`。

```bash
npm test        # 单元测试
npm run lint
npm run typecheck
```

## 仓库里有什么

| 路径 | 内容 |
| --- | --- |
| `src/data/briefs.json` | 公共速记层（首页 / 口语用的短条目） |
| `src/data/packs/*.json` | 41 站的公开详稿、词汇、对照锚点 |
| `src/routes/` | 首页、主题、站页、口语、复习、词汇 |
| `public/images/` | 主题与站页照片 |
| `scripts/` | 速记生成与回归测试 |

**不含**教师私有层、作业原稿、学生名单。那些永远不进学生仓库。

## 技术栈

TanStack Start + React 19 + Vite + Tailwind CSS v4。口语朗读用浏览器 Web Speech API（`zh-CN`）。拼音用 `pinyin-pro`。

## 许可

见 [LICENSE](LICENSE)。速记文稿供课堂练习使用；照片为站点配图，转载请自行确认来源。
