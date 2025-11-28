import type { QuestionnaireFile } from "@/types/QuestionnaireFile";

export const multiGIDTest: QuestionnaireFile = {
    name: "多组Id测试",
    author: "super12138",
    year: 2025,
    description: "简介",
    answerTips: "这里是作答提示",
    references: ["https://github.com/"],
    options: [
        {
            label: "0",
            score: 0,
        },
        {
            label: "1",
            score: 1,
        },
        {
            label: "2",
            score: 2,
        },
        {
            label: "3",
            score: 3,
        },
    ],
    questions: [
        {
            groupId: [0, 1],
            question: "01, gid: 0, 1",
        },
        {
            groupId: [1, 2],
            question: "02, gid: 1,2",
        },
        {
            groupId: [0, 2],
            question: "03, gid: 1",
        },
        {
            groupId: [0, 1],
            question: "04, gid: 0,1",
        },
    ],
    scoring: [
        {
            groupId: 0,
            name: "G0",
            method: "sum",
            ranges: [
                {
                    name: "0-3",
                    color: "green",
                    min: 0,
                    max: 6,
                },
                {
                    name: "4-9",
                    color: "yellow",
                    min: 7,
                    max: 9,
                },
            ],
        },
        {
            groupId: 1,
            name: "G1, average",
            method: "average",
            ranges: [
                {
                    name: "0-5",
                    color: "green",
                    min: 0,
                    max: 5,
                },
                {
                    name: "6-9",
                    color: "yellow",
                    min: 6,
                    max: 9,
                },
            ],
        },
        {
            groupId: 2,
            name: "G2(weighted, 2, 3)",
            method: "weighted",
            weighted: 2,
            digits: 3,
            ranges: [
                {
                    name: "0-4",
                    color: "green",
                    min: 0,
                    max: 4,
                },
                {
                    name: "5-9",
                    color: "yellow",
                    min: 5,
                    max: 9,
                },
            ],
        },
    ],
};
