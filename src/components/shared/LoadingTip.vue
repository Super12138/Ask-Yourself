<script setup lang="ts">
import { computed, type PropType } from 'vue';
import { useI18n } from 'vue-i18n';

import { LoadState, type LoadingState } from '@/interfaces/Interfaces';

import CenterItem from './CenterItem.vue';

import 'mdui/components/circular-progress.js';

import '@mdui/icons/report-gmailerrorred--outlined.js';

const { t } = useI18n();
const props = defineProps({
    loadingState: {
        type: Object as PropType<LoadingState>,
        required: true
    },
});

const errorTip = computed(() => {
    if (props.loadingState.currentState === LoadState.Error) {
        return props.loadingState.error;
    } else if (props.loadingState.loadingTip) {
        return props.loadingState.loadingTip;
    } else {
        return t("tips.loadingTipDefault");
    };
});
</script>

<template>
    <CenterItem>
        <template #icon>
            <mdui-circular-progress v-if="loadingState.currentState === LoadState.Loading"></mdui-circular-progress>
            <mdui-icon-report-gmailerrorred--outlined
                v-else-if="loadingState.currentState === LoadState.Error"></mdui-icon-report-gmailerrorred--outlined>
        </template>
        <template #content>
            <p>{{ errorTip }}</p>
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