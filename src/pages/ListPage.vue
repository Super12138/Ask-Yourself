<script setup lang="ts">
import { useFetchJSON } from '@/utils/network';
import { generateRegex } from '@/utils/string';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import type { Category, QuestionnaireList } from '@/interfaces/QuestionnaireList';

import QuestionnaireCategory from '@/components/list/QuestionnaireCategory.vue';
import LoadingTip from '@/components/shared/LoadingTip.vue';
import FadeOutInTransition from '@/components/transitions/FadeOutInTransition.vue';

import 'mdui/components/circular-progress.js';
import 'mdui/components/list.js';
import 'mdui/components/text-field.js';

import '@mdui/icons/report-gmailerrorred--outlined.js';
import '@mdui/icons/search--outlined.js';

const { t } = useI18n();
const searchQuery = ref('');

// 加载题库
const { data, error } = useFetchJSON<QuestionnaireList>(`https://cdn.jsdelivr.net/gh/Super12138/AY-Questionnaires-DB@minify/list.json?${new Date().getTime()}`);

const filteredData = computed(() => {
    // 如果数据未加载或搜索框为空，则直接返回全部数据
    if (!data.value || !searchQuery.value.trim()) {
        return data.value?.categories || [];
    }

    // 搜索关键字的正则表达式
    const regex = generateRegex(searchQuery.value.trim());

    // 在分类和问卷中逐层过滤
    return data.value.categories
        .map((category) => {
            // 筛选符合条件的问卷
            const filteredQuestionnaires = category.questionnaires.filter((item) => {
                return regex.test(item.name);
            });

            // 如果该分类下有符合条件的问卷，则保留此分类
            if (filteredQuestionnaires.length > 0) {
                return {
                    ...category,
                    questionnaires: filteredQuestionnaires,
                };
            }

            // 否则过滤掉整个分类
            return null;
        })
        .filter((category): category is Category => category !== null); // 移除 null 值
});
</script>

<template>
    <FadeOutInTransition>
        <div v-if="data">
            <mdui-text-field clearable :label="t('list.searchBarLabel')" v-model="searchQuery">
                <mdui-icon-search--outlined slot="icon"></mdui-icon-search--outlined>
            </mdui-text-field>
            <mdui-list>
                <QuestionnaireCategory :categories="filteredData" />
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