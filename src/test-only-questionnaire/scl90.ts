import type { QuestionnaireFile } from "@/types/QuestionnaireFile";

export const scl90: QuestionnaireFile = {
    name: "SCL-90（90 项症状清单）",
    author: "L.R. Derogatis 等人；王征宇译",
    year: 1986,
    description:
        "SCL-90（Symptom Checklist-90）是一个有 90 项的症状自评量表。它一共有9个因子，覆盖面较广，可以准确地反映被试的自觉症状和问题及其严重程度和变化。（提示：该量表是精神症状（心理问题）筛查量表，而不是精神疾病诊断量表。其划界分是研究者提出的参考标准，即被试者超过该标准也并不意味着肯定有精神障碍或心理问题，仅提示其需要接受专业人员的进一步检查。）",
    answerTips:
        "本表结果评判采用中国成年人常模。下面题目列出了你可能存在的症状或困扰。请仔细阅读每一项，并根据你最近1周（包括今天）的实际感觉选择与你的情况最符合的选项。",
    resultTips:
        "在下方的表格中列出了总分和每个因子的得分。如果总分超过 160 分，或阳性项目数超过 43 个，或任意因子分大于 2 分，则需要进一步检查确认。 <br> <p>因子解释：</p> <ol> <li>躯体化：该因子主要反映主观的身体不适感；</li> <li>强迫症状：反映临床上的强迫症状群；</li> <li>人际关系敏感：主要指某些个人不自在感和自卑感，尤其是在与他人相比较时更突出； <li>抑郁：反映与临床上抑郁症状群相联系的广泛的概念； <li>焦虑：指在临床上明显与焦虑症状相联系的精神症状及体验；</li> <li>敌对：主要从思维、情感及行为3个方面来反映病人的敌对表现；</li> <li>恐怖：它与传统的恐怖状态或广场恐怖所反映的内容基本一致；</li> <li>偏执：主要是指猜疑和关系妄想等；</li> <li>精神病性：其中有幻听、思维播散、被洞悉感等反映精神分裂样症状项目。</li> </ol>",
    references: [
        "常用心理评估量表手册（第3版）",
        "https://www.gench.edu.cn/xlhp/2013/0704/c2343a18368/page.psp",
        "https://joukovaara.github.io/scale/SCL90.html",
        "https://arc.psych.wisc.edu/self-report/symptom-checklist-90-scl90/",
    ],
    options: [
        {
            label: "没有",
            score: 1,
        },
        {
            label: "轻度",
            score: 2,
        },
        {
            label: "中度",
            score: 3,
        },
        {
            label: "偏重",
            score: 4,
        },
        {
            label: "严重",
            score: 5,
        },
    ],
    questions: [
        {
            groupId: [0, 1],
            question: "头痛",
        },
        {
            groupId: [0, 5],
            question: "神经过敏，心中不踏实",
        },
        {
            groupId: [0, 2],
            question: "头脑中有不必要的想法或字句盘旋",
        },
        {
            groupId: [0, 1],
            question: "头昏或昏倒",
        },
        {
            groupId: [0, 4],
            question: "对异性的兴趣减退",
        },
        {
            groupId: [0, 3],
            question: "对旁人责备求全",
        },
        {
            groupId: [0, 9],
            question: "感到别人能控制你的思想",
        },
        {
            groupId: [0, 8],
            question: "责怪别人制造麻烦",
        },
        {
            groupId: [0, 2],
            question: "忘性大",
        },
        {
            groupId: [0, 2],
            question: "担心自己的衣饰整齐及仪态的端正",
        },
        {
            groupId: [0, 6],
            question: "容易烦恼和激动",
        },
        {
            groupId: [0, 1],
            question: "胸痛",
        },
        {
            groupId: [0, 7],
            question: "害怕空旷的场所或街道",
        },
        {
            groupId: [0, 4],
            question: "感到自己的精力下降，活动减慢",
        },
        {
            groupId: [0, 4],
            question: "想结束自己的生命",
        },
        {
            groupId: [0, 9],
            question: "听到旁人听不到的声音",
        },
        {
            groupId: [0, 5],
            question: "发抖",
        },
        {
            groupId: [0, 8],
            question: "感到大多数人都不可信任",
        },
        {
            groupId: [0, 10],
            question: "胃口不好",
        },
        {
            groupId: [0, 4],
            question: "容易哭泣",
        },
        {
            groupId: [0, 3],
            question: "同异性相处时感到害羞不自在",
        },
        {
            groupId: [0, 4],
            question: "感到受骗，中了圈套或有人想抓您",
        },
        {
            groupId: [0, 5],
            question: "无缘无故地突然感到害怕",
        },
        {
            groupId: [0, 6],
            question: "自己不能控制地大发脾气",
        },
        {
            groupId: [0, 7],
            question: "害怕单独出门",
        },
        {
            groupId: [0, 4],
            question: "经常责怪自己",
        },
        {
            groupId: [0, 1],
            question: "腰痛",
        },
        {
            groupId: [0, 2],
            question: "感到难以完成任务",
        },
        {
            groupId: [0, 4],
            question: "感到孤独",
        },
        {
            groupId: [0, 4],
            question: "感到苦闷",
        },
        {
            groupId: [0, 4],
            question: "过分担忧",
        },
        {
            groupId: [0, 4],
            question: "对事物不感兴趣",
        },
        {
            groupId: [0, 5],
            question: "感到害怕",
        },
        {
            groupId: [0, 3],
            question: "我的感情容易受到伤害",
        },
        {
            groupId: [0, 9],
            question: "旁人能知道你的私下想法",
        },
        {
            groupId: [0, 3],
            question: "感到别人不理解你、不同情你",
        },
        {
            groupId: [0, 3],
            question: "感到人们对你不友好，不喜欢你",
        },
        {
            groupId: [0, 2],
            question: "做事必须做得很慢以保证做得正确",
        },
        {
            groupId: [0, 5],
            question: "心跳得很厉害",
        },
        {
            groupId: [0, 1],
            question: "恶心或胃部不舒服",
        },
        {
            groupId: [0, 3],
            question: "感到比不上他人",
        },
        {
            groupId: [0, 1],
            question: "肌肉酸痛",
        },
        {
            groupId: [0, 8],
            question: "感到有人在监视你、谈论你",
        },
        {
            groupId: [0, 10],
            question: "难以入睡",
        },
        {
            groupId: [0, 2],
            question: "做事必须反复检查",
        },
        {
            groupId: [0, 2],
            question: "难以做出决定",
        },
        {
            groupId: [0, 7],
            question: "怕乘电车、公共汽车、地铁或火车",
        },
        {
            groupId: [0, 1],
            question: "呼吸有困难",
        },
        {
            groupId: [0, 1],
            question: "一阵阵发冷或发热",
        },
        {
            groupId: [0, 7],
            question: "因为感到害怕而避开某些东西、场合或活动",
        },
        {
            groupId: [0, 2],
            question: "脑子变空了",
        },
        {
            groupId: [0, 1],
            question: "身体发麻或刺痛",
        },
        {
            groupId: [0, 1],
            question: "喉咙有梗阻感",
        },
        {
            groupId: [0, 4],
            question: "感到没有前途、没有希望",
        },
        {
            groupId: [0, 2],
            question: "不能集中注意力",
        },
        {
            groupId: [0, 1],
            question: "感到身体某一部分软弱无力",
        },
        {
            groupId: [0, 5],
            question: "感到紧张或容易紧张",
        },
        {
            groupId: [0, 1],
            question: "感到手或脚发重",
        },
        {
            groupId: [0, 10],
            question: "想到死亡的事",
        },
        {
            groupId: [0, 10],
            question: "吃得太多",
        },
        {
            groupId: [0, 3],
            question: "当别人看着你或谈论你时感到不自在",
        },
        {
            groupId: [0, 9],
            question: "有一些不属于你自己的想法",
        },
        {
            groupId: [0, 6],
            question: "有想打人或伤害他人的冲动",
        },
        {
            groupId: [0, 10],
            question: "醒得太早",
        },
        {
            groupId: [0, 2],
            question: "必须反复洗手、点数目或触摸某些东西",
        },
        {
            groupId: [0, 10],
            question: "睡得不稳不深",
        },
        {
            groupId: [0, 6],
            question: "有想摔坏或破坏东西的冲动",
        },
        {
            groupId: [0, 8],
            question: "有一些别人没有的想法或念头",
        },
        {
            groupId: [0, 3],
            question: "感到对别人神经过敏",
        },
        {
            groupId: [0, 7],
            question: "在商店或电影院等人多的地方感到不自在",
        },
        {
            groupId: [0, 4],
            question: "感到任何事情都很困难",
        },
        {
            groupId: [0, 5],
            question: "感到一阵阵恐惧或惊恐",
        },
        {
            groupId: [0, 3],
            question: "感到在公共场合吃东西很不舒服",
        },
        {
            groupId: [0, 6],
            question: "经常与人争论",
        },
        {
            groupId: [0, 7],
            question: "单独一人时神经很紧张",
        },
        {
            groupId: [0, 8],
            question: "感到别人对你的成绩没有作出恰当的评价",
        },
        {
            groupId: [0, 9],
            question: "即使和别人在一起也感到孤独",
        },
        {
            groupId: [0, 5],
            question: "感到坐立不安、心神不定",
        },
        {
            groupId: [0, 4],
            question: "感到自己没有什么价值",
        },
        {
            groupId: [0, 5],
            question: "感到熟悉的东西变得陌生或不像是真的",
        },
        {
            groupId: [0, 6],
            question: "大叫或摔东西",
        },
        {
            groupId: [0, 7],
            question: "害怕会在公共场合昏倒",
        },
        {
            groupId: [0, 8],
            question: "感到别人想占你的便宜",
        },
        {
            groupId: [0, 9],
            question: "为一些有关“性”的想法而苦恼",
        },
        {
            groupId: [0, 9],
            question: "你认为应该因为自己的过错而受到惩罚",
        },
        {
            groupId: [0, 5],
            question: "想着要赶快把事情做完",
        },
        {
            groupId: [0, 9],
            question: "感到自己的身体有严重问题",
        },
        {
            groupId: [0, 9],
            question: "从未感到和其他人很亲近",
        },
        {
            groupId: [0, 10],
            question: "感到自己有罪",
        },
        {
            groupId: [0, 9],
            question: "感到自己的脑子有毛病",
        },
    ],
    scoring: [
        {
            groupId: 0,
            name: "总分",
            method: "sum",
            ranges: [],
        },
        {
            groupId: 1,
            name: "躯体化",
            method: "average",
            ranges: [
                {
                    name: "正常范围",
                    color: "green",
                    min: 0,
                    max: 1.85,
                },
                {
                    name: "中度",
                    color: "yellow",
                    min: 1.86,
                    max: 2.32,
                },
                {
                    name: "严重",
                    color: "red",
                    min: 2.33,
                    max: 5.0,
                },
            ],
        },
        {
            groupId: 2,
            name: "强迫症状",
            method: "average",
            ranges: [
                {
                    name: "正常范围",
                    color: "green",
                    min: 0,
                    max: 2.2,
                },
                {
                    name: "中度",
                    color: "yellow",
                    min: 2.21,
                    max: 2.77,
                },
                {
                    name: "严重",
                    color: "red",
                    min: 2.78,
                    max: 5.0,
                },
            ],
        },
        {
            groupId: 3,
            name: "人际关系敏感",
            method: "average",
            ranges: [
                {
                    name: "正常范围",
                    color: "green",
                    min: 0,
                    max: 2.26,
                },
                {
                    name: "中度",
                    color: "yellow",
                    min: 2.27,
                    max: 2.86,
                },
                {
                    name: "严重",
                    color: "red",
                    min: 2.87,
                    max: 5.0,
                },
            ],
        },
        {
            groupId: 4,
            name: "抑郁",
            method: "average",
            ranges: [
                {
                    name: "正常范围",
                    color: "green",
                    min: 0,
                    max: 2.09,
                },
                {
                    name: "中度",
                    color: "yellow",
                    min: 2.1,
                    max: 2.67,
                },
                {
                    name: "严重",
                    color: "red",
                    min: 2.68,
                    max: 5.0,
                },
            ],
        },
        {
            groupId: 5,
            name: "焦虑",
            method: "average",
            ranges: [
                {
                    name: "正常范围",
                    color: "green",
                    min: 0,
                    max: 1.82,
                },
                {
                    name: "中度",
                    color: "yellow",
                    min: 1.83,
                    max: 2.24,
                },
                {
                    name: "严重",
                    color: "red",
                    min: 2.25,
                    max: 5.0,
                },
            ],
        },
        {
            groupId: 6,
            name: "敌对",
            method: "average",
            ranges: [
                {
                    name: "正常范围",
                    color: "green",
                    min: 0,
                    max: 2.01,
                },
                {
                    name: "中度",
                    color: "yellow",
                    min: 2.02,
                    max: 2.55,
                },
                {
                    name: "严重",
                    color: "red",
                    min: 2.56,
                    max: 5.0,
                },
            ],
        },
        {
            groupId: 7,
            name: "恐怖",
            method: "average",
            ranges: [
                {
                    name: "正常范围",
                    color: "green",
                    min: 0,
                    max: 1.64,
                },
                {
                    name: "中度",
                    color: "yellow",
                    min: 1.65,
                    max: 2.04,
                },
                {
                    name: "严重",
                    color: "red",
                    min: 2.05,
                    max: 5.0,
                },
            ],
        },
        {
            groupId: 8,
            name: "偏执",
            method: "average",
            ranges: [
                {
                    name: "正常范围",
                    color: "green",
                    min: 0,
                    max: 2.0,
                },
                {
                    name: "中度",
                    color: "yellow",
                    min: 2.01,
                    max: 2.56,
                },
                {
                    name: "严重",
                    color: "red",
                    min: 2.57,
                    max: 5.0,
                },
            ],
        },
        {
            groupId: 9,
            name: "精神病性",
            method: "average",
            ranges: [
                {
                    name: "正常范围",
                    color: "green",
                    min: 0,
                    max: 1.71,
                },
                {
                    name: "中度",
                    color: "yellow",
                    min: 1.72,
                    max: 2.12,
                },
                {
                    name: "严重",
                    color: "red",
                    min: 2.13,
                    max: 5.0,
                },
            ],
        },
        {
            groupId: 10,
            name: "附加项目",
            method: "average",
            ranges: [
                {
                    name: "不做评价",
                    color: "default",
                    min: 0,
                    max: 10,
                },
            ],
        },
    ],
};
