<script setup lang="ts">
import CenterItem from './CenterItem.vue';

import 'mdui/components/circular-progress.js';

defineProps({
    showLoadingTip: {
        type: Boolean,
        default: true,
    },
});
</script>

<template>
    <CenterItem>
        <template #icon>
            <mdui-circular-progress v-if="showLoadingTip"></mdui-circular-progress>
        </template>
        <template #content>
            <slot><p>加载中，请稍后</p></slot>
        </template>
    </CenterItem>
</template>