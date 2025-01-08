<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import CenterItem from './CenterItem.vue';

import 'mdui/components/circular-progress.js';

import '@mdui/icons/report-gmailerrorred--outlined.js';

const { t } = useI18n();
defineProps({
    error: {
        type: String,
        default: null,
    },
    loadingText: {
        type: String,
        default: null,
    },
});
</script>

<template>
    <CenterItem>
        <template #icon>
            <mdui-circular-progress v-if="!error"></mdui-circular-progress>
            <mdui-icon-report-gmailerrorred--outlined v-else></mdui-icon-report-gmailerrorred--outlined>
        </template>
        <template #content>
            <p v-if="!error">{{ loadingText? loadingText : t("tips.loadingTipList") }}</p>
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