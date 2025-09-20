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
    questionnaires: QuestionnaireListItem[];
}

/**
 * 量表列表接口
 */
export interface QuestionnaireListItem {
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
    lang: string;
    /**
     * 是否为新增列表
     * 如果是新增列表会在列表项目右侧显示一个`新`
     */
    new: boolean;
}
