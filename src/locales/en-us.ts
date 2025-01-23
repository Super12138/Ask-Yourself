import i18n from '.';
import type { zhCN } from './zh-cn';

export const enUS: typeof zhCN = {
    app: {
        name: 'Ask Yourself',
    },
    navigation: {
        list: 'List',
        test: 'Test',
        settings: 'Settings',
    },
    list: {
        searchBarLabel:
            'Enter the questionnaire you want to search (fuzzy search is supported)',
        chineseVer: 'Chinese Version',
        englishVer: 'English Version',
    },
    test: {
        references: 'References',
        beforeAnswerTip:
            'Please carefully read the text in red below, and click the "Start" button to begin answering.',
    },
    pageNotFound: {
        title: 'Page not found',
        backTip:
            "Don't worry, click the button below to return to the questionnaire list page",
        backBtn: 'Go To List',
    },
    tips: {
        loadingTipDefault: 'Loading',
        loadingTipList: 'Questionnaire list is loading, it will be ready soon',
        loadingTipTest: 'Questionnaire is loading, it will be ready soon',
    },
};

// 热更新代码来自：https://github.com/Steve-xmh/amll-ttml-tool/blob/main/src/i18n/zh-cn.ts#L449
if (import.meta.hot) {
    import.meta.hot.accept((newModule) => {
        if (newModule) {
            i18n.global.setLocaleMessage('en-US', newModule.enUS);
        }
    });
}
