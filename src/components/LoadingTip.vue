<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import CenterItem from './CenterItem.vue';

import 'mdui/components/circular-progress.js';

const { t } = useI18n();

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
            <slot>
                <p>{{ t("tips.loadingTipDefault") }}</p>
            </slot>
        </template>
    </CenterItem>
</template>