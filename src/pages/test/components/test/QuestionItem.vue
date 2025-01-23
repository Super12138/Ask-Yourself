<script setup lang="ts">
import type { OptionItem } from '@/interfaces/QuestionnaireFile';
import type { PropType } from 'vue';

import OptionsItem from './OptionsItem.vue';

defineProps({
    groupId: {
        type: Number,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    options: {
        type: Array as PropType<OptionItem[]>,
        required: true,
    },
});
</script>

<template>
    <p>{{ content }}</p>
    <mdui-radio-group :name="content">
        <OptionsItem
            v-for="option in options"
            :content="option.content"
            :score="option.score"
        />
    </mdui-radio-group>
</template>
