export enum TestState {
    Start,
    InProgress,
    Finished,
}
/**
 * 用户作答记录
 */
export interface Answer {
    /**
     * 题目索引
     * * 用于标识题目以便后续进行替换、删除操作
     */
    questionIndex: number;
    /**
     * 题目组 Id
     */
    groupId: number[];
    /**
     * 用户所选选项分值
     */
    score: number;
}

/**
 * 分好组的数据
 */
export interface GroupedData {
    /**
     * 评分组 Id
     */
    groupId: number[];
    /**
     * 该评分组内的所有题目的答案分值
     */
    data: number[];
}
