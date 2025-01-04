<script setup lang="ts">
import { RouterLink } from 'vue-router';
import CenterItem from '@/components/CenterItem.vue';

import 'mdui/components/button.js';

import '@mdui/icons/report-gmailerrorred--outlined.js';
</script>

<template>
    <CenterItem>
        <template #icon>
            <mdui-icon-report-gmailerrorred--outlined></mdui-icon-report-gmailerrorred--outlined>
        </template>
        <template #content>
            <h2>未找到页面</h2>
            <p>别担心，点击下方按钮回到题库页面吧</p>
            <RouterLink to="/" custom v-slot="{ navigate }">
                <mdui-button variant="tonal" @click="navigate">回到题库</mdui-button>
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