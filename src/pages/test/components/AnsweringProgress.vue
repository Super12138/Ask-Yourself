<script setup lang="ts">
import "mdui/components/linear-progress.js";
import { computed } from "vue";

const props = defineProps<{
    current: number;
    answered: number;
    total: number;
}>();

const progress = computed<number>(() => {
    if (props.total === 0) {
        return 0;
    }
    if (props.current < 0) {
        return 0;
    }
    return props.answered / props.total;
});
</script>

<template>
    <div>已答 {{ answered }} 题，共 {{ total }} 题</div>
    <mdui-linear-progress min="0" max="1" :value="progress"></mdui-linear-progress>
</template>

<style lang="css" scoped>
div {
    margin: 0.5rem !important;
    display: block;
    color: rgb(var(--mdui-color-on-surface));
    font-size: var(--mdui-typescale-body-medium-size);
    font-weight: var(--mdui-typescale-body-medium-weight);
    letter-spacing: var(--mdui-typescale-body-medium-tracking);
    line-height: var(--mdui-typescale-body-medium-line-height);
}

mdui-linear-progress {
    display: block;
    margin: 0.5rem;
    width: unset !important;
    --shape-corner: var(--mdui-shape-corner-full);
}
</style>
