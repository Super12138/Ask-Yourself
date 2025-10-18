import type { QuestionnaireFile } from "@/types/QuestionnaireFile";

const gad7Questionnaire: QuestionnaireFile = {
    name: "GAD-7（广泛性焦虑）",
    author: "Robert L. Spitzer 等人",
    year: 2006,
    description:
        "GAD-7（Generalized Anxiety Disorder-7）心理状况筛查量表是一种常用于评估广泛性焦虑障碍的工具。该量表由七个问题组成，用于评估受访者在过去两周内的焦虑症状频率和严重程度。通过计分的方式，可以快速了解一个人是否存在焦虑症状及其严重程度。",
    answerTips: "在过去的2周里，你在生活中有多久对以下问题感到困扰？",
    references: [
        "https://m.medsci.cn/scale/show.do?id=582f1065a7",
        "https://psych.dxy.cn/article/487819",
        "https://cmhadb.cma-cmc.com.cn/know/v/articleDetail/20/25986.html",
    ],
    options: [
        {
            label: "没有",
            score: 0,
        },
        {
            label: "有几天",
            score: 1,
        },
        {
            label: "一半以上的天数",
            score: 2,
        },
        {
            label: "几乎每天",
            score: 3,
        },
    ],
    questions: [
        {
            groupId: [1],
            question: "感到不安、担心、烦躁或易怒",
        },
        {
            groupId: [1],
            question: "无法停止或不能控制的担心",
        },
        {
            groupId: [1],
            question: "对各种各样的事情担忧过多",
        },
        {
            groupId: [1],
            question: "很紧张，无法放松",
        },
        {
            groupId: [1],
            question: "非常焦躁，以致无法静坐",
        },
        {
            groupId: [1],
            question: "变得易怒或躁动",
        },
        {
            groupId: [1],
            question: "担心有不详的事情发生",
        },
    ],
    scoring: [
        {
            groupId: 1,
            name: "焦虑",
            method: "sum",
            ranges: [
                {
                    name: "没有焦虑",
                    color: "green",
                    min: 0,
                    max: 4,
                },
                {
                    name: "轻度焦虑",
                    color: "yellow",
                    min: 5,
                    max: 9,
                },
                {
                    name: "中度焦虑",
                    color: "orange",
                    min: 10,
                    max: 14,
                },
                {
                    name: "严重焦虑",
                    color: "red",
                    min: 15,
                    max: 21,
                },
            ],
        },
    ],
};

export default gad7Questionnaire;
