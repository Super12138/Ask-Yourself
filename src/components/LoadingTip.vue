<script setup lang="ts">
import CenterItem from "./CenterItem.vue";

import "mdui/components/circular-progress.js";

import "@mdui/icons/report-gmailerrorred--outlined.js";

import { computed } from "vue";

const props = defineProps<{
    loadingTip?: string;
    error?: string;
}>();

const loadingText = computed(() => props.loadingTip || "正在加载，很快就好");
</script>

<template>
    <CenterItem>
        <template #icon>
            <mdui-circular-progress v-if="!error"></mdui-circular-progress>
            <mdui-icon-report-gmailerrorred--outlined
                v-else
            ></mdui-icon-report-gmailerrorred--outlined>
        </template>
        <template #content>
            <p v-if="!error">{{ loadingText }}</p>
            <p v-else>{{ error }}</p>
            <slot></slot>
        </template>
    </CenterItem>
</template>

<style lang="css" scoped>
mdui-circular-progress {
    margin: 1rem;
}

mdui-icon-report-gmailerrorred--outlined {
    height: 2.5rem;
    width: 2.5rem;
    margin: 1rem;
}

p {
    margin: 0;
    padding: 0;
}
</style>
