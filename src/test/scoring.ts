import { RadioGroup } from "mdui";
import { BasicScoreResult, GroupedData, Range, ScoreResult, Scoring } from "../interfaces";
import { LogHelper } from "../utils/LogHelper";

const logHelper = LogHelper.getInstance();
/**
 * 计算最终得分
 * @param groupedQuestions 分好组的题目组id+每题的分数
 * @param scoring 评分方法对象
 * @returns 最终得分的：项目名称+得分+范围名称+显示文字颜色
 */
export function getScore(groupedQuestions: GroupedData, scoring: Scoring[]): ScoreResult[] {
    let scoreResult: ScoreResult[] = [];

    // 解构分好组的题目Id和每题分数
    Object.entries(groupedQuestions).forEach(([questionGroupId, scores]: [string, string[]]) => {
        scoring.forEach((scoreGroup: Scoring, i: number) => {
            logHelper.log(`Scoring ${i}:`)
            const groupId: number = scoreGroup.groupId;
            if (groupId.toString() !== questionGroupId) return;

            const groupMethod: string[] = scoreGroup.method.split(", ", 3);
            const groupOperator: string = groupMethod[0];
            const ratio: number = Number.parseFloat(groupMethod[1]);
            const saveFractionDigits: number = groupMethod[2] ? Number.parseInt(groupMethod[2]) : 2;

            const groupName: string = scoreGroup.name;
            const groupRages: Range[] = scoreGroup.ranges;

            /**
             * 计算后的得分结果
             */
            let result: number = 0;
            // 判断计算方法
            switch (groupOperator) {
                case "plus": // 求和
                    result = getSum(scores);
                    logHelper.log(`评分组 ${questionGroupId} 的总和：${result}`);
                    break;
                case "average": // 取平均数
                    result = parseFloat((getSum(scores) / scores.length).toFixed(2));
                    logHelper.log(`评分组 ${questionGroupId} 的平均值：${result}`);
                    break;
                case "multiply": // 乘某个数
                    result = getSum(scores) * ratio;
                    logHelper.log(`评分组 ${questionGroupId} 乘 ${ratio} 的结果：${result}`);
                    break;
                case "division": // 除以某个数
                    result = parseFloat((getSum(scores) / ratio).toFixed(saveFractionDigits)); // 输出保留指定小数点
                    logHelper.log(`评分组 ${questionGroupId} 乘 ${ratio} 的结果：${result}`);
                    break;
                default:
                    logHelper.error(`未知计算方法：${groupOperator}`);
                    break;
            }

            groupRages.forEach((range: Range) => {
                if (result >= range.min && result <= range.max) {
                    scoreResult.push({
                        name: groupName,
                        result: result,
                        range: range.name,
                        color: range.color
                    });
                } else {
                    logHelper.log("这个不是计算后得分应在的范围")
                }
            });
        });
    });

    return scoreResult;
}

/**
 * 计算总分通用方法
 * @param scores 得分字符串
 * @returns 总分
 */
function getSum(scores: string[]): number {
    return scores.reduce((acc: number, current: string) => {
        if (current !== "") {
            return acc + Number.parseInt(current, 10);
        } else {
            return acc;
        }
    }, 0);
}

/**
 * SCL-90 量表特别适配
 * @param groupRadio 所有题目
 * @returns 
 */
export function SCL90Score(groupRadio: NodeListOf<RadioGroup>): BasicScoreResult[] {
    // 计算总分&总均分
    let scl90Score: BasicScoreResult[] = [];

    let sum: number = 0;

    let positiveCount: number = 0;
    let positiveTotal: number = 0;
    let negativeCount: number = 0;

    groupRadio.forEach((group: RadioGroup) => {
        const value = Number.parseInt(group.value, 10); // 当前分数
        sum += value; // 总和添加
        if (value >= 2) {
            positiveCount++
            positiveTotal += value; // 阳性得分总和
        };
        if (value === 1) negativeCount++;
    });

    const average: number = sum / groupRadio.length;
    const positiveAvg: number = positiveTotal / positiveCount;

    scl90Score.push({ name: '总分', result: sum });
    scl90Score.push({ name: '总均分', result: Number.parseInt(average.toFixed(2), 10) });
    scl90Score.push({ name: '阳性项目数', result: positiveCount });
    scl90Score.push({ name: '阴性项目数', result: negativeCount });
    scl90Score.push({ name: '阳性症状均分', result: Number.parseInt(positiveAvg.toFixed(2), 10) });

    return scl90Score;
}