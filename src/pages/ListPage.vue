<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import type { QuestionnaireList } from '@/interfaces/QuestionnaireList';

import QuestionnaireCategory from '@/components/list/QuestionnaireCategory.vue';

import 'mdui/components/badge.js';
import 'mdui/components/circular-progress.js';
import 'mdui/components/list.js';
import 'mdui/components/text-field.js';

import '@mdui/icons/report-gmailerrorred--outlined.js';
import '@mdui/icons/search--outlined.js';

import LoadingTip from '@/components/shared/LoadingTip.vue';

import FadeOutInTransition from '@/components/transitions/FadeOutInTransition.vue';
import { useFetchJSON } from '@/utils/network';

const { t } = useI18n();

const searchQuery = ref('');

// 加载题库
const { data, error } = useFetchJSON<QuestionnaireList>(`https://cdn.jsdelivr.net/gh/Super12138/AY-Questionnaires-DB@minify/list.json?${new Date().getTime()}`);

// 搜索文本
/* watch(searchQuery, (query: string) => {
    const category: QuestionnaireList = JSON.parse(JSON.stringify(data.value));
    if (query === '') {
        return filterdData.value = category.categories;
    }

    const regex = generateRegex(query);
    filterdData.value = category.categories.map(category => {
        const questionnaires = category.questionnaires.filter(questionnaire => {
            return regex.test(questionnaire.name);
        });

        return {
            ...category,
            questionnaires,
        };
    });
});*/
</script>

<template>
    <FadeOutInTransition>
        <div v-if="data">
            <mdui-text-field clearable :label="t('list.searchBarLabel')" v-model="searchQuery">
                <mdui-icon-search--outlined slot="icon"></mdui-icon-search--outlined>
            </mdui-text-field>
            <mdui-list>
                <QuestionnaireCategory :categories="data.categories" />
            </mdui-list>
        </div>

        <LoadingTip v-else :error="error?.toString()" :loadingText="t('tips.loadingTipList')" />
    </FadeOutInTransition>
</template>

<style lang="css" scoped>
mdui-text-field {
    width: calc(100% - 16px);
    margin: 8px 8px 0 8px;
}
</style>