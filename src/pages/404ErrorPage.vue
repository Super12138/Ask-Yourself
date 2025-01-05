<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';

import CenterItem from '@/components/shared/CenterItem.vue';

import 'mdui/components/button.js';

import '@mdui/icons/report-gmailerrorred--outlined.js';

const { t } = useI18n();
</script>

<template>
    <CenterItem>
        <template #icon>
            <mdui-icon-report-gmailerrorred--outlined></mdui-icon-report-gmailerrorred--outlined>
        </template>
        <template #content>
            <h2>{{ t("pageNotFound.title") }}</h2>
            <p>{{ t("pageNotFound.backTip")}}</p>
            <RouterLink to="/" custom v-slot="{ navigate }">
                <mdui-button variant="tonal" @click="navigate">{{ t("pageNotFound.backBtn") }}</mdui-button>
            </RouterLink>
        </template>
    </CenterItem>
</template>

<style lang="css" scoped>
mdui-icon-report-gmailerrorred--outlined {
    height: 3rem;
    width: 3rem;
    margin: 1rem;
}

mdui-button {
    margin: 0.5rem;
}
</style>