import { RadioGroup } from "mdui";
import { BasicScoreResult, GroupedData, Range, Ranges, ScoreResult } from "../interfaces";
import { LogHelper } from "../utils/LogHelper";

const logHelper = LogHelper.getInstance();
/**
 * 计算最终得分
 * @param groupedQuestions 分好组的题目组id+每题的分数
 * @param groupedCriteria 分好组的评分组id+评分方法
 * @param ranges 原始的范围对象
 * @returns 最终得分的：项目名称+得分+范围名称+显示文字颜色
 */
export function getScore(groupedQuestions: GroupedData, groupedCriteria: GroupedData, ranges: Ranges[]): ScoreResult[] {
    let score: ScoreResult[] = [];

    Object.entries(groupedQuestions).forEach(([key, values]: [string, string[]]) => {
        const method: string[] = groupedCriteria[key][0].split(", ", 2); // 对于有参数的计算方法按照`, `进行拆分
        const operator: string = method[0]; // 使用计算方法字段进行判断
        logHelper.log(`计算方法：${operator}`);

        // 匹配与groupId对应的分值范围
        const group: Ranges | undefined = ranges.find((group) => group.groupId === Number.parseInt(key, 10));
        logHelper.log(group);

        // group 被定义
        if (group) {
            let result: number = 0;
            // 判断计算方法
            switch (operator) {
                case "plus": // 求和
                    result = getSum(values);
                    logHelper.log(`${key}的总和：${result}`);
                    break;
                case "average": // 平均数
                    result = parseFloat((getSum(values) / values.length).toFixed(2)); // 确保输出结果为小数点后2位
                    logHelper.log(`${key}的平均值：${result}`);
                    break;
                case "multiply": // 按照某个值翻倍
                    const ratio = Number.parseFloat(method[1]);
                    result = getSum(values) * ratio;
                    break;
                default:
                    logHelper.error(`未知计算方法：${operator}`);
                    break;
            }

            // 匹配分数的分值范围
            const matchingRange: Range | undefined = group.ranges.find((range: Range) => {
                return result >= range.min && result <= range.max;
            });

            // 拼合结果
            if (matchingRange) {
                score.push({
                    name: group.name,
                    result: result,
                    range: matchingRange.name,
                    color: matchingRange.color
                });
            }
        }
    });
    return score;
}

/**
 * 计算总分通用方法
 * @param values 得分字符串
 * @returns 总分
 */
function getSum(values: string[]): number {
    return values.reduce((acc: number, current: string) => {
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