<script setup lang="ts">
import "mdui/components/button-icon.js";
import "mdui/components/layout-item.js";
import "mdui/components/layout-main.js";
import "mdui/components/layout.js";
import "mdui/components/top-app-bar-title.js";
import "mdui/components/top-app-bar.js";

import "@mdui/icons/arrow-back--outlined.js";

import { RouterLink, useRoute } from "vue-router";
import { onMounted } from "vue";
import { useFetch } from "@vueuse/core";
import { QUESTIONNAIRE_BASE_URL } from "@/constants";

const route = useRoute();

const { isFetching, error, data } = useFetch(
    `${QUESTIONNAIRE_BASE_URL}/questionnaires/${route.params.name}.json?${new Date().getTime()}`,
);

onMounted(() => {
    document.body.classList.add("ready");
});
</script>

<template>
    <mdui-layout>
        <mdui-top-app-bar scroll-behavior="elevate" variant="small" scroll-target="#container">
            <RouterLink to="/" custom v-slot="{ isActive, href, navigate }">
                <mdui-button-icon :disabled="isActive" :href="href" @click="navigate">
                    <mdui-icon-arrow-back--outlined></mdui-icon-arrow-back--outlined>
                </mdui-button-icon>
            </RouterLink>
            <mdui-top-app-bar-title>测试</mdui-top-app-bar-title>
        </mdui-top-app-bar>
        <mdui-layout-main id="container">{{ data }}</mdui-layout-main>
    </mdui-layout>
</template>
