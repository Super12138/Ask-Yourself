/**
 * 量表语言
 */
export type Languages = 'zh' | 'en';

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
