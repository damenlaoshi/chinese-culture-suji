import { MORE_TOPICS } from "./topics-more";
import { normalizeTopic } from "./normalize";
import type { ThemeId, Topic } from "./types";
import identityPackJson from "./packs/identities.json";
import experiencePackJson from "./packs/experiences.json";
import ingenuityPackJson from "./packs/ingenuity.json";
import societyPackJson from "./packs/society.json";
import planetPackJson from "./packs/planet.json";
import type { TopicPack } from "./packs/types";

export const FIRST_TOPICS = [
  {
    slug: "xiao-dao",
    theme: "identities",
    title: "孝道与家庭",
    titleEn: "Filial piety and the family",
    subtitle: "先学会做人，再谈独立。",
    ibLens: "Identities · Beliefs & values",
    image: "/images/topics/xiao-dao.jpg",
    imageAlt: "祖母教孩子包饺子",
    minutes: 5,
    paragraphs: [
      {
        zh: "在许多中国家庭里，爱父母不只是情感，更是一种社会秩序。古语说「寻忠臣于孝子之家」：一个在家里懂得尊重长辈的人，到了社会上也更可能守规矩、负责任。对 IB 学生来说，这不是要你放弃独立，而是理解：在中国文化里，独立常常建立在先照顾好家庭关系之上。",
        en: "In many Chinese families, loving one’s parents is not only feeling — it is social order. The old saying “seek loyal officials in the homes of filial children” suggests that someone who honours elders at home is more likely to be responsible in public life. Independence, in this culture, often grows after family duties are met.",
      },
      {
        zh: "孝道会体现在很小的事上：吃饭先让长辈动筷，周末回家看望爷爷奶奶，重大决定先跟父母商量。年轻一代更强调个人空间，两代人因此会吵架。口语里你可以比较：你家谁说了算？你出国留学，是自己的选择，还是家里的安排？",
        en: "Filial piety shows up in small acts: elders eat first, weekends include a visit to grandparents, big decisions are discussed at home. Younger people want more personal space, so generations clash. In the oral, compare: who decides in your family? Was studying abroad your choice, or the family’s?",
      },
      {
        zh: "讨论时不要把孝道说成「盲目服从」。更准确的说法是：中国文化把「我是谁」放在关系网里来回答——我是谁的孩子、谁的学生、谁的朋友。身份不是单独的点，而是一张网。",
        en: "Avoid calling filial piety blind obedience. A fairer reading: Chinese culture answers “who am I?” inside a web of relations — child of, student of, friend of. Identity is a net, not a single point.",
      },
    ],
    oralPrompts: [
      { zh: "描述一张全家福。谁坐在中间？为什么？", en: "Describe a family photo. Who sits in the centre, and why?" },
      { zh: "你觉得孝顺和独立可以同时存在吗？", en: "Can filial piety and independence exist together?" },
      { zh: "比较你家和中国家庭在「听父母的话」这件事上的不同。", en: "Compare how your family and a Chinese family treat parental advice." },
      { zh: "如果父母反对你的专业选择，你会怎么沟通？", en: "If parents opposed your subject choice, how would you talk with them?" },
    ],
    vocab: [
      { hanzi: "孝道", pinyin: "xiàodào", pos: "名", en: "filial piety", example: "孝道是中国文化的核心价值之一。", exampleEn: "Filial piety is a core Chinese value." },
      { hanzi: "长辈", pinyin: "zhǎngbèi", pos: "名", en: "elder / senior relative", example: "吃饭时应该先给长辈夹菜。", exampleEn: "At meals you should serve the elders first." },
      { hanzi: "独立", pinyin: "dúlì", pos: "形/动", en: "independent", example: "她想独立生活，但每周仍回家看父母。", exampleEn: "She wants to live independently but still visits weekly." },
      { hanzi: "责任", pinyin: "zérèn", pos: "名", en: "responsibility", example: "照顾父母是一种责任，不只是感情。", exampleEn: "Caring for parents is a duty, not only a feeling." },
      { hanzi: "尊重", pinyin: "zūnzhòng", pos: "动", en: "to respect", example: "尊重长辈不等于什么都听他们的。", exampleEn: "Respecting elders is not the same as obeying everything." },
      { hanzi: "商量", pinyin: "shāngliang", pos: "动", en: "to discuss / consult", example: "选大学这件事，他先跟家里商量。", exampleEn: "He consulted his family before choosing a university." },
      { hanzi: "代沟", pinyin: "dàigōu", pos: "名", en: "generation gap", example: "代沟让两代人常常互相不理解。", exampleEn: "The generation gap makes mutual understanding hard." },
      { hanzi: "回报", pinyin: "huíbào", pos: "动/名", en: "to repay / return", example: "很多子女觉得应该回报父母的养育。", exampleEn: "Many children feel they should repay their parents’ care." },
    ],
    related: ["mianzi", "jiating", "yanglao", "wangzi"],
  },
  {
    slug: "mianzi",
    theme: "identities",
    title: "面子与谦虚",
    titleEn: "Face and humility",
    subtitle: "有面子，没面子，丢面子，爱面子。",
    ibLens: "Identities · Beliefs & values",
    image: "/images/topics/mianzi.jpg",
    imageAlt: "宴席上的劝酒",
    minutes: 6,
    paragraphs: [
      {
        zh: "面子是中国社交里最难翻译的词之一。它接近名誉、体面，但比「reputation」更日常：请客买单、考试成绩、孩子的学校、酒桌上喝不喝酒，都可能关乎面子。好的一面是重视名声与荣誉；坏的一面是虚荣——为了「看起来成功」而勉强自己。",
        en: "Mianzi, “face”, is one of the hardest Chinese social words to translate. It is honour and dignity, but also everyday: who pays the bill, exam scores, a child’s school, whether you drink at a banquet. At best it guards honour; at worst it is vanity — performing success.",
      },
      {
        zh: "谦虚是面子的另一面。别人说「你真棒」，很多人会回「哪里哪里」「我没有你说的那么好」。这不是虚伪，而是「枪打出头鸟」：太张扬，容易被比较、被孤立。在酒桌上，有人明明不会喝，也要喝一点，因为拒绝可能让主人没面子。劝酒有时是热情，有时是一种权力测试。",
        en: "Humility is the other side of face. Praise is often answered with “not at all”. That is not always false modesty — “the bird that sticks out gets shot”. At banquets some people drink against their will so the host does not lose face. A toast can be warmth; it can also be a test of power.",
      },
      {
        zh: "口语里你可以举自己的例子：你会不会当面接受夸奖？在你的文化里，拒绝喝酒算不算失礼？把面子说成「别人眼中的我」，讨论会更清楚。",
        en: "In the oral, use your own case: do you accept praise directly? Is refusing a drink rude where you come from? Calling face “the me that other people see” keeps the discussion clear.",
      },
    ],
    oralPrompts: [
      { zh: "别人夸你时，你通常怎么回答？为什么？", en: "When someone praises you, how do you usually reply, and why?" },
      { zh: "「爱面子」是优点还是负担？", en: "Is caring about face a strength or a burden?" },
      { zh: "如果主人劝你喝酒，而你不会喝，你会怎么说？", en: "If a host presses you to drink and you do not drink, what would you say?" },
      { zh: "比较谦虚在中国和在你国家的不同表现。", en: "Compare how humility is shown in China and in your country." },
    ],
    vocab: [
      { hanzi: "面子", pinyin: "miànzi", pos: "名", en: "face / social dignity", example: "当众批评他会让他很没面子。", exampleEn: "Criticising him in public would make him lose face." },
      { hanzi: "谦虚", pinyin: "qiānxū", pos: "形", en: "modest / humble", example: "中国人常常用谦虚的方式接受夸奖。", exampleEn: "Chinese people often accept praise modestly." },
      { hanzi: "虚荣", pinyin: "xūróng", pos: "名/形", en: "vanity", example: "为了虚荣买名牌，不一定让人更快乐。", exampleEn: "Buying luxury for vanity does not always make people happier." },
      { hanzi: "张扬", pinyin: "zhāngyáng", pos: "形/动", en: "to show off / high-profile", example: "她很优秀，但从不张扬。", exampleEn: "She is excellent but never shows off." },
      { hanzi: "劝酒", pinyin: "quànjiǔ", pos: "动", en: "to press someone to drink", example: "有些饭局上，劝酒会让人很尴尬。", exampleEn: "At some dinners, being pressed to drink is awkward." },
      { hanzi: "荣誉", pinyin: "róngyù", pos: "名", en: "honour / glory", example: "他为学校赢得了荣誉。", exampleEn: "He won honour for the school." },
      { hanzi: "低姿态", pinyin: "dī zītài", pos: "名", en: "low profile", example: "保持低姿态有时是一种自我保护。", exampleEn: "Staying low-profile can be a form of self-protection." },
      { hanzi: "体面", pinyin: "tǐmiàn", pos: "形/名", en: "dignified / respectable", example: "一份体面的工作对很多家庭很重要。", exampleEn: "A respectable job matters to many families." },
    ],
    related: ["jiuculture", "daike", "jiti", "renqing"],
  },
  {
    slug: "jiti",
    theme: "identities",
    title: "集体主义",
    titleEn: "Collectivism",
    subtitle: "集体大于个人，并不等于没有自我。",
    ibLens: "Identities · Subcultures / values",
    image: "/images/topics/jiti.jpg",
    imageAlt: "团队合影",
    minutes: 5,
    paragraphs: [
      {
        zh: "中国文化常被概括为集体主义：班、队、公司、国家，往往排在「我」前面。穿一样的校服、唱一样的班歌、强调「不要给集体丢脸」，都是这种身份训练。好处是互助和归属感；代价是，提出不同意见有时会被看成「不合群」。",
        en: "Chinese culture is often labelled collectivist: class, team, company and country can come before “I”. Matching uniforms and the warning “don’t embarrass the group” train this identity. The gain is belonging; the cost is that dissent can look like not fitting in.",
      },
      {
        zh: "在当代城市，年轻人同时追求个性：穿搭、爱好、留学、个人品牌。所以更准确的描述不是「中国人没有自我」，而是：自我常常通过集体来确认——我是这个学校的、这个家乡的、这个团队的。",
        en: "In cities, young people also chase individuality — style, hobbies, study abroad, personal brands. A fairer line is not “Chinese people have no self”, but that the self is often confirmed through a group: this school, this hometown, this team.",
      },
      {
        zh: "口语里可以讨论：学校比赛输了，你先想自己的失误，还是先想班级荣誉？在你的文化里，离开集体去追求梦想，会被鼓励还是被担心？",
        en: "In the oral: after a school defeat, do you first replay your own mistake, or the class’s honour? In your culture, is leaving the group to chase a dream encouraged or feared?",
      },
    ],
    oralPrompts: [
      { zh: "你更喜欢团队合作还是单独完成任务？为什么？", en: "Do you prefer teamwork or working alone, and why?" },
      { zh: "「不要给集体丢脸」这句话，你同意吗？", en: "Do you agree with “don’t bring shame on the group”?" },
      { zh: "个性强的人在中国学校里会遇到什么挑战？", en: "What challenges might a strongly individual student meet in a Chinese school?" },
      { zh: "比较你们国家和中国对「合群」的看法。", en: "Compare views of “fitting in” in your country and in China." },
    ],
    vocab: [
      { hanzi: "集体", pinyin: "jítǐ", pos: "名", en: "collective / group", example: "他不愿意为了集体放弃自己的兴趣。", exampleEn: "He does not want to drop his interests for the group." },
      { hanzi: "合群", pinyin: "héqún", pos: "形", en: "sociable / fitting in", example: "老师常夸她很合群。", exampleEn: "Teachers often praise her for fitting in." },
      { hanzi: "归属感", pinyin: "guīshǔgǎn", pos: "名", en: "sense of belonging", example: "班集体给他很强的归属感。", exampleEn: "The class gave him a strong sense of belonging." },
      { hanzi: "个性", pinyin: "gèxìng", pos: "名", en: "individuality / personality", example: "现在的年轻人更敢于表现个性。", exampleEn: "Young people today dare more to show individuality." },
      { hanzi: "团结", pinyin: "tuánjié", pos: "形/动", en: "united / to unite", example: "比赛前教练强调团结。", exampleEn: "Before the match the coach stressed unity." },
      { hanzi: "牺牲", pinyin: "xīshēng", pos: "动", en: "to sacrifice", example: "她不愿意牺牲睡眠去加班。", exampleEn: "She is unwilling to sacrifice sleep for overtime." },
      { hanzi: "从众", pinyin: "cóngzhòng", pos: "动", en: "to follow the crowd", example: "从众让人安全，但也可能失去判断。", exampleEn: "Following the crowd feels safe but can dull judgement." },
      { hanzi: "荣誉", pinyin: "róngyù", pos: "名", en: "honour", example: "班级荣誉对很多学生很重要。", exampleEn: "Class honour matters to many students." },
    ],
    related: ["mianzi", "gaokao", "shequ", "neijuan"],
  },
  {
    slug: "shengxiao",
    theme: "identities",
    title: "十二生肖",
    titleEn: "The twelve zodiac animals",
    subtitle: "先天的属相，后天的习惯。",
    ibLens: "Identities · Beliefs & language",
    image: "/images/topics/shengxiao.jpg",
    imageAlt: "窗花上的生肖龙",
    minutes: 4,
    paragraphs: [
      {
        zh: "生肖是中国人最日常的身份标签之一。见面可以问「你属什么」，而不先问星座。龙年出生的孩子特别多，因为龙象征力量与好运；有的家庭会特意选龙年、避开自己觉得「不好」的年份。这是民俗，不是科学，但它仍然塑造自我想象。",
        en: "The zodiac is an everyday identity tag. People ask “what animal are you?” before they ask a star sign. Dragon years see more births because the dragon means power and luck. Families may time a birth — folklore, not science, yet it still shapes how people imagine themselves.",
      },
      {
        zh: "生肖也进入语言：属牛的人被说能吃苦，属猴的人被说聪明。把性格完全交给属相当然太简单。更有趣的讨论是：为什么人们需要这种故事？它让陌生人很快找到话题，也让人觉得「我生来就有一个位置」。",
        en: "The animals enter the language: oxen work hard, monkeys are clever. Treating character as destiny is too neat. A better question is why the stories persist: they give strangers a topic, and give people a place they were “born into”.",
      },
      {
        zh: "口语里你可以比较生肖和西方星座，或者谈谈你相不相信「先天」和「后天」——身体和运气是礼物，习惯是自己练出来的。",
        en: "In the oral, compare the zodiac with Western star signs, or talk about nature versus habit: the body may be a gift; habits are trained.",
      },
    ],
    oralPrompts: [
      { zh: "你属什么？你觉得它准吗？", en: "What is your zodiac animal? Do you think it fits?" },
      { zh: "为什么有的家庭会选「好年份」生孩子？", en: "Why do some families choose a “lucky year” to have a child?" },
      { zh: "生肖和星座，哪一种在你生活里更常见？", en: "Which is more common in your life, the Chinese zodiac or star signs?" },
      { zh: "性格是天生的，还是后来养成的？", en: "Is character inborn, or formed later?" },
    ],
    vocab: [
      { hanzi: "生肖", pinyin: "shēngxiào", pos: "名", en: "Chinese zodiac", example: "十二生肖十二年一轮回。", exampleEn: "The twelve animals cycle every twelve years." },
      { hanzi: "属", pinyin: "shǔ", pos: "动", en: "to be born in the year of", example: "我属虎。", exampleEn: "I was born in the Year of the Tiger." },
      { hanzi: "象征", pinyin: "xiàngzhēng", pos: "动/名", en: "to symbolise / symbol", example: "龙象征力量和权威。", exampleEn: "The dragon symbolises power and authority." },
      { hanzi: "运气", pinyin: "yùnqi", pos: "名", en: "luck", example: "不能把一切都交给运气。", exampleEn: "You cannot leave everything to luck." },
      { hanzi: "民俗", pinyin: "mínsú", pos: "名", en: "folk custom", example: "生肖是一种流传很久的民俗。", exampleEn: "The zodiac is a long-standing folk custom." },
      { hanzi: "性格", pinyin: "xìnggé", pos: "名", en: "personality", example: "不能只靠生肖判断一个人的性格。", exampleEn: "You cannot judge personality by the zodiac alone." },
      { hanzi: "轮回", pinyin: "lúnhuí", pos: "名", en: "cycle / reincarnation", example: "生肖十二年一轮回。", exampleEn: "The zodiac returns every twelve years." },
      { hanzi: "迷信", pinyin: "míxìn", pos: "名/动", en: "superstition / to be superstitious", example: "有人把生肖当成迷信，有人把它当成文化。", exampleEn: "Some call the zodiac superstition; others call it culture." },
    ],
    related: ["qiming", "jieri", "tianren", "long-de-chuanren"],
  },
  {
    slug: "qiming",
    theme: "identities",
    title: "起名文化",
    titleEn: "The culture of naming",
    subtitle: "姓在前，名在后；一个字，可能是整代人的约定。",
    ibLens: "Identities · Language & identity",
    image: "/images/topics/qiming.jpg",
    imageAlt: "用毛笔写名字",
    minutes: 5,
    paragraphs: [
      {
        zh: "中文姓名先姓后名。姓连接家族，名才是父母送给孩子的第一句话。很多人的名字里藏着愿望：嘉、睿、安、宁、博。有的家族按「字辈」取名，同一代人名字里共用一个字，打开族谱就能看见秩序。",
        en: "A Chinese name puts the family name first. The surname ties you to a clan; the given name is the parents’ first sentence to the child. Characters often hide wishes — excellence, wisdom, peace. Some families share a generation character, so a genealogy chart reads as order.",
      },
      {
        zh: "起名还要听声音、看笔画、避讳长辈的字。网络时代出现了更个性化的名字，也出现了「很难在银行系统里输入」的生僻字。名字是身份的门牌：别人怎么叫你，你就怎么被记住。",
        en: "Sound, stroke count, and avoiding an elder’s character all matter. The internet brought more individual names — and rare characters that bank systems cannot type. A name is a doorplate: how others call you is how you are remembered.",
      },
      {
        zh: "口语里可以介绍自己名字的含义，或者比较：你的文化里，名字是谁取的？能不能随便改？外国人取中文名时，为什么常选好听又好写的字？",
        en: "In the oral, explain your own name, or compare: who names a child in your culture? Can you change it freely? Why do foreigners picking a Chinese name often choose characters that sound good and write easily?",
      },
    ],
    oralPrompts: [
      { zh: "介绍你的中文名字：为什么选这些字？", en: "Introduce your Chinese name: why these characters?" },
      { zh: "姓和名，哪一个对你更重要？", en: "Which matters more to you, surname or given name?" },
      { zh: "如果父母给你取了一个你不喜欢的名字，你会改吗？", en: "If your parents gave you a name you disliked, would you change it?" },
      { zh: "比较中文名和你母语名字的结构。", en: "Compare the structure of a Chinese name and a name in your language." },
    ],
    vocab: [
      { hanzi: "姓名", pinyin: "xìngmíng", pos: "名", en: "full name", example: "请在表格上填写你的姓名。", exampleEn: "Please write your full name on the form." },
      { hanzi: "姓", pinyin: "xìng", pos: "名", en: "surname", example: "中国人的姓放在名字前面。", exampleEn: "In Chinese the surname comes first." },
      { hanzi: "寓意", pinyin: "yùyì", pos: "名", en: "implied meaning", example: "这个名字的寓意是平安。", exampleEn: "This name implies peace." },
      { hanzi: "辈分", pinyin: "bèifen", pos: "名", en: "seniority in the clan", example: "按辈分，我应该叫他叔叔。", exampleEn: "By generation rank I should call him uncle." },
      { hanzi: "家族", pinyin: "jiāzú", pos: "名", en: "clan / extended family", example: "家族历史写在家谱里。", exampleEn: "Clan history is written in the genealogy book." },
      { hanzi: "避讳", pinyin: "bìhuì", pos: "动", en: "to avoid a taboo name", example: "取名时要避讳长辈的名字。", exampleEn: "When naming a child you avoid an elder’s given name." },
      { hanzi: "生僻字", pinyin: "shēngpìzì", pos: "名", en: "rare character", example: "名字里有生僻字，打字很不方便。", exampleEn: "A rare character in a name is hard to type." },
      { hanzi: "称呼", pinyin: "chēnghu", pos: "名/动", en: "form of address / to call", example: "你希望别人怎么称呼你？", exampleEn: "How do you want others to address you?" },
    ],
    related: ["xiao-dao", "fangyan", "hanzi", "long-de-chuanren"],
  },
  {
    slug: "fangyan",
    theme: "identities",
    title: "普通话与方言",
    titleEn: "Putonghua and dialects",
    subtitle: "你说哪种话，别人就知道你从哪里来。",
    ibLens: "Identities · Language & identity",
    image: "/images/topics/fangyan.jpg",
    imageAlt: "巷子里用方言聊天的邻居",
    minutes: 5,
    paragraphs: [
      {
        zh: "普通话让十几亿人能上课、考试、看电视。方言则把人钉在土地上：粤语、吴语、闽南语、四川话，一开口就是家乡。很多年轻人在学校说普通话，回家跟爷爷奶奶说方言。两种话，两种身份。",
        en: "Putonghua lets more than a billion people share school, exams and television. Dialects pin a person to a place: Cantonese, Wu, Minnan, Sichuanese — one sentence and you hear a hometown. Many young people speak Putonghua at school and a dialect with grandparents. Two tongues, two identities.",
      },
      {
        zh: "方言正在变少。父母觉得普通话「更有用」，孩子觉得方言「不够酷」。保护方言不是反对普通话，而是承认：语言不仅是工具，也是记忆。一句只有家里人才懂的土话，往往比标准句子更像家。",
        en: "Dialects are thinning. Parents call Putonghua more useful; children call dialects uncool. Protecting a dialect is not rejecting the standard — it is admitting that language is memory, not only a tool. A phrase only the family knows often feels more like home than a textbook sentence.",
      },
      {
        zh: "口语里可以谈：你会几种语言？哪一种让你最放松？如果一种家乡话消失了，消失的只是发音，还是一种看世界的方式？",
        en: "In the oral: how many languages do you speak, and which relaxes you most? If a hometown tongue dies, is it only a sound that vanishes — or a way of seeing?",
      },
    ],
    oralPrompts: [
      { zh: "你在家说什么语言？在学校呢？", en: "What language do you speak at home? At school?" },
      { zh: "应不应该在学校保护方言？", en: "Should schools help protect dialects?" },
      { zh: "普通话推广对方言文化有什么影响？", en: "How has promoting Putonghua affected dialect cultures?" },
      { zh: "一种语言消失，意味着什么？", en: "What does it mean when a language disappears?" },
    ],
    vocab: [
      { hanzi: "普通话", pinyin: "pǔtōnghuà", pos: "名", en: "Mandarin / Putonghua", example: "上课要用普通话。", exampleEn: "Class is conducted in Putonghua." },
      { hanzi: "方言", pinyin: "fāngyán", pos: "名", en: "dialect", example: "他一说方言，我就知道他是南方人。", exampleEn: "The moment he used dialect I knew he was from the south." },
      { hanzi: "口音", pinyin: "kǒuyīn", pos: "名", en: "accent", example: "她普通话说得很好，但还有一点口音。", exampleEn: "Her Putonghua is good, with a slight accent." },
      { hanzi: "母语", pinyin: "mǔyǔ", pos: "名", en: "mother tongue", example: "方言也可以是一个人的母语。", exampleEn: "A dialect can also be someone’s mother tongue." },
      { hanzi: "推广", pinyin: "tuīguǎng", pos: "动", en: "to promote / spread", example: "推广普通话方便了跨省交流。", exampleEn: "Promoting Putonghua made cross-province talk easier." },
      { hanzi: "消失", pinyin: "xiāoshī", pos: "动", en: "to disappear", example: "有些方言正慢慢消失。", exampleEn: "Some dialects are slowly disappearing." },
      { hanzi: "乡音", pinyin: "xiāngyīn", pos: "名", en: "hometown accent", example: "乡音难改。", exampleEn: "A hometown accent is hard to change." },
      { hanzi: "沟通", pinyin: "gōutōng", pos: "动/名", en: "to communicate / communication", example: "共同的语言让沟通更容易。", exampleEn: "A shared language makes communication easier." },
    ],
    related: ["qiming", "hanzi", "hukou", "chunyun"],
  },
  {
    slug: "fushi",
    theme: "identities",
    title: "传统服饰",
    titleEn: "Traditional dress",
    subtitle: "汉服、旗袍，以及五十六个民族的衣裳。",
    ibLens: "Identities · Lifestyles / subcultures",
    image: "/images/topics/fushi.jpg",
    imageAlt: "园林里的旗袍与汉服",
    minutes: 5,
    paragraphs: [
      {
        zh: "汉服在年轻人里重新流行，不是因为日常都要穿交领长袍，而是因为衣服能让人「看起来像自己想象中的中国」。旗袍则把身体曲线和民国城市记忆缝在一起。少数民族服饰——苗银、藏袍、维吾尔花帽——提醒我们：中国不是一种样子，而是五十六个民族的合集。",
        en: "Hanfu’s return among the young is not about wearing crossed collars every day. Clothes let people look like the China they imagine. The qipao sews body line to Republican-era city memory. Minority dress — Miao silver, Tibetan robes, Uyghur flower caps — reminds us China is not one look, but fifty-six peoples.",
      },
      {
        zh: "穿传统衣服去景区拍照，有人觉得是文化自信，有人觉得是消费符号。两者可以同时成立。真正值得问的是：离开镜头以后，这些衣服还留下什么？是对工艺的尊重，还是一套滤镜？",
        en: "Wearing heritage dress at a scenic spot can be cultural confidence and a consumer prop at once. The better question is what remains after the photo: respect for craft, or only a filter?",
      },
      {
        zh: "口语里可以描述一件衣服的颜色、材料和场合，再升到身份：校服、西装、汉服、球衣，各说了一种「我属于谁」。",
        en: "In the oral, describe a garment’s colour, cloth and occasion, then rise to identity: school uniform, suit, hanfu, team jersey — each says who you belong to.",
      },
    ],
    oralPrompts: [
      { zh: "描述一张穿汉服或旗袍的照片。", en: "Describe a photo of someone in hanfu or a qipao." },
      { zh: "传统服装只适合节日，还是也可以进入日常生活？", en: "Is traditional dress only for festivals, or also for daily life?" },
      { zh: "校服和传统服装，哪一种更能代表学生身份？", en: "Which represents student identity more, a school uniform or traditional dress?" },
      { zh: "为什么年轻人愿意花钱租汉服拍照？", en: "Why are young people willing to rent hanfu for photographs?" },
    ],
    vocab: [
      { hanzi: "汉服", pinyin: "hànfú", pos: "名", en: "Han clothing", example: "很多年轻人周末会穿汉服去古镇。", exampleEn: "Many young people wear hanfu to old towns on weekends." },
      { hanzi: "旗袍", pinyin: "qípáo", pos: "名", en: "qipao / cheongsam", example: "旗袍常在正式场合出现。", exampleEn: "The qipao often appears on formal occasions." },
      { hanzi: "民族", pinyin: "mínzú", pos: "名", en: "ethnic group / nation", example: "中国有五十六个民族。", exampleEn: "China has fifty-six ethnic groups." },
      { hanzi: "传统", pinyin: "chuántǒng", pos: "名/形", en: "tradition / traditional", example: "传统不一定等于过时。", exampleEn: "Traditional is not the same as outdated." },
      { hanzi: "工艺", pinyin: "gōngyì", pos: "名", en: "craft / workmanship", example: "刺绣是一种需要时间的工艺。", exampleEn: "Embroidery is a craft that takes time." },
      { hanzi: "自信", pinyin: "zìxìn", pos: "名/形", en: "self-confidence / confident", example: "穿自己喜欢的衣服是一种自信。", exampleEn: "Wearing what you like is a kind of confidence." },
      { hanzi: "象征", pinyin: "xiàngzhēng", pos: "动", en: "to symbolise", example: "红色在婚礼上象征喜庆。", exampleEn: "Red at a wedding symbolises joy." },
      { hanzi: "日常", pinyin: "rìcháng", pos: "名/形", en: "everyday / daily", example: "这件衣服不适合日常上班。", exampleEn: "This garment is not for everyday office wear." },
    ],
    related: ["long-de-chuanren", "chuantong-yishu", "jieri", "chuantong-xiandai"],
  },
  {
    slug: "long-de-chuanren",
    theme: "identities",
    title: "龙的传人",
    titleEn: "Descendants of the dragon",
    subtitle: "炎黄子孙，是诗，也是一种集体称呼。",
    ibLens: "Identities · Beliefs & belonging",
    image: "/images/topics/long-de-chuanren.jpg",
    imageAlt: "故宫石阶上的龙雕",
    minutes: 4,
    paragraphs: [
      {
        zh: "「龙的传人」「炎黄子孙」把个人接到一条很长的故事线上。龙在中国不是西方那种喷火的恶兽，而是雨水、皇帝和民族想象的符号。唱这首歌、过春节、看故宫的龙纹，都在练习同一种归属。",
        en: "“Descendants of the dragon” and “sons and daughters of Yan and Huang” plug a person into a long story. The Chinese dragon is not the West’s fire-breathing villain; it is rain, emperors, and national imagination. Singing the song, keeping Spring Festival, reading dragon patterns in the Forbidden City — all rehearse belonging.",
      },
      {
        zh: "这种称呼很有力量，也需要小心。它能让海外华人在异乡找到根；也可能把复杂的地方身份、少数民族身份说得太简单。更成熟的说法是：中华文化是一条大河，里面有很多支流。",
        en: "The label is powerful and needs care. It can root overseas Chinese in a far city; it can also flatten local and minority identities. A more grown-up image: Chinese culture is a great river with many tributaries.",
      },
      {
        zh: "口语里可以谈你自己的「根」：护照、语言、食物、节日，哪一样最能说明你是谁？归属感是选择，还是出生就决定的？",
        en: "In the oral, talk about your own roots: passport, language, food, festival — which best says who you are? Is belonging chosen, or assigned at birth?",
      },
    ],
    oralPrompts: [
      { zh: "「龙」在中国文化和西方文化里有什么不同？", en: "How does the dragon differ in Chinese and Western cultures?" },
      { zh: "一个人可以同时拥有几种文化身份吗？", en: "Can a person hold several cultural identities at once?" },
      { zh: "出国以后，什么最让你想起自己的根？", en: "After going abroad, what most reminds you of your roots?" },
      { zh: "集体称呼会不会忽略个人差异？", en: "Can a collective label ignore personal difference?" },
    ],
    vocab: [
      { hanzi: "传人", pinyin: "chuánrén", pos: "名", en: "inheritor / descendant", example: "他们自称是龙的传人。", exampleEn: "They call themselves descendants of the dragon." },
      { hanzi: "祖先", pinyin: "zǔxiān", pos: "名", en: "ancestor", example: "清明节是纪念祖先的日子。", exampleEn: "Qingming is a day to remember ancestors." },
      { hanzi: "归属", pinyin: "guīshǔ", pos: "名/动", en: "belonging", example: "文化归属不一定等于国籍。", exampleEn: "Cultural belonging is not always the same as nationality." },
      { hanzi: "象征", pinyin: "xiàngzhēng", pos: "名", en: "symbol", example: "龙是中华文化的重要象征。", exampleEn: "The dragon is an important symbol of Chinese culture." },
      { hanzi: "根", pinyin: "gēn", pos: "名", en: "roots", example: "很多人回老家是为了寻找根。", exampleEn: "Many people return to their hometown to find their roots." },
      { hanzi: "民族", pinyin: "mínzú", pos: "名", en: "nation / people", example: "文化认同可以是民族的，也可以是地方的。", exampleEn: "Identity can be national or local." },
      { hanzi: "传说", pinyin: "chuánshuō", pos: "名", en: "legend", example: "炎黄的故事属于远古传说。", exampleEn: "The story of Yan and Huang belongs to ancient legend." },
      { hanzi: "认同", pinyin: "rèntóng", pos: "动/名", en: "to identify with / identity", example: "文化认同需要时间培养。", exampleEn: "Cultural identification takes time to grow." },
    ],
    related: ["shengxiao", "fushi", "fangyan", "jieri"],
  },
  {
    slug: "zhongyi-shenti",
    theme: "identities",
    title: "中医与身体观",
    titleEn: "Chinese medicine and the body",
    subtitle: "药食同源：身体是可以调的，不只是可以修的。",
    ibLens: "Identities · Health & wellbeing",
    image: "/images/topics/zhongyi-shenti.jpg",
    imageAlt: "中医把脉与药柜",
    minutes: 6,
    paragraphs: [
      {
        zh: "中医看身体，不像修机器，更像看天气：寒热、虚实、气顺不顺。针灸、拔罐、喝热水、喝苦药，对一些人是科学，对一些人是信仰，对更多人是习惯——从小被要求「别喝冰的」。药食同源的想法是：日常吃什么，就是在慢慢治或慢慢伤。",
        en: "Chinese medicine reads the body less like a machine than like weather: cold and heat, deficiency and excess, whether qi flows. Acupuncture, cupping, hot water and bitter herbs are science to some, belief to others, and habit to many — “don’t drink ice”. Food and medicine share a source: what you eat every day slowly heals or slowly harms.",
      },
      {
        zh: "当代中国是双轨的：大医院查血、做手术；家里仍会用红糖姜茶发汗。把中医说成全对或全错，都太粗。IB 更需要的能力是：区分安慰、经验和文化，同时承认现代医学的边界。",
        en: "Contemporary China runs on two tracks: hospitals draw blood and operate; homes still sweat out a cold with brown-sugar ginger tea. Calling Chinese medicine all true or all false is crude. IB wants you to separate comfort, experience and culture — and still respect what modern medicine can and cannot do.",
      },
      {
        zh: "口语里可以比较你国家的健康习惯：感冒了喝药还是睡觉？你相不相信「上火」？身体观其实是身份观：你觉得人应该控制身体，还是配合身体？",
        en: "In the oral, compare health habits: pills or sleep for a cold? Do you believe in “internal heat”? A view of the body is a view of the self: should we control the body, or cooperate with it?",
      },
    ],
    oralPrompts: [
      { zh: "你生病时更相信医院，还是家里的土办法？", en: "When you are ill, do you trust the hospital or home remedies more?" },
      { zh: "「多喝热水」为什么会变成一句玩笑？", en: "Why did “drink more hot water” become a joke?" },
      { zh: "传统医学和现代医学可以合作吗？", en: "Can traditional and modern medicine work together?" },
      { zh: "饮食习惯如何影响一个人的健康观？", en: "How do eating habits shape a view of health?" },
    ],
    vocab: [
      { hanzi: "中医", pinyin: "zhōngyī", pos: "名", en: "Chinese medicine", example: "她去看中医调理睡眠。", exampleEn: "She saw a Chinese-medicine doctor about sleep." },
      { hanzi: "针灸", pinyin: "zhēnjiǔ", pos: "名", en: "acupuncture", example: "针灸被一些人用来缓解疼痛。", exampleEn: "Some people use acupuncture for pain." },
      { hanzi: "调理", pinyin: "tiáolǐ", pos: "动", en: "to regulate / nurse back", example: "冬天适合用食物调理身体。", exampleEn: "Winter is a time to regulate the body with food." },
      { hanzi: "上火", pinyin: "shànghuǒ", pos: "动", en: "to suffer internal heat", example: "他嘴角起泡，说自己上火了。", exampleEn: "He got a mouth ulcer and said he had internal heat." },
      { hanzi: "草药", pinyin: "cǎoyào", pos: "名", en: "herbal medicine", example: "这碗汤药很苦，但她还是喝完了。", exampleEn: "The herbal decoction was bitter, but she finished it." },
      { hanzi: "养生", pinyin: "yǎngshēng", pos: "动", en: "to preserve health", example: "养生在年轻人里也越来越流行。", exampleEn: "Health-preserving habits are fashionable among the young too." },
      { hanzi: "安慰", pinyin: "ānwèi", pos: "动/名", en: "to comfort / comfort", example: "有时热汤的作用首先是安慰。", exampleEn: "Sometimes a hot soup comforts before it cures." },
      { hanzi: "科学", pinyin: "kēxué", pos: "名/形", en: "science / scientific", example: "我们需要用科学方法检验传统疗法。", exampleEn: "Traditional therapies need scientific testing." },
    ],
    related: ["tianren", "chadao", "yinshi", "jieqi"],
  },
  {
    slug: "chunjie",
    theme: "experiences",
    title: "春节团圆",
    titleEn: "Spring Festival reunion",
    subtitle: "一年的路，都是为了这一顿饭。",
    ibLens: "Experiences · Customs & holidays",
    image: "/images/topics/chunjie.jpg",
    imageAlt: "孩子接过红包",
    minutes: 6,
    paragraphs: [
      {
        zh: "春节是中国人最重要的时间机器。除夕团圆饭、红包、春联、拜年，把分散一年的人拉回同一张桌子。对在外工作的人，春运再挤也要回家，因为「年」不只是假期，而是一种必须兑现的关系。",
        en: "Spring Festival is China’s strongest time machine. Reunion dinner, red envelopes, couplets and New Year visits pull people who scattered for a year back to one table. Workers endure the Chunyun crush because the year is not only a holiday — it is a relationship that must be honoured.",
      },
      {
        zh: "团圆饭的菜单各地不同：北方饺子，南方鱼和年糕，寓意「年年有余」「步步高」。孩子们等红包，长辈等一句「过年好」。热闹底下也有压力：催婚、比成绩、比房子。节日既是温暖，也是展览。",
        en: "Menus change with the map: dumplings in the north, fish and rice cake in the south — surplus and rising steps. Children wait for envelopes; elders wait for “happy new year”. Under the noise sits pressure: marriage, grades, apartments. A festival is warmth and a display.",
      },
      {
        zh: "口语里描述一顿具体的年夜饭：谁坐上座、什么菜先上、谁负责洗碗。细节比形容词更有分。也可以比较你自己的重大节日：你们为了见面，愿意走多远？",
        en: "In the oral, describe one concrete reunion dinner: who sits in the seat of honour, which dish arrives first, who washes up. Detail scores higher than adjectives. Compare your own high festival: how far will you travel just to sit together?",
      },
    ],
    oralPrompts: [
      { zh: "描述你家的一顿团圆饭。", en: "Describe a reunion meal in your family." },
      { zh: "红包对孩子意味着什么？对大人呢？", en: "What does a red envelope mean to a child? To an adult?" },
      { zh: "春节回家是义务还是心愿？", en: "Is going home for Spring Festival a duty or a wish?" },
      { zh: "比较春节和你国家最重要的节日。", en: "Compare Spring Festival with the most important festival in your country." },
    ],
    vocab: [
      { hanzi: "团圆", pinyin: "tuányuán", pos: "动/名", en: "reunion", example: "春节是团圆的日子。", exampleEn: "Spring Festival is a time of reunion." },
      { hanzi: "除夕", pinyin: "chúxī", pos: "名", en: "Lunar New Year’s Eve", example: "除夕晚上我们一起看晚会。", exampleEn: "On New Year’s Eve we watch the gala together." },
      { hanzi: "红包", pinyin: "hóngbāo", pos: "名", en: "red envelope", example: "小孩最期待的就是红包。", exampleEn: "What children look forward to most is the red envelope." },
      { hanzi: "春联", pinyin: "chūnlián", pos: "名", en: "spring couplets", example: "门上贴着新的春联。", exampleEn: "New couplets are pasted on the door." },
      { hanzi: "拜年", pinyin: "bàinián", pos: "动", en: "to give New Year greetings", example: "我们去爷爷家拜年。", exampleEn: "We go to grandfather’s house to offer New Year greetings." },
      { hanzi: "年夜饭", pinyin: "niányèfàn", pos: "名", en: "reunion dinner", example: "年夜饭一定要有鱼。", exampleEn: "There must be fish at the reunion dinner." },
      { hanzi: "热闹", pinyin: "rènao", pos: "形", en: "lively / bustling", example: "家里一下子变得很热闹。", exampleEn: "The house suddenly became lively." },
      { hanzi: "习俗", pinyin: "xísú", pos: "名", en: "custom", example: "每个地方的春节习俗都不完全一样。", exampleEn: "Spring Festival customs are not identical everywhere." },
    ],
    related: ["chunyun", "jieri", "daike", "xiao-dao"],
  },
  {
    slug: "jieri",
    theme: "experiences",
    title: "岁时节日",
    titleEn: "The festival year",
    subtitle: "元宵灯，清明纸，端午粽，中秋月，重阳菊。",
    ibLens: "Experiences · Customs & traditions",
    image: "/images/topics/jieri.jpg",
    imageAlt: "河上的元宵灯会",
    minutes: 6,
    paragraphs: [
      {
        zh: "中国的节日跟着月亮走。元宵吃汤圆、看灯；清明扫墓、踏青，有人烧纸钱，希望先人在地下也能使用；端午包粽子、赛龙舟，纪念和驱邪缠在一起；中秋赏月吃月饼；重阳登高、看菊花、敬老。一条年历，就是一部关于时间的诗。",
        en: "Chinese festivals follow the moon. Lanterns and rice balls at Yuanxiao; tomb-sweeping and spring walks at Qingming, sometimes with paper money for the dead; zongzi and dragon boats at Duanwu; mooncakes at Mid-Autumn; climbing and chrysanthemums at Chongyang. A calendar is a poem about time.",
      },
      {
        zh: "西方节日也进入了城市：平安夜的灯、圣诞树、情人节的玫瑰。它们很少取代春节，却改变了年轻人的约会方式。传统节日要活下去，得有味道、有仪式，也得允许新的玩法——否则只剩超市货架上的礼盒。",
        en: "Western dates have entered the city: Christmas Eve lights, trees, Valentine roses. They rarely replace Spring Festival, but they change how the young date. A tradition survives if it still has flavour and ritual — and room for new play. Otherwise it is only a gift box on a supermarket shelf.",
      },
      {
        zh: "口语里选一个节日深讲：你做过灯笼吗？吃过冷的粽子吗？清明对你来说是悲伤还是春游？比较比罗列更有分数。",
        en: "In the oral, go deep on one festival: have you made a lantern? Eaten a cold zongzi? Is Qingming grief or a spring outing? Comparison scores higher than a list.",
      },
    ],
    oralPrompts: [
      { zh: "选一个中国传统节日，详细介绍它的活动和食物。", en: "Choose one traditional festival and describe its activities and food." },
      { zh: "为什么有人在清明烧纸钱？你怎么看？", en: "Why do some people burn paper money at Qingming? What do you think?" },
      { zh: "西方节日进入中国，是丰富还是冲击？", en: "Have Western festivals enriched or disrupted Chinese festival life?" },
      { zh: "如果只能保留一个节日，你保留哪一个？", en: "If you could keep only one festival, which would it be?" },
    ],
    vocab: [
      { hanzi: "元宵节", pinyin: "Yuánxiāo jié", pos: "名", en: "Lantern Festival", example: "元宵节我们去看灯会。", exampleEn: "At Yuanxiao we go to the lantern fair." },
      { hanzi: "清明", pinyin: "Qīngmíng", pos: "名", en: "Tomb-Sweeping Day", example: "清明节我们去扫墓。", exampleEn: "At Qingming we sweep the tombs." },
      { hanzi: "端午", pinyin: "Duānwǔ", pos: "名", en: "Dragon Boat Festival", example: "端午的粽子有甜的也有咸的。", exampleEn: "Duanwu zongzi can be sweet or savoury." },
      { hanzi: "中秋", pinyin: "Zhōngqiū", pos: "名", en: "Mid-Autumn Festival", example: "中秋夜我们一起赏月。", exampleEn: "On Mid-Autumn night we admire the moon together." },
      { hanzi: "重阳", pinyin: "Chóngyáng", pos: "名", en: "Double Ninth Festival", example: "重阳节有登高和敬老的习俗。", exampleEn: "Chongyang includes climbing high and honouring the old." },
      { hanzi: "纸钱", pinyin: "zhǐqián", pos: "名", en: "joss paper / spirit money", example: "有人相信纸钱能被先人使用。", exampleEn: "Some believe paper money can be used by ancestors." },
      { hanzi: "纪念", pinyin: "jìniàn", pos: "动", en: "to commemorate", example: "龙舟据说是为了纪念屈原。", exampleEn: "Dragon boats are said to commemorate Qu Yuan." },
      { hanzi: "仪式", pinyin: "yíshì", pos: "名", en: "ritual / ceremony", example: "节日需要一点仪式感。", exampleEn: "A festival needs a sense of ritual." },
    ],
    related: ["chunjie", "rensheng", "jieqi", "yanglao"],
  },
  {
    slug: "rensheng",
    theme: "experiences",
    title: "人生礼仪",
    titleEn: "Rites of a life",
    subtitle: "满月、抓周、婚礼、寿宴：用仪式把时间钉住。",
    ibLens: "Experiences · Life stories / rites of passage",
    image: "/images/topics/rensheng.jpg",
    imageAlt: "婚礼敬茶",
    minutes: 5,
    paragraphs: [
      {
        zh: "中国人用酒席标记人生。孩子满月要请客；一周岁抓周：面前摆钱、笔、书、乐器、算盘，看孩子抓什么，家人就笑着说这是兴趣或天赋。婚礼要敬茶；六十、八十要办寿宴。仪式告诉亲戚：这个人被承认了。",
        en: "Chinese life is marked with banquets. A full-month feast for a baby; at one year, zhuazhou — money, a pen, books, an instrument, an abacus — and the family jokes that the first grasp is talent. Weddings include a tea ceremony; sixtieth and eightieth birthdays become longevity feasts. Ritual tells the relatives: this person is recognised.",
      },
      {
        zh: "城市里有人简化这些礼，有人把它做成更豪华的展览。无论繁简，核心都是当众确认关系：谁来、谁坐上桌、红包多重，都在说话。对 IB 学生，这是很好的「经历」素材——你参加过谁的婚礼？你记得哪一道菜？",
        en: "In cities some people simplify the rites; others turn them into luxury displays. Simple or lavish, the core is public recognition of a relationship: who comes, who sits at the main table, how heavy the envelope is. For IB this is rich “experience” material — whose wedding have you attended? Which dish do you remember?",
      },
      {
        zh: "抓周当然不是科学测验，它是一种温柔的预言：大人把希望摊在桌上，让孩子随便抓。人生礼仪多半如此——一半给当事人，一半给围观的家族。",
        en: "Zhuazhou is not a scientific test. It is a gentle prophecy: adults lay their hopes on a table and let the child grab. Most life rites are like that — half for the person, half for the watching clan.",
      },
    ],
    oralPrompts: [
      { zh: "描述一次你参加过的婚礼或寿宴。", en: "Describe a wedding or longevity banquet you have attended." },
      { zh: "抓周有意思还是迷信？你怎么看？", en: "Is the one-year catch charming or superstitious? What do you think?" },
      { zh: "人生中哪些时刻值得举行仪式？", en: "Which moments in a life deserve a ceremony?" },
      { zh: "比较你家和中国家庭如何庆祝生日。", en: "Compare how your family and a Chinese family celebrate birthdays." },
    ],
    vocab: [
      { hanzi: "满月", pinyin: "mǎnyuè", pos: "名", en: "full-month celebration", example: "孩子满月时，家里请了亲戚吃饭。", exampleEn: "At the full-month they invited relatives to eat." },
      { hanzi: "抓周", pinyin: "zhuāzhōu", pos: "名", en: "one-year-old catch", example: "抓周时他抓了一支笔。", exampleEn: "At zhuazhou he grabbed a pen." },
      { hanzi: "婚礼", pinyin: "hūnlǐ", pos: "名", en: "wedding", example: "中式婚礼常有敬茶的环节。", exampleEn: "A Chinese wedding often includes serving tea." },
      { hanzi: "寿宴", pinyin: "shòuyàn", pos: "名", en: "longevity banquet", example: "爷爷八十岁的寿宴很热闹。", exampleEn: "Grandfather’s eightieth banquet was lively." },
      { hanzi: "仪式", pinyin: "yíshì", pos: "名", en: "ceremony", example: "仪式让平常的一天变得重要。", exampleEn: "Ceremony makes an ordinary day important." },
      { hanzi: "天赋", pinyin: "tiānfù", pos: "名", en: "gift / talent", example: "家人笑着说这是他的天赋。", exampleEn: "The family joked that this was his gift." },
      { hanzi: "长寿", pinyin: "chángshòu", pos: "名/形", en: "longevity / long-lived", example: "寿面象征长寿。", exampleEn: "Longevity noodles symbolise a long life." },
      { hanzi: "亲戚", pinyin: "qīnqi", pos: "名", en: "relative", example: "远方的亲戚也赶回来参加婚礼。", exampleEn: "Relatives from far away rushed back for the wedding." },
    ],
    related: ["chunjie", "daike", "xiao-dao", "yanglao"],
  },
  {
    slug: "daike",
    theme: "experiences",
    title: "待客之道",
    titleEn: "The art of hosting",
    subtitle: "先倒茶，再说话；把最好的留给客人。",
    ibLens: "Experiences · Social customs",
    image: "/images/topics/daike.jpg",
    imageAlt: "主人在门口迎客",
    minutes: 5,
    paragraphs: [
      {
        zh: "中国式待客有一套看不见的剧本：客人进门先换鞋或被让到上座，茶和瓜子马上上来，饭桌上不停夹菜，「吃好了」之后主人还会再劝一碗。客人要客气地推辞，主人要热情地坚持。两边都在演戏，但戏的名字叫尊重。",
        en: "Chinese hosting has an invisible script: shoes off or the seat of honour, tea and seeds at once, food piled onto your bowl, one more serving after you say you are full. The guest declines; the host insists. Both are acting. The play is called respect.",
      },
      {
        zh: "浪费和面子在这里打架。菜点得太多，是怕客人觉得你小气；客人吃不完，又怕主人没面子。懂待客的人会看：对方是真的要你喝，还是给你一个台阶。旅行时，这套剧本能帮你少踩雷。",
        en: "Waste and face collide here. Too many dishes, lest you look stingy; leftovers, lest the host lose face. A good guest reads whether a toast is real pressure or a way out. On a trip, knowing the script saves you from landmines.",
      },
      {
        zh: "口语里可以角色扮演：你去中国同学家吃饭，不会喝酒、吃不了辣，怎么说才既诚实又不冷淡？待客是跨文化最容易扣分、也最容易加分的现场。",
        en: "Role-play in the oral: you eat at a Chinese classmate’s home, you do not drink and cannot take chilli — how do you say so honestly without going cold? Hosting is where intercultural marks are most often lost, and won.",
      },
    ],
    oralPrompts: [
      { zh: "如果主人一直给你夹菜，你会怎么做？", en: "If a host keeps putting food in your bowl, what do you do?" },
      { zh: "待客一定要丰盛吗？简单是否也可以热情？", en: "Must hospitality be lavish? Can simple also be warm?" },
      { zh: "描述一次你觉得「被照顾得有点过头」的经历。", en: "Describe a time you felt cared for a little too much." },
      { zh: "比较你家待客和中国家庭待客的不同。", en: "Compare hosting in your home and in a Chinese home." },
    ],
    vocab: [
      { hanzi: "待客", pinyin: "dàikè", pos: "动", en: "to receive guests", example: "她家很会待客。", exampleEn: "Her family is good at receiving guests." },
      { hanzi: "热情", pinyin: "rèqíng", pos: "形/名", en: "warm / enthusiasm", example: "主人热情得让我有点不好意思。", exampleEn: "The host was so warm I felt a little shy." },
      { hanzi: "客气", pinyin: "kèqi", pos: "形", en: "polite / modest", example: "别客气，当自己家。", exampleEn: "Don’t be polite — make yourself at home." },
      { hanzi: "上座", pinyin: "shàngzuò", pos: "名", en: "seat of honour", example: "客人被让到上座。", exampleEn: "The guest was shown to the seat of honour." },
      { hanzi: "推辞", pinyin: "tuīcí", pos: "动", en: "to decline politely", example: "她推辞了第三次敬酒。", exampleEn: "She politely declined the third toast." },
      { hanzi: "招待", pinyin: "zhāodài", pos: "动", en: "to host / entertain", example: "他们用一桌家乡菜招待我们。", exampleEn: "They hosted us with a table of hometown dishes." },
      { hanzi: "浪费", pinyin: "làngfèi", pos: "动/名", en: "to waste / waste", example: "点太多菜会造成浪费。", exampleEn: "Ordering too many dishes creates waste." },
      { hanzi: "礼貌", pinyin: "lǐmào", pos: "名", en: "manners / politeness", example: "礼貌有时比礼物更重要。", exampleEn: "Manners can matter more than a gift." },
    ],
    related: ["mianzi", "jiuculture", "yinshi", "renqing"],
  },
  {
    slug: "chadao",
    theme: "experiences",
    title: "茶文化",
    titleEn: "Tea culture",
    subtitle: "绿茶求鲜，红茶求火，普洱求时间。",
    ibLens: "Experiences · Leisure / customs",
    image: "/images/topics/chadao.jpg",
    imageAlt: "盖碗与龙井",
    minutes: 5,
    paragraphs: [
      {
        zh: "茶在中国不是一种饮料那么简单。绿茶——龙井、毛峰——讲究产地和鲜，清明前后的春茶最被珍视。红茶全发酵，味道更稳。乌龙在中间。普洱论年份，像酒。花茶常被当成「茶饮料」：茉莉、菊花，香气先于茶味。",
        en: "Tea in China is more than a drink. Green teas — Longjing, Maofeng — prize origin and freshness; pre-Qingming spring pick is treasured. Black tea is fully oxidised and steadier. Oolong sits in between. Puer is sold by year, like wine. Flower teas often drink as perfume first: jasmine, chrysanthemum.",
      },
      {
        zh: "功夫茶不是表演，是把水、器、时间练成习惯。办公室里的茶包和茶馆里的盖碗，属于两种速度。请人喝茶，可以是闲聊，也可以是谈事——比酒桌温和，但同样有座位和顺序。",
        en: "Gongfu tea is not a show; it is water, ware and time made into habit. A bag in the office and a gaiwan in a teahouse belong to two speeds. Inviting someone to tea can be chat or negotiation — gentler than a liquor table, but still seated and sequenced.",
      },
      {
        zh: "口语里带一个具体品牌或产区，比说「中国人爱喝茶」更有画面。你也可以比较咖啡文化：哪一种更适合学习？哪一种更适合谈话？",
        en: "Name a concrete tea or region — it paints more than “Chinese people love tea”. Compare coffee culture: which suits study? Which suits talk?",
      },
    ],
    oralPrompts: [
      { zh: "你更喜欢茶还是咖啡？在什么场合？", en: "Do you prefer tea or coffee, and on what occasion?" },
      { zh: "为什么明前绿茶特别贵？", en: "Why is pre-Qingming green tea especially expensive?" },
      { zh: "请人喝茶和请人喝酒，气氛有什么不同？", en: "How does inviting someone to tea differ from inviting them to drink?" },
      { zh: "描述一次泡茶或喝茶的过程。", en: "Describe the process of brewing or drinking tea once." },
    ],
    vocab: [
      { hanzi: "绿茶", pinyin: "lǜchá", pos: "名", en: "green tea", example: "龙井是最有名的绿茶之一。", exampleEn: "Longjing is one of the best-known green teas." },
      { hanzi: "红茶", pinyin: "hóngchá", pos: "名", en: "black tea", example: "红茶经过完全发酵。", exampleEn: "Black tea is fully oxidised." },
      { hanzi: "普洱", pinyin: "pǔ'ěr", pos: "名", en: "puer tea", example: "好的普洱可以存放很多年。", exampleEn: "Good puer can be aged for many years." },
      { hanzi: "功夫茶", pinyin: "gōngfu chá", pos: "名", en: "gongfu tea service", example: "他用功夫茶招待客人。", exampleEn: "He received guests with a gongfu tea service." },
      { hanzi: "产地", pinyin: "chǎndì", pos: "名", en: "place of origin", example: "茶的产地会大大影响味道。", exampleEn: "Origin greatly affects the taste of tea." },
      { hanzi: "年份", pinyin: "niánfèn", pos: "名", en: "vintage / year", example: "这饼茶的年份很老。", exampleEn: "This cake of tea is from an old year." },
      { hanzi: "香气", pinyin: "xiāngqì", pos: "名", en: "aroma", example: "茉莉花茶的香气很浓。", exampleEn: "Jasmine tea has a strong aroma." },
      { hanzi: "品尝", pinyin: "pǐncháng", pos: "动", en: "to taste / savour", example: "我们慢慢品尝这杯春茶。", exampleEn: "We slowly savoured the spring tea." },
    ],
    related: ["jiuculture", "yinshi", "zhongyi-shenti", "daike"],
  },
  {
    slug: "jiuculture",
    theme: "experiences",
    title: "酒文化",
    titleEn: "Drinking culture",
    subtitle: "啤酒、白酒、红酒，酒桌上藏着权力。",
    ibLens: "Experiences · Social life / health",
    image: "/images/topics/jiuculture.jpg",
    imageAlt: "宴席上的酒杯",
    minutes: 6,
    paragraphs: [
      {
        zh: "中国疾控中心 2024 年全国调查（2026 年发表）显示：15 岁及以上人口中，过去一年喝过酒的占 27.6%，过去 30 天喝过的占 20.3%。男女差距很大——男性近一年饮酒率 44.5%，女性 10.2%。数字说明：喝酒很常见，但远不是「人人都喝」。",
        en: "A 2024 China CDC national survey (published 2026) found that among people 15 and older, 27.6% had drunk in the past year and 20.3% in the past 30 days. The gender gap is wide — 44.5% of men, 10.2% of women. Drinking is common; it is not universal.",
      },
      {
        zh: "酒桌上的文化有时并不健康。你不会喝，别人仍可能劝你。表面是热情，底下可能是权力测试：谁先干、谁陪领导、谁能拒绝。白酒度数高，啤酒显得轻松，红酒带着「品味」。选择喝什么，也是在选择你想加入哪一张桌子。",
        en: "Table culture can be unhealthy. You may be pressed to drink even if you do not want to. Warmth on the surface, a power test underneath: who empties first, who sits with the boss, who may refuse. Strong baijiu, easy beer, “tasteful” wine — what you drink is also which table you join.",
      },
      {
        zh: "口语里要会保护自己：微笑、以茶代酒、说明身体原因，比硬扛更成熟。也可以讨论：一种文化如果需要酒精来建立信任，它的信任是不是太脆？",
        en: "In the oral, practise protecting yourself: a smile, tea instead of liquor, a health reason — more mature than forcing it down. You can also ask: if a culture needs alcohol to build trust, how brittle is that trust?",
      },
    ],
    oralPrompts: [
      { zh: "你怎么看待劝酒？", en: "What do you think of pressing others to drink?" },
      { zh: "为什么酒桌有时会变成权力游戏？", en: "Why does a drinking table sometimes become a power game?" },
      { zh: "年轻人可以用什么方式拒绝喝酒又不失礼？", en: "How can young people refuse a drink without being rude?" },
      { zh: "比较中国酒文化和你国家的派对文化。", en: "Compare Chinese drinking culture with party culture in your country." },
    ],
    vocab: [
      { hanzi: "白酒", pinyin: "báijiǔ", pos: "名", en: "baijiu / sorghum liquor", example: "白酒的度数通常很高。", exampleEn: "Baijiu is usually very strong." },
      { hanzi: "啤酒", pinyin: "píjiǔ", pos: "名", en: "beer", example: "夏天很多人喜欢喝啤酒。", exampleEn: "In summer many people like beer." },
      { hanzi: "敬酒", pinyin: "jìngjiǔ", pos: "动", en: "to toast", example: "晚辈应该主动给长辈敬酒。", exampleEn: "Juniors are expected to toast their elders." },
      { hanzi: "以茶代酒", pinyin: "yǐ chá dài jiǔ", pos: "习语", en: "to substitute tea for wine", example: "我开车，就以茶代酒吧。", exampleEn: "I’m driving, so I’ll drink tea instead." },
      { hanzi: "酒精", pinyin: "jiǔjīng", pos: "名", en: "alcohol", example: "过量酒精伤害身体。", exampleEn: "Too much alcohol harms the body." },
      { hanzi: "应酬", pinyin: "yìngchou", pos: "动/名", en: "social entertaining", example: "他讨厌没完没了的应酬。", exampleEn: "He hates endless work entertaining." },
      { hanzi: "克制", pinyin: "kèzhì", pos: "动", en: "to restrain oneself", example: "在酒桌上保持克制并不容易。", exampleEn: "Restraint at the table is not easy." },
      { hanzi: "健康", pinyin: "jiànkāng", pos: "名/形", en: "health / healthy", example: "为了健康，他决定少喝酒。", exampleEn: "For his health he decided to drink less." },
    ],
    related: ["mianzi", "daike", "renqing", "zhongyi-shenti"],
  },
  {
    slug: "yinshi",
    theme: "experiences",
    title: "八大菜系",
    titleEn: "The eight cuisines",
    subtitle: "南甜北咸，一边是家，一边是地图。",
    ibLens: "Experiences · Leisure / travel",
    image: "/images/topics/yinshi.jpg",
    imageAlt: "沸腾的火锅",
    minutes: 5,
    paragraphs: [
      {
        zh: "中国菜不是一种味道。川菜的麻辣、粤菜的鲜、鲁菜的咸香、淮扬的清、杭帮的雅，再加上街边小吃，构成一张可以走的地图。主食是碳水化合物：米饭、面条、包子、馒头；菜和汤在周围；零食是另一件事。筷子是工具，也是节奏。",
        en: "Chinese food is not one taste. Sichuan heat, Cantonese freshness, Shandong salt-and-savour, Huaiyang clarity, Hangzhou elegance, plus street snacks — a map you can walk. Staples are carbohydrates: rice, noodles, bao, mantou; dishes and soups around them; snacks another story. Chopsticks are a tool and a tempo.",
      },
      {
        zh: "「南甜北咸」是粗线条，却很好用。旅行时，点一份当地最普通的午饭，比打卡网红店更能懂一个地方。火锅、饺子、地方小吃，都是集体经验：一个人吃也可以，但菜是为桌子设计的。",
        en: "“Sweet south, salty north” is crude and useful. On a trip, an ordinary local lunch teaches more than a viral restaurant. Hotpot, dumplings, street snacks are collective experiences: you can eat alone, but the dishes were designed for a table.",
      },
      {
        zh: "口语里避免只报菜名。讲温度、声音、谁坐在旁边。也可以谈变化：年轻人点外卖、喝奶茶，传统菜系还在家庭圆桌上活着。",
        en: "In the oral, do more than list dishes. Talk temperature, sound, who sits beside you. Talk change too: the young order delivery and milk tea, while the old cuisines still live on the family round table.",
      },
    ],
    oralPrompts: [
      { zh: "如果外国朋友只吃得了一顿中国菜，你带什么？", en: "If a foreign friend could eat only one Chinese meal, what would you choose?" },
      { zh: "火锅为什么适合朋友聚会？", en: "Why is hotpot good for gathering friends?" },
      { zh: "外卖改变了人们的饮食习惯吗？", en: "Has food delivery changed how people eat?" },
      { zh: "比较你家的家常菜和中国菜。", en: "Compare your home cooking with Chinese food." },
    ],
    vocab: [
      { hanzi: "菜系", pinyin: "càixì", pos: "名", en: "cuisine school", example: "中国有著名的八大菜系。", exampleEn: "China has eight famous cuisine schools." },
      { hanzi: "主食", pinyin: "zhǔshí", pos: "名", en: "staple food", example: "南方的主食多是米饭。", exampleEn: "The southern staple is mostly rice." },
      { hanzi: "火锅", pinyin: "huǒguō", pos: "名", en: "hotpot", example: "冬天我们常吃火锅。", exampleEn: "In winter we often eat hotpot." },
      { hanzi: "街头小吃", pinyin: "jiētóu xiǎochī", pos: "名", en: "street food", example: "夜市里有很多街头小吃。", exampleEn: "The night market is full of street food." },
      { hanzi: "口味", pinyin: "kǒuwèi", pos: "名", en: "taste / flavour preference", example: "我吃不惯太辣的口味。", exampleEn: "I can’t get used to very spicy flavours." },
      { hanzi: "家常菜", pinyin: "jiāchángcài", pos: "名", en: "home-style dish", example: "我最想吃的还是妈妈的家常菜。", exampleEn: "What I miss most is Mum’s home cooking." },
      { hanzi: "麻辣", pinyin: "málà", pos: "形", en: "numbing-spicy", example: "川菜的特点是麻辣。", exampleEn: "Sichuan food is known for being numbing-spicy." },
      { hanzi: "清淡", pinyin: "qīngdàn", pos: "形", en: "light / delicate", example: "粤菜相对比较清淡。", exampleEn: "Cantonese food is relatively light." },
    ],
    related: ["chadao", "daike", "waimai", "chunjie"],
  },
  {
    slug: "mingsheng",
    theme: "experiences",
    title: "名胜古迹",
    titleEn: "Famous places",
    subtitle: "不到长城非好汉；故宫里住过故事。",
    ibLens: "Experiences · Holidays & travel",
    image: "/images/topics/mingsheng.jpg",
    imageAlt: "日出时的长城",
    minutes: 5,
    paragraphs: [
      {
        zh: "长城、故宫、兵马俑、江南古镇，是中国旅行的「必背课文」。它们漂亮，也拥挤。好的游览不是打卡，而是把地方读成文本：城墙为什么修在山脊上？故宫的中轴说明什么权力？兵马俑的脸为什么每一张都不同？",
        en: "The Wall, the Forbidden City, the terracotta army, Jiangnan old towns — the set texts of China travel. They are beautiful and crowded. A good visit is not a stamp; it is reading a place: why a wall on a ridge, what the palace axis says about power, why no two terracotta faces match.",
      },
      {
        zh: "「故」这个字很有用：故宫是从前的皇宫，故人是老朋友，故事是以前的事。参观时你走在别人的时间里。博物馆里的国宝把私人的手艺变成公共记忆。旅游可以很浅，也可以变成一种历史课。",
        en: "The character 故 is useful: 故宫, former palace; 故人, old friend; 故事, old matter. You walk in other people’s time. Museum treasures turn private craft into public memory. Tourism can be thin, or a history lesson.",
      },
      {
        zh: "口语里选一个你真的去过或认真看过的地方，讲路线、天气、人流和一句你记住的解说。比背百科更像「经历」。",
        en: "Pick a place you have really visited or studied. Talk route, weather, crowds, and one line of explanation you remember. That sounds like experience, not an encyclopaedia.",
      },
    ],
    oralPrompts: [
      { zh: "如果只能去中国一个景点，你去哪里？为什么？", en: "If you could visit only one site in China, where and why?" },
      { zh: "旅游人太多时，名胜古迹还会有意义吗？", en: "When sites are overcrowded, do they still mean something?" },
      { zh: "博物馆和古镇，哪一种旅行你更喜欢？", en: "Which trip do you prefer, a museum or an old town?" },
      { zh: "「不到长城非好汉」在今天还成立吗？", en: "Does “he who has not been to the Wall is not a true hero” still hold?" },
    ],
    vocab: [
      { hanzi: "名胜古迹", pinyin: "míngshèng gǔjì", pos: "名", en: "scenic spots and historic sites", example: "这个城市有很多名胜古迹。", exampleEn: "This city has many famous historic sites." },
      { hanzi: "故宫", pinyin: "Gùgōng", pos: "名", en: "the Forbidden City", example: "故宫曾经是皇帝的宫殿。", exampleEn: "The Forbidden City was once the emperor’s palace." },
      { hanzi: "长城", pinyin: "Chángchéng", pos: "名", en: "the Great Wall", example: "我们天亮就出发去长城。", exampleEn: "We set out for the Wall at dawn." },
      { hanzi: "兵马俑", pinyin: "bīngmǎyǒng", pos: "名", en: "terracotta warriors", example: "兵马俑的表情各不相同。", exampleEn: "The terracotta warriors’ faces are all different." },
      { hanzi: "博物馆", pinyin: "bówùguǎn", pos: "名", en: "museum", example: "博物馆里收藏着许多国宝。", exampleEn: "The museum holds many national treasures." },
      { hanzi: "古镇", pinyin: "gǔzhèn", pos: "名", en: "ancient town", example: "江南古镇适合慢慢走。", exampleEn: "Jiangnan old towns are for walking slowly." },
      { hanzi: "游览", pinyin: "yóulǎn", pos: "动", en: "to tour / visit", example: "我们花了一天游览故宫。", exampleEn: "We spent a day touring the Forbidden City." },
      { hanzi: "遗产", pinyin: "yíchǎn", pos: "名", en: "heritage", example: "这些建筑是人类共同的遗产。", exampleEn: "These buildings are a shared human heritage." },
    ],
    related: ["chunyun", "chuantong-yishu", "gaotie", "chuantong-xiandai"],
  },
  {
    slug: "chunyun",
    theme: "experiences",
    title: "春运回家",
    titleEn: "The Chunyun journey home",
    subtitle: "世界上最大的人类迁徙，目的地往往只是一碗汤。",
    ibLens: "Experiences · Travel / life stories",
    image: "/images/topics/chunyun.jpg",
    imageAlt: "春运车站",
    minutes: 5,
    paragraphs: [
      {
        zh: "春运是春节前后的大规模回家潮。高铁让路程变短，但车票仍然紧张。行李箱、羽绒、站台上的热气，组成一种只在那时出现的国家风景。对农民工和在大城市上班的年轻人，回家不是度假，是把一年的自己交回去给父母看一眼。",
        en: "Chunyun is the vast homeward rush around Spring Festival. High-speed rail shortened the road; tickets stay tight. Suitcases, down coats, steam on platforms — a national landscape that exists only then. For migrant workers and city youth, going home is not a holiday. It is handing a year’s self back to parents for a look.",
      },
      {
        zh: "有人买不到票就留下「就地过年」，视频通话代替团圆饭。经历因此分裂：一部分人挤上车，一部分人在出租屋里吃外卖。两种过年，都在回答同一个问题：家在哪里？",
        en: "Some who cannot get a ticket “spend the year where they are”, a video call standing in for dinner. Experience splits: some squeeze onto trains, some eat delivery in a rented room. Two new years, one question: where is home?",
      },
      {
        zh: "口语里讲一次具体的旅途：晚点、陌生人让座、母亲在站台的等待。旅行主题在 IB 里很容易空，春运能让它落地。",
        en: "Tell one concrete journey: a delay, a stranger giving up a seat, a mother waiting on the platform. IB “travel” can float; Chunyun pins it down.",
      },
    ],
    oralPrompts: [
      { zh: "描述一张春运火车站的照片。", en: "Describe a photograph of a Chunyun railway station." },
      { zh: "为什么人们宁愿挤车也要回家？", en: "Why do people squeeze onto trains just to go home?" },
      { zh: "视频通话能代替团圆吗？", en: "Can a video call replace a reunion?" },
      { zh: "比较春运和你经历过的一次大迁徙或长途旅行。", en: "Compare Chunyun with a migration or long journey you have known." },
    ],
    vocab: [
      { hanzi: "春运", pinyin: "chūnyùn", pos: "名", en: "Spring Festival travel rush", example: "春运期间火车票很难买。", exampleEn: "Train tickets are hard to buy during Chunyun." },
      { hanzi: "回家", pinyin: "huíjiā", pos: "动", en: "to go home", example: "无论多远，他都要回家过年。", exampleEn: "However far, he goes home for the new year." },
      { hanzi: "迁徙", pinyin: "qiānxǐ", pos: "动/名", en: "migration", example: "春运像一场巨大的迁徙。", exampleEn: "Chunyun is like a vast migration." },
      { hanzi: "车票", pinyin: "chēpiào", pos: "名", en: "ticket", example: "他提前一个月抢车票。", exampleEn: "He grabbed tickets a month in advance." },
      { hanzi: "就地过年", pinyin: "jiùdì guònián", pos: "习语", en: "to spend the New Year where one is", example: "很多人选择就地过年。", exampleEn: "Many people choose to spend the New Year where they are." },
      { hanzi: "盼望", pinyin: "pànwàng", pos: "动", en: "to look forward to", example: "父母盼望孩子回来。", exampleEn: "Parents look forward to the children coming back." },
      { hanzi: "旅途", pinyin: "lǚtú", pos: "名", en: "journey", example: "这次旅途虽然辛苦，但很值得。", exampleEn: "The journey was hard but worth it." },
      { hanzi: "团圆", pinyin: "tuányuán", pos: "名", en: "reunion", example: "团圆对很多家庭比旅游更重要。", exampleEn: "For many families reunion matters more than tourism." },
    ],
    related: ["chunjie", "gaotie", "hukou", "jiating"],
  },
];

