import { createI18n } from "vue-i18n";
import { zhCN } from "./zh-cn";
import { enUS } from "./en-us";

const i18n = createI18n({
    legacy: false,
    locale: navigator.language,
    fallbackLocale: [...navigator.language, "zh-CN"],
    messages: {
        "zh-CN": zhCN,
        "en-US": enUS
    }
});

export default i18n;