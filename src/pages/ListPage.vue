<script setup lang="ts">
import { computed, onMounted, ref, watch, type ComputedRef } from 'vue';
import { useI18n } from 'vue-i18n';

import type { Category, QuestionnaireList } from '@/interfaces/QuestionnaireList';

import QuestionnaireCategory from '@/components/list/QuestionnaireCategory.vue';
import LoadingTip from '@/components/shared/LoadingTip.vue';
import FadeOutInTransition from '@/components/transitions/FadeOutInTransition.vue';

import 'mdui/components/badge.js';
import 'mdui/components/button.js';
import 'mdui/components/list.js';
import 'mdui/components/text-field.js';

import { LoadState, type LoadingState } from '@/interfaces/Interfaces';
import { generateRegex } from '@/utils/utils';
import '@mdui/icons/search--outlined.js';

const { t } = useI18n();
const loadingState = ref<LoadingState>({
    currentState: LoadState.Loading,
    loadingTip: t('tips.loadingTipList'),
});
const showContent: ComputedRef<boolean> = computed(() => {
    return loadingState.value.currentState === LoadState.Loaded
});
const remoteCategories = ref<Category[]>([]);
const filteredCategories = ref<Category[]>([]);
const searchQuery = ref('');

// 加载题库
onMounted(() => {
    fetch(
        `https://cdn.jsdelivr.net/gh/Super12138/AY-Questionnaires-DB@minify/list.json?${new Date().getTime()}`,
        {
            cache: 'no-cache',
            method: 'GET',
        }
    )
        .then(response => response.text())
        .then((data: string) => {
            const json: QuestionnaireList = JSON.parse(data);
            remoteCategories.value = json.categories;
            filteredCategories.value = json.categories;
            loadingState.value.currentState = LoadState.Loaded;
        })
        .catch(error => {
            console.error('Error:', error);
            loadingState.value.currentState = LoadState.Error;
            loadingState.value.error = error;
        });
});

// 搜索文本
watch(searchQuery, (query: string) => {
    if (query === '') {
        return filteredCategories.value = remoteCategories.value;
    }

    const regex = generateRegex(query);
    filteredCategories.value = remoteCategories.value.map(category => {
        const questionnaires = category.questionnaires.filter(questionnaire => {
            return regex.test(questionnaire.name);
        });

        return {
            ...category,
            questionnaires,
        };
    });
});
</script>

<template>
    <FadeOutInTransition>
        <div v-if="showContent">
            <mdui-text-field clearable :label="t('list.searchBarLabel')" v-model="searchQuery">
                <mdui-icon-search--outlined slot="icon"></mdui-icon-search--outlined>
            </mdui-text-field>
            <mdui-list>
                <QuestionnaireCategory :categories="filteredCategories" />
            </mdui-list>
        </div>

        <LoadingTip v-else :loadingState="loadingState">
            <mdui-button @click="showContent = !showContent">强制切换内容</mdui-button>
        </LoadingTip>
    </FadeOutInTransition>
</template>

<style lang="css" scoped>
mdui-text-field {
    width: calc(100% - 16px);
    margin: 8px 8px 0 8px;
}
</style>