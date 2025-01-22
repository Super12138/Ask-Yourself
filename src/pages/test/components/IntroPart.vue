<script setup lang="ts">
import type { QuestionnaireFile } from '@/interfaces/QuestionnaireFile';
import type { PropType } from 'vue';
import { useI18n } from 'vue-i18n';

import LinkItem from './LinkItem.vue';

const { t } = useI18n();

defineProps({
    data:{
        type: Object as PropType<QuestionnaireFile>,
        required: true
    }
});
</script>

<template>
    <div>
        <p>{{ data.description }}</p>
        <strong>{{ t('test.beforeAnswerTip') }}</strong>
        <br>
        <strong class="red">{{ data.answerTips }}</strong>
    </div>
    <mdui-divider></mdui-divider>
    <div>
        <h2 style="margin-bottom: 1rem;">{{ t('test.references') }}</h2>
        <LinkItem v-for="reference in data.references" :key="reference" :reference="reference" />
    </div>
</template>