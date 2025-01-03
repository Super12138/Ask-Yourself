import type { Colors } from "./QuestionnaireFile";

/**
 * 计算完成后评分接口
 */
export interface Score {
    /**
     * 评分组id
     */
    groupId: number;
    /**
     * 评分
     */
    score: number;
    /**
     * 测定范围
     */
    range: string;
}

/**
 * 得分结果存储类
 */
export interface AnswerData {
    /**
     * 题目组id
     */
    groupId: number;
    /**
     * 该题得分
     */
    score: number;
}

/**
 * 得分计算结果
 */
export interface ScoreResult extends BasicScoreResult {
    /**
     * 得分所在范围的名称
     */
    range: string;
    /**
     * 得分所在范围的名称所显示文字的颜色，可选值：
     * * green 绿色
     * * yellow 黄色
     * * orange 橙色
     * * red 红色
     * * 啥也不填就是默认颜色
     */
    color: Colors | string;
}

/**
 * 得分计算结果基类
 */
export interface BasicScoreResult {
    /**
     * 得分所在组项目名称
     */
    name: string;
    /**
     * 得分
     */
    result: number;
}

/**
 * 分好组的数据
 */
export interface GroupedData {
    [groupId: number]: number[];
}