<script setup lang="ts">
import { useFetchJSON } from '@/utils/network';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import type { QuestionnaireFile } from '@/interfaces/QuestionnaireFile';

import LoadingTip from '@/components/shared/LoadingTip.vue';
import IntroPart from './components/IntroPart.vue';
import FadeOutInTransition from '@/components/transitions/FadeOutInTransition.vue';

import 'mdui/components/divider.js';

const { t } = useI18n();
const route = useRoute();
const name = ref(route.query.name);

const { data, error } = useFetchJSON<QuestionnaireFile>(`https://cdn.jsdelivr.net/gh/Super12138/AY-Questionnaires-DB@minify/questionnaires/${name.value}.json?${new Date().getTime()}`);
</script>

<template>
    <FadeOutInTransition>
        <div v-if="data" class="test-container">
            <IntroPart :data="data" />
        </div>

        <LoadingTip v-else :error="error?.toString()" :loadingText="t('tips.loadingTipTest')" />
    </FadeOutInTransition>
</template>

<style lang="css">
.test-container {
    margin: 8px;
}
</style>