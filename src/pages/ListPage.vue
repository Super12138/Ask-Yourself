<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import type { Category, QuestionnaireList } from '@/interfaces/QuestionnaireList';

import LoadingTip from '@/components/LoadingTip.vue';
import FadeOutInTransition from '@/components/transitions/FadeOutInTransition.vue';
import QuestionnaireCategory from '@/components/list/QuestionnaireCategory.vue';

import 'mdui/components/badge.js';
import 'mdui/components/button.js';
import 'mdui/components/list.js';
import 'mdui/components/text-field.js';

import '@mdui/icons/search--outlined.js';

const { t } = useI18n();
const showContent = ref(false);
const categories = ref<Category[]>([]);
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
            categories.value = json.categories;
            filteredCategories.value = json.categories;
            showContent.value = true;
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

// 搜索文本
watch(searchQuery, (query: string) => {
    if (query === '') {
        return filteredCategories.value = categories.value;
    }

    const regex = generateRegex(query);
    filteredCategories.value = categories.value.map(category => {
        const questionnaires = category.questionnaires.filter(questionnaire => {
            return regex.test(questionnaire.name);
        });

        return {
            ...category,
            questionnaires,
        };
    });
});

function generateRegex(keyword: string): RegExp {
    const regexStr = `(.*)(` + keyword.split('').join(')(.*)(') + `)(.*)`;
    return new RegExp(regexStr, 'i');
}
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

        <LoadingTip v-else>
            <p>{{ t("tips.loadingTipList") }}</p>
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