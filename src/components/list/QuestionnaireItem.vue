<script setup lang="ts">
import { ref, type PropType } from 'vue';
import { RouterLink } from 'vue-router';

import type { QuestionnaireItem } from '@/interfaces';

import 'mdui/components/list-item.js';

// interface Props {
//     questionnaire: QuestionnaireItem;
//     languages: string[];
// }

const languages = ref(['中文版', '英文版']);

defineProps({
    questionnaire: {
        type: Object as PropType<QuestionnaireItem>,
        required: true,
    },
});
</script>

<template>
    <RouterLink :to="`/test?name=${questionnaire.value}`" custom v-slot="{ navigate }">
        <mdui-list-item :description="questionnaire.lang === 'en' ? languages[1] : languages[0]" @click="navigate"
            alignment="center">
            {{ questionnaire.name }}<mdui-badge v-if="questionnaire.new" variant="large">新</mdui-badge>
        </mdui-list-item>
    </RouterLink>
</template>