const identityPack = identityPackJson as TopicPack[];
const experiencePack = experiencePackJson as TopicPack[];
const ingenuityPack = ingenuityPackJson as TopicPack[];
const societyPack = societyPackJson as TopicPack[];
const planetPack = planetPackJson as TopicPack[];

const PACK_BY_SLUG = new Map(
  [...identityPack, ...experiencePack, ...ingenuityPack, ...societyPack, ...planetPack].map(
    (p) => [p.slug, p],
  ),
);

export const TOPICS: Topic[] = [...FIRST_TOPICS, ...MORE_TOPICS].map((raw) => {
  const pack = PACK_BY_SLUG.get(raw.slug);
  if (!pack) return normalizeTopic(raw);
  return normalizeTopic({
    ...raw,
    minutes: pack.minutes ?? raw.minutes,
    lookFor: pack.lookFor,
    sections: pack.sections,
    oralSkeleton: pack.oralSkeleton,
    oralPrompts: pack.oralPrompts,
    followUps: pack.followUps,
    vocab: pack.vocab?.length ? pack.vocab : raw.vocab,
  });
});

export function getTopic(slug: string): Topic | undefined {
  return TOPICS.find((t) => t.slug === slug);
}

export function topicsByTheme(theme: ThemeId): Topic[] {
  return TOPICS.filter((t) => t.theme === theme);
}

export function allVocab() {
  return TOPICS.flatMap((t) =>
    t.vocab.map((v) => ({ ...v, topicSlug: t.slug, theme: t.theme, topicTitle: t.title })),
  );
}

