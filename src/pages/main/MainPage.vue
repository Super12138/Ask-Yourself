<script setup lang="ts">
import "mdui/components/button-icon.js";
import "mdui/components/layout-item.js";
import "mdui/components/layout-main.js";
import "mdui/components/layout.js";
import "mdui/components/list-item.js";
import "mdui/components/list-subheader.js";
import "mdui/components/list.js";
import "mdui/components/top-app-bar-title.js";
import "mdui/components/top-app-bar.js";

import "@mdui/icons/settings--outlined.js";

import { QUESTIONNAIRE_BASE_URL } from "@/constants";
import type { QuestionnairesList } from "@/types/QuestionnaireList";
import { useFetch } from "@vueuse/core";
import { onMounted, ref, watch } from "vue";
import { RouterLink } from "vue-router";
import LoadingTip from "@/components/LoadingTip.vue";
import QuestionnaireItem from "./QuestionnaireItem.vue";
import FadeOutInTransition from "@/components/transition/FadeOutInTransition.vue";

const { isFetching, error, data } = useFetch<string>(
    `${QUESTIONNAIRE_BASE_URL}/list.json?${new Date().getTime()}`,
);

const questionnaireList = ref<QuestionnairesList>();

watch(data, (value) => {
    questionnaireList.value = JSON.parse(value) as QuestionnairesList;
});

onMounted(() => {
    document.body.classList.add("ready");
});
</script>

<template>
    <mdui-layout>
        <mdui-top-app-bar scroll-behavior="elevate" variant="small" scroll-target="#container">
            <mdui-top-app-bar-title>问心</mdui-top-app-bar-title>
            <div style="flex-grow: 1"></div>
            <mdui-button-icon>
                <mdui-icon-settings--outlined></mdui-icon-settings--outlined>
            </mdui-button-icon>
        </mdui-top-app-bar>
        <mdui-layout-main id="container" class="mdui-prose">
            <FadeOutInTransition>
                <mdui-list v-if="!isFetching && !error && questionnaireList">
                    <template v-for="category in questionnaireList.categories" :key="category.name">
                        <mdui-list-subheader>
                            {{ category.name }}
                        </mdui-list-subheader>
                        <QuestionnaireItem
                            v-for="questionnaire in category.questionnaires"
                            :questionnaire="questionnaire"
                        />
                    </template>
                </mdui-list>

                <LoadingTip v-else :error="error" />
            </FadeOutInTransition>
        </mdui-layout-main>
    </mdui-layout>
</template>
