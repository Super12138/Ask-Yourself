export type Colors = "green" | "yellow" | "orange" | "red";
export type Method = "plus" | "average" | "multiply" | "division";

/**
 * 量表题目文件
 */
export interface QuestionnaireFile {
    /**
     * 量表名称
     */
    name: string;
    /**
     * 量表介绍
     * * 对该量表进行介绍，比如它是什么类型的，适用范围和**不需要持续提示**的作答须知等
     */
    description: string;
    /**
     * 用户作答提示（**需要持续提示**的作答提示或须知）
     * * 在准备答题页面会以加粗红色字样显示
     * * 作答时会以一个卡片的形式展示在页面顶部
     * * 支持 `HTML` 标签
     */
    answerTips: string;
    /**
     * 作答结果解释
     * * 支持 `HTML` 标签
     */
    resultTips: string;
    /**
     * 题目来源（引用）
     * 比如从哪儿找到题目，从哪儿找的评分标准之类的
     * @type {string[]}
     */
    references: string[];
    /**
     * 题目选项
     * @type {OptionItem[]}
     */
    options: OptionItem[];
    /**
     * 题目
     * @type {QuestionItem[]}
     */
    questions: QuestionItem[];
    /**
     * 评分标准
     * @type {Scoring[]}
     */
    scoring: Scoring[];
}

/**
 * 单个选项
 */
export interface OptionItem {
    /**
     * 选项内容
     */
    name: string;
    /**
     * 选项分值
     */
    score: number;
}

/**
 * 单个题目
 */
export interface QuestionItem {
    /**
     * 题目 Id
     * * 可选，不作为真正题目 Id
     */
    id?: number;
    /**
     * 组 Id
     * * 对题目进行分组，用于分别计算不同组的分数
     * * 需要与评分组的`组 Id` **完全对应**
     */
    groupId: number;
    /**
     * 题目内容（题干）
     */
    content: string;
    /**
     * 反向评分（可选，默认为空）
     * * 开启后选项分值会进行反转，而不会反转选项内容（如选项1-3，它们的分值为1-3；反转后选项3-1，它们的分值变为3-1）
     */
    reverse?: boolean;
}

/**
 * 评分标准组
 */
export interface Scoring {
    /**
     * 组 Id
     * 需要和题目的`组 Id` **完全对应**
     */
    groupId: number;
    /**
     * 该评分组的名称（如`焦虑`、`抑郁`等）
     */
    name: string;
    /**
     * 计算方法
     * * 该评分组的计算方法，支持下方四种方法：
     * * * `plus` 全部求和
     * * * `average` 求和后取平均分（只返回平均分）
     * * * `multiply` 求和后将结果翻指定倍数。需要添加参数，用`,`分隔。
     * * * * 第一个参数是倍数，如`multiply, 2`
     * * * `division` 求和后将结果除以指定数。需要添加参数，用`,`分隔。
     * * * * 第一个参数是除数，第二个参数是保留小数位数，如`division, 2, 2`表示把结果除以2，并把得数保留两位小数
     */
    method: Method | string;
    /**
     * 分数的分值范围，用来规定分数的范围，比如规定`轻度`、`中度`的分界
     */
    ranges: Range[];
}

/**
 * 单个分值范围
 */
export interface Range {
    /**
     * 范围名称（如`轻度`、`中度`等）
     */
    name: string;
    /**
     * 显示文字的颜色，可选值：
     * * green 绿色
     * * yellow 黄色
     * * orange 橙色
     * * red 红色
     * * 啥也不填就是默认颜色
     */
    color: Colors | string;
    /**
     * 范围最小值（可以取等）
     */
    min: number;
    /**
     * 范围最大值（可以取等）
     */
    max: number;
}
