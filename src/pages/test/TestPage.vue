<script setup lang="ts">
import { useFetchJSON } from '@/utils/network';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import type { QuestionnaireFile } from '@/interfaces/QuestionnaireFile';

import LoadingTip from '@/components/shared/LoadingTip.vue';
import FadeOutInTransition from '@/components/transitions/FadeOutInTransition.vue';
import QuestionItem from './components/test/QuestionItem.vue';

import 'mdui/components/card.js';
import 'mdui/components/divider.js';

import '@mdui/icons/arrow-back--outlined.js';
import '@mdui/icons/arrow-forward--outlined.js';
import '@mdui/icons/tips-and-updates--outlined.js';

const { t } = useI18n();
const route = useRoute();
const name = ref(route.query.name);

const { data, error } = useFetchJSON<QuestionnaireFile>(
    `https://cdn.jsdelivr.net/gh/Super12138/AY-Questionnaires-DB@minify/questionnaires/${name.value}.json?${new Date().getTime()}`,
);
</script>

<template>
    <FadeOutInTransition>
        <div
            v-if="data"
            class="test-container"
        >
            <!-- <IntroPart :data="data" /> -->

            <div id="testArea">
                <mdui-card variant="filled">
                    <mdui-icon-tips-and-updates--outlined
                        style="font-size: 27px; min-width: 30px"
                    ></mdui-icon-tips-and-updates--outlined>
                    <p style="margin: 0; margin-left: 8px">
                        {{ data.answerTips }}
                    </p>
                </mdui-card>

                <QuestionItem
                    v-for="(question, index) in data.questions"
                    :key="question.content"
                    :groupId="question.groupId"
                    :content="`${index + 1}. ${question.content}`"
                    :options="data.options"
                />
            </div>

            <div id="controlArea">
                <mdui-button
                    class="prev-btn"
                    variant="tonal"
                >
                    <mdui-icon-arrow-back--outlined
                        slot="icon"
                    ></mdui-icon-arrow-back--outlined>
                    上一题
                </mdui-button>
                <mdui-button class="next-btn">
                    下一题
                    <mdui-icon-arrow-forward--outlined
                        slot="end-icon"
                    ></mdui-icon-arrow-forward--outlined>
                </mdui-button>
            </div>
        </div>

        <LoadingTip
            v-else
            :error="error?.toString()"
            :loadingText="t('tips.loadingTipTest')"
        />
    </FadeOutInTransition>
</template>

<style lang="css">
.test-container {
    margin: 8px;
}
</style>
