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
import ControlPanel from "./components/ControlPanel.vue";
import Result from "./components/Result.vue";
import SlideFadeOutInTransition from "@/components/transition/SlideFadeOutInTransition.vue";

const route = useRoute();

const { isFetching, error, data } = useFetch<string>(
    `${QUESTIONNAIRE_BASE_URL}/questionnaires/${route.params.name}.json?${new Date().getTime()}`,
);

const questionnaireData = ref<QuestionnaireFile>();
const currentQuestion = ref(-1);


const onQuestionSelected = (value: number) => {
    console.log(value);
    currentQuestion.value += 1;
};

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
                    v-if="currentQuestion === -1"
                    :name="questionnaireData.name"
                    :description="questionnaireData.description"
                    :answer-tips="questionnaireData.answerTips"
                    :references="questionnaireData.references"
                />
                <template v-else-if="currentQuestion < questionnaireData.questions.length">
                    <template
                        v-for="(questionData, index) in questionnaireData.questions"
                        :key="questionData.content"
                    >
                        <Question
                            v-if="currentQuestion === index"
                            :index="index + 1"
                            :question="questionData.content"
                            :options="questionnaireData.options"
                            :reverse="questionData.reverse"
                            @selected="onQuestionSelected"
                        />
                    </template>
                </template>
                <Result />
                <ControlPanel
                    v-model="currentQuestion"
                    :total-question="questionnaireData.questions.length"
                />
            </div>
        </mdui-layout-main>
    </mdui-layout>
</template>
