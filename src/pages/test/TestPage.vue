<script setup lang="ts">
import "mdui/components/button-icon.js";
import "mdui/components/layout-item.js";
import "mdui/components/layout-main.js";
import "mdui/components/layout.js";
import "mdui/components/top-app-bar-title.js";
import "mdui/components/top-app-bar.js";

import "@mdui/icons/arrow-back--outlined.js";

import { QUESTIONNAIRE_BASE_URL } from "@/constants";
import type { QuestionnaireFile } from "@/types/QuestionnaireFile";

import { useFetch } from "@vueuse/core";
import { onMounted, ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import Question from "./components/Question.vue";
import Start from "./components/Start.vue";

const route = useRoute();

const { isFetching, error, data } = useFetch<string>(
    `${QUESTIONNAIRE_BASE_URL}/questionnaires/${route.params.name}.json?${new Date().getTime()}`,
);

const questionnaireData = ref<QuestionnaireFile>();

watch(data, (value) => {
    questionnaireData.value = JSON.parse(value) as QuestionnaireFile;
});

onMounted(() => {
    document.body.classList.add("ready");
});
</script>

<template>
    <mdui-layout>
        <mdui-top-app-bar scroll-behavior="elevate" variant="small" scroll-target="#container">
            <RouterLink to="/" custom v-slot="{ isActive, href, navigate }">
                <mdui-button-icon :disabled="isActive" :href="href" @click="navigate">
                    <mdui-icon-arrow-back--outlined></mdui-icon-arrow-back--outlined>
                </mdui-button-icon>
            </RouterLink>
            <mdui-top-app-bar-title>测试</mdui-top-app-bar-title>
        </mdui-top-app-bar>
        <mdui-layout-main id="container" class="mdui-prose">
            <div v-if="!isFetching && !error && questionnaireData">
                <Start
                    :name="questionnaireData.name"
                    :description="questionnaireData.description"
                    :answer-tips="questionnaireData.answerTips"
                    :references="questionnaireData.references"
                />
                <Question
                    v-if="false"
                    v-for="(questionData, index) in questionnaireData.questions"
                    :index="index + 1"
                    :question="questionData.content"
                    :options="questionnaireData.options"
                    :reverse="questionData.reverse"
                    :key="questionData.content"
                    @selected="(value) => console.log(value)"
                />
            </div>
        </mdui-layout-main>
    </mdui-layout>
</template>
