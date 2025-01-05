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

/**
 * LoadingTip 组件加载状态接口
 * 
 * * `currentState` - 当前加载状态，为`LoadState`的一个取值
 * * `loadingTip` - 加载时的提示文本，默认为`tips.loadingTipDefault`（加载中，请稍后）
 * * `error` - 加载失败的提示语或错误信息，仅在`currentState`为`LoadState.Error`时在显示
 */
export interface LoadingState {
    currentState: LoadState;
    loadingTip?: string;
    error?: string;
}

/**
 * 加载状态
 * * `Loading` 加载中
 * * `Loaded` 加载完成
 * * `Error` 加载失败
 */
export enum LoadState {
    Loading,
    Loaded,
    Error
}