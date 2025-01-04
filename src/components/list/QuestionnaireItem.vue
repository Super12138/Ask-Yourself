<script setup lang="ts">
import { type PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';

import type { QuestionnaireItem } from '@/interfaces/QuestionnaireList';

import 'mdui/components/list-item.js';

// interface Props {
//     questionnaire: QuestionnaireItem;
//     languages: string[];
// }

const { t } = useI18n();

defineProps({
    questionnaire: {
        type: Object as PropType<QuestionnaireItem>,
        required: true,
    },
});
</script>

<template>
    <RouterLink :to="`/test?name=${questionnaire.value}`" custom v-slot="{ navigate }">
        <mdui-list-item :description="questionnaire.lang === 'en' ? t('list.englishVer') : t('list.chineseVer')" @click="navigate"
            alignment="center">
            {{ questionnaire.name }}<mdui-badge v-if="questionnaire.new" variant="large">新</mdui-badge>
        </mdui-list-item>
    </RouterLink>
</template>