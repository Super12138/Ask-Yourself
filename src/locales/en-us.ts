import i18n from ".";

export const enUS = {
};

// 热更新代码来自：https://github.com/Steve-xmh/amll-ttml-tool/blob/main/src/i18n/zh-cn.ts#L449
if (import.meta.hot) {
    import.meta.hot.accept((newModule) => {
        if (newModule) {
            i18n.global.setLocaleMessage("en-US", newModule.zhCN);
        }
    });
}