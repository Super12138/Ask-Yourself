<script setup lang="ts">
import "mdui/components/list-item.js";
import "mdui/components/list.js";
import "@mdui/icons/circle--outlined.js";
import "@mdui/icons/check-circle--outlined.js";

import type { Option } from "@/types/QuestionnaireFile";

defineProps<{
    index: number;
    question: string;
    options: Option[];
    /**
     * 已选择的选项的**分数**
     */
    selected?: number;
    reverse?: boolean;
}>();

const emit = defineEmits<{
    (e: "selected", value: number): void;
}>();
</script>

<template>
    <div class="question">{{ `${index}. ${question}` }}</div>
    <mdui-list>
        <mdui-list-item
            rounded
            v-for="option in options"
            :value="option.score"
            :key="option.score"
            :headline="option.label"
            @click="emit('selected', option.score)"
        >
            <mdui-icon-circle--outlined
                v-if="selected !== option.score"
                slot="icon"
            ></mdui-icon-circle--outlined>
            <mdui-icon-check-circle--outlined v-else slot="icon"></mdui-icon-check-circle--outlined>
        </mdui-list-item>
    </mdui-list>
</template>

<style lang="css" scoped>
.question {
    margin: 1.5rem 0.5rem 0 0.5rem;
    display: block;
    color: rgb(var(--mdui-color-on-surface));
    font-size: var(--mdui-typescale-body-large-size);
    font-weight: var(--mdui-typescale-body-large-weight);
    letter-spacing: var(--mdui-typescale-body-large-tracking);
    line-height: var(--mdui-typescale-body-large-line-height);
}
</style>
