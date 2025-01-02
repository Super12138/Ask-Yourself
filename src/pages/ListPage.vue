<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import type { Category, QuestionnaireList } from '@/interfaces';

import LoadingTip from '@/components/LoadingTip.vue';
import QuestionnaireCategory from '@/components/list/QuestionnaireCategory.vue';

import 'mdui/components/badge.js';
import 'mdui/components/button.js';
import 'mdui/components/list.js';
import 'mdui/components/text-field.js';

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
    <Transition name="fade" mode="out-in">
        <div v-if="showContent">
            <mdui-text-field clearable label="输入你想搜索的量表（支持模糊搜索）" v-model="searchQuery"></mdui-text-field>
            <mdui-list>
                <QuestionnaireCategory :categories="filteredCategories" />
            </mdui-list>
        </div>

        <LoadingTip v-else>
            <p>题库正在加载，很快就好</p>
            <mdui-button @click="showContent = !showContent">强制切换内容</mdui-button>
        </LoadingTip>
    </Transition>
</template>