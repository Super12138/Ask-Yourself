import type { ListItem } from 'mdui/components/list-item.js';

export type Colors = 'green' | 'yellow' | 'orange' | 'red';
export type Languages = 'zh' | 'en';
export type Method = 'plus' | 'average' | 'multiply';

/**
 * 导航栏元素接口
 */
export interface PageItem {
    /**
     * 名称
     */
    name: string;
    /**
     * 页面代号
     */
    value: string;
    /**
     * Item 图标
     */
    icon: string;
    /**
     * 页面 URL
     */
    url: string;
}

/**
 * 按钮内容接口
 */
export interface ButtonType {
    /**
     * 按钮文本
     */
    name: string;
    /**
     * 按钮图标
     */
    icon: string;
}

/**
 * 量表列表接口
 */
export interface QuestionnaireListItem extends ListItem {
    /**
     * 量表内部名称（用于传参）
     */
    value: string;
    /**
     * 量表介绍（用于向用户展示）
     */
    description: string;
    /**
     * 量表语言，目前只支持`中文`和`英文`
     * * `zh` 中文
     * * `en` 英文
     */
    lang: Languages | string;
    /**
     * 是否为新增列表
     * 如果是新增列表会在列表项目右侧显示一个`新`
     */
    new: boolean;
}

/**
 * 量表列表接口
 */
export interface QuestionnaireList {
    /**
     * 量表介绍（用于向用户展示）
     */
    name: string;
    /**
     * 量表内部名称（用于传参）
     */
    value: string;
    /**
     * 量表语言，目前只支持`中文`和`英文`
     * * `zh` 中文
     * * `en` 英文
     */
    lang: Languages | string;
    /**
     * 是否为新增列表
     * 如果是新增列表会在列表项目右侧显示一个`新`
     */
    new: boolean;
}

/**
 * 量表列表分类接口
 */
export interface Category {
    /**
     * 类别名称
     */
    name: string;
    /**
     * 量表
     */
    questionnaires: QuestionnaireList[];
}

/**
 * 量表列表接口
 */
export interface QuestionnairesList {
    /**
     * 量表列表版本
     */
    version: string;
    /**
     * 量表分类
     */
    categories: Category[];
}


// 量表文件类型接口

/**
 * 单个选项
 */
export interface OptionItem {
    /**
     * 选项名称
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
     * 题目id（可选，不作为真正题目id）
     */
    id?: number;
    /**
     * 题目组id
     * 用于后续评分和匹配分值范围，需要完全对应
     */
    groupId: number;
    /**
     * 题目内容（题干）
     */
    content: string;
    /**
     * 反向评分（可选，部分量表题目为反向评分时开启）
     */
    reverse?: boolean;
}

/**
 * 单个评分标准
 */
export interface Criterion {
    /**
     * 评分组组id
     * 需与题目的题目组id完全对应
     * @see QuestionItem.groupId
     */
    groupId: number;
    /**
     * 计算方法
     * * `plus` 全部求和
     * * `average` 求和后取平均分（只返回平均分）
     * * `multiply` 求和后将结果 × 2（只返回计算后的结果）
     */
    method: Method | string;
}
/**
 * 单个分值范围
 */
export interface Range {
    /**
     * 范围名称
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

/**
 * 分值范围（带分组）
 */
export interface Ranges {
    /**
     * 范围组id
     * 需与题目的题目组id完全对应
     * @see QuestionItem.groupId
     */
    groupId: number;
    /**
     * 组名称
     */
    name: string;
    /**
     * 单个评分范围
     * @type {Range[]}
     */
    ranges: Range[];
}
/**
 * 评分标准组
 */
export interface Scoring {
    /**
     * 单个评分标准
     */
    criteria: Criterion[];
    ranges: Ranges[];
}

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
     */
    description: string;
    /**
     * 作答提示
     */
    answerTips: string;
    /**
     * 结果提示&解析，支持 `HTML` 标签，用 `innerHTML` 上屏
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
     * @type {Scoring}
     */
    scoring: Scoring;
}

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
export interface QuestionResult {
    /**
     * 题目组id
     */
    name: string;
    /**
     * 该题得分
     */
    value: string;
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
    [key: string]: string[];
}