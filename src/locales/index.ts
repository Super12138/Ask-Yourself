import { createI18n, type I18nOptions } from "vue-i18n";
import { zhCN } from "./zh-cn";
import { enUS } from "./en-us";

const i18nOptions: I18nOptions = {
    legacy: false,
    locale: navigator.language,
    fallbackLocale: [...navigator.language, "zh-CN"],
    messages: {
        "zh-CN": zhCN,
        "en-US": enUS
    }
}

const i18n = createI18n<false, I18nOptions>(i18nOptions);

export default i18n;