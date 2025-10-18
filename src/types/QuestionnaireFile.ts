export type Colors = "default" | "green" | "yellow" | "orange" | "red";
export type Method = "sum" | "average" | "weighted";

/**
 * 量表题目文件
 */
export interface QuestionnaireFile {
    /**
     * 量表名称
     */
    name: string;
    /**
     * 量表作者
     *
     * * 量表的设计者或编写者
     */
    author: string;
    /**
     * 量表年份
     *
     * * 量表设计或发布的年份
     */
    year: number;
    /**
     * 量表介绍
     *
     * * 对该量表进行介绍，比如它是什么类型的，适用范围和**不需要持续提示**的作答须知等
     */
    description: string;
    /**
     * 用户作答提示（**需要持续提示**的作答提示或须知）
     *
     * * 在准备答题页面会以加粗红色字样显示
     * * 作答时会以一个卡片的形式展示在页面顶部
     */
    answerTips: string;
    /**
     * 作答结果解释
     */
    resultTips?: string;
    /**
     * 题目来源（引用）
     *
     * 比如从哪儿找到题目，从哪儿找的评分标准之类的
     * @type {string[]}
     */
    references: string[];
    /**
     * 题目选项
     * @type {Option[]}
     */
    options: Option[];
    /**
     * 题目
     * @type {Question[]}
     */
    questions: Question[];
    /**
     * 评分标准
     * @type {ScoringMethod[]}
     */
    scoring: ScoringMethod[];
}

/**
 * 单个选项
 */
export interface Option {
    /**
     * 选项内容
     */
    label: string;
    /**
     * 选项分值
     */
    score: number;
}

/**
 * 单个题目
 */
export interface Question {
    /**
     * 题目 Id
     * * 可选，不作为真正题目 Id
     */
    id?: number;
    /**
     * 组 Id
     *
     * * 对题目进行分组，用于分别计算不同组的分数，支持一个题目有多个组 Id 的情况
     * * * * 如`[0]`代表该题目仅对应评分组0；`[1, 2]`表示该题目将对应评分组1、2
     * * 需要与评分组的`组 Id` **完全对应**
     */
    groupId: number[];
    /**
     * 题目内容（题干）
     */
    question: string;
    /**
     * 反向评分（可选，默认为空）
     *
     * * 开启后选项分值会进行反转，而不会反转选项内容（如选项1-3，它们的分值为1-3；反转后选项3-1，它们的分值变为3-1）
     */
    reverse?: boolean;
}

/**
 * 评分标准
 */
export interface ScoringMethod {
    /**
     * 组 Id
     *
     * 需要和题目的`组 Id` **完全对应**
     */
    groupId: number;
    /**
     * 该评分组的名称（如`焦虑`、`抑郁`等）
     */
    name: string;
    /**
     * 计算方法
     *
     * 该评分组的计算方法，支持下方四种方法：
     * * `sum` 全部求和
     * * `average` 求和后取平均分（只返回平均分）
     * * `weighted` 求和后将结果乘以一个权重值（需要设置`weighted`字段）
     */
    method: Method;
    /**
     * 权重值
     *
     * 仅在 `method` 为 `weighted` 时需要设置
     * * 如不填写则会报错
     */
    weighted?: number;
    /**
     * 小数位数
     *
     * 用于规定结果保留的小数位数
     * * 仅在 `method` 为 `average` 或 `weighted` 时有效
     * * 如不填写默认保留 2 位小数
     */
    digits?: number;
    /**
     * 分值范围
     *
     * 分数的分值范围，用来规定分数的范围。
     * * 如规定`轻度`、`中度`的分界
     */
    ranges: ScroingRange[];
}

/**
 * 单个分值范围
 */
export interface ScroingRange {
    /**
     * 范围名称（如`轻度`、`中度`等）
     */
    name: string;
    /**
     * 显示文字的颜色
     *
     * 可选值：
     * * `default` 默认颜色（浅色模式为黑色，深色模式为白色）
     * * `green` 绿色
     * * `yellow` 黄色
     * * `orange` 橙色
     * * `red` 红色
     */
    color: Colors;
    /**
     * 范围最小值（取等）
     */
    min: number;
    /**
     * 范围最大值（取等）
     */
    max: number;
}
