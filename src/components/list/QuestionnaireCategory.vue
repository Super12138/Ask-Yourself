<script setup lang="ts">
import type { Category } from '@/interfaces/QuestionnaireList';
import type { PropType } from 'vue';

import QuestionnaireItem from './QuestionnaireItem.vue';

import 'mdui/components/list-subheader.js';

defineProps({
    categories: {
        type: Array as PropType<Category[]>,
        required: true,
    },
});
</script>

<template>
    <div v-for="category in categories">
        <mdui-list-subheader>{{ category.name }}</mdui-list-subheader>
        <QuestionnaireItem v-for="questionnaire in category.questionnaires" :key="questionnaire.value"
            :questionnaire="questionnaire" />
    </div>
</template>