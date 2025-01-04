import i18n from ".";

export const zhCN = {
    app: {
        name: "问心"
    },
    navigation: {
        list: "题库",
        test: "答题",
        settings: "设置"
    },
    list: {
        searchBarLabel: "输入你想搜索的量表（支持模糊搜索）",
        chineseVer: "中文版",
        englishVer: "英文版"
    },
    pageNotFound: {
        title: "页面未找到",
        backTip: "别担心，点击下方按钮回到题库页面吧",
        backBtn: "回到题库"
    },
    tips: {
        loadingTipDefault: "加载中，请稍后",
        loadingTipList: "题库正在加载，很快就好"
    },
};

// 热更新代码来自：https://github.com/Steve-xmh/amll-ttml-tool/blob/main/src/i18n/zh-cn.ts#L449
if (import.meta.hot) {
    import.meta.hot.accept((newModule) => {
        if (newModule) {
            i18n.global.setLocaleMessage("zh-CN", newModule.zhCN);
        }
    });
}