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

import LoadingTip from "@/components/LoadingTip.vue";
import FadeOutInTransition from "@/components/transition/FadeOutInTransition.vue";
import { scl90 } from "@/test-only-questionnaire/scl90.1";
import { TestState, type Answer, type GroupedAnswer } from "@/types";
import { useFetch } from "@vueuse/core";
import { computed, onMounted, ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import AnsweringProgress from "./components/AnsweringProgress.vue";
import ControlPanel from "./components/ControlPanel.vue";
import Question from "./components/Question.vue";
import Result from "./components/Result.vue";
import Start from "./components/Start.vue";
import gad7Questionnaire from "@/test-only-questionnaire/gad7";
import { multiGIDTest } from "@/test-only-questionnaire/multi-gid";

const route = useRoute();

const { isFetching, error, data } = useFetch<string>(
    `${QUESTIONNAIRE_BASE_URL}/questionnaires/${route.params.name}.json?${new Date().getTime()}`,
);

const questionnaireData = ref<QuestionnaireFile>();
const currentQuestion = ref(-1);
const answers = ref<Answer[]>([]);
const groupedAnswers = ref<GroupedAnswer>();

const testState = computed<TestState>(() => {
    if (currentQuestion.value === -1) {
        return TestState.Start;
    } else if (
        questionnaireData.value &&
        currentQuestion.value >= questionnaireData.value.questions.length
    ) {
        return TestState.Finished;
    } else {
        return TestState.InProgress;
    }
});

// From Agent
const onQuestionSelected = (score: number) => {
    // value 是由 Question.vue 发出的选项分值（option.score）
    const qIndex = currentQuestion.value;
    if (!questionnaireData.value) {
        console.warn("questionnaireData not loaded yet");
        return;
    }

    const question = questionnaireData.value.questions[qIndex];
    // const groupId = question?.groupId ?? 0;
    const groupId = question.groupId;

    const entry: Answer = { questionIndex: qIndex, groupId, score };

    // 在 qIndex 位置删除1项，并插入用户答案
    answers.value.splice(qIndex, 1, entry);

    // 向后移动到下一题
    if (currentQuestion.value < questionnaireData.value.questions.length - 1) {
        currentQuestion.value += 1;
    }
};

const onFinish = () => {
    let groupedAnswer: GroupedAnswer = answers.value.reduce((accumulator, currentValue) => {
        console.log(accumulator);
        currentValue.groupId.forEach((groupId) => {
            if (!accumulator[groupId]) {
                accumulator[groupId] = [];
            }
            accumulator[groupId].push(currentValue.score);
        });
        return accumulator;
    }, {} as GroupedAnswer);
    groupedAnswers.value = groupedAnswer;
    currentQuestion.value += 1;
};

watch(data, (value) => {
    if (!value) return;
    // questionnaireData.value = JSON.parse(value) as QuestionnaireFile;
    questionnaireData.value = multiGIDTest;
});

const canNext = computed(() => {
    // 当在起始页时允许开始
    if (currentQuestion.value === -1) return true;
    if (!questionnaireData.value) return false;
    if (currentQuestion.value > questionnaireData.value.questions.length) return false;

    const entry = answers.value[currentQuestion.value];
    return entry !== undefined;
});

onMounted(() => {
    document.body.classList.add("ready");
});
</script>

<template>
    <mdui-layout>
        <mdui-top-app-bar scroll-behavior="elevate" variant="small" scroll-target="#container">
            <RouterLink to="/" custom v-slot="{ href, navigate }">
                <mdui-button-icon :href="href" @click="navigate">
                    <mdui-icon-arrow-back--outlined></mdui-icon-arrow-back--outlined>
                </mdui-button-icon>
            </RouterLink>
            <mdui-top-app-bar-title>测试</mdui-top-app-bar-title>
        </mdui-top-app-bar>
        <mdui-layout-main id="container" class="mdui-prose main-content">
            <FadeOutInTransition>
                <div v-if="!isFetching && !error && questionnaireData">
                    <Start
                        v-if="testState === TestState.Start"
                        :name="questionnaireData.name"
                        :description="questionnaireData.description"
                        :answer-tips="questionnaireData.answerTips"
                        :references="questionnaireData.references"
                    />
                    <template v-else-if="testState === TestState.InProgress">
                        <AnsweringProgress
                            :current="currentQuestion"
                            :answered="answers.length"
                            :total="questionnaireData.questions.length"
                        />
                        <template
                            v-for="(questionData, index) in questionnaireData.questions"
                            :key="questionData.question"
                        >
                            <Question
                                v-if="currentQuestion === index"
                                :index="index + 1"
                                :question="questionData.question"
                                :options="questionnaireData.options"
                                :reverse="questionData.reverse"
                                :selected="answers[index]?.score"
                                @selected="onQuestionSelected"
                            />
                        </template>
                    </template>
                    <Result
                        :grouped-answers="groupedAnswers"
                        :scoring-method="questionnaireData.scoring"
                        v-else
                    />
                    <ControlPanel
                        v-if="testState !== TestState.Finished"
                        v-model="currentQuestion"
                        :total="questionnaireData.questions.length"
                        :can-next="canNext"
                        @finish="onFinish"
                    />
                </div>

                <LoadingTip v-else :error="error" />
            </FadeOutInTransition>
        </mdui-layout-main>
    </mdui-layout>
</template>

<style lang="css">
.main-content {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
    padding-bottom: 1rem !important;
}
</style>
