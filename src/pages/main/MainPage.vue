<script setup lang="ts">
import "mdui/components/button-icon.js";
import "mdui/components/layout-item.js";
import "mdui/components/layout-main.js";
import "mdui/components/layout.js";
import "mdui/components/list-item.js";
import "mdui/components/list-subheader.js";
import "mdui/components/list.js";
import "mdui/components/top-app-bar-title.js";
import "mdui/components/top-app-bar.js";

import "@mdui/icons/settings--outlined.js";

import { QUESTIONNAIRE_BASE_URL } from "@/constants";
import type { QuestionnairesList } from "@/types/QuestionnaireList";
import { useFetch } from "@vueuse/core";
import { onMounted, ref, watch } from "vue";
import { RouterLink } from "vue-router";

const { isFetching, error, data } = useFetch(
    `${QUESTIONNAIRE_BASE_URL}/list.json?${new Date().getTime()}`,
);
const questionnairesList = ref<QuestionnairesList>();

watch(data, (listString: string) => {
    questionnairesList.value = JSON.parse(listString) as QuestionnairesList;
});

onMounted(() => {
    document.body.classList.add("ready");
});
</script>

<template>
    <mdui-layout>
        <mdui-top-app-bar scroll-behavior="elevate" variant="small" scroll-target="#container">
            <mdui-top-app-bar-title>问心</mdui-top-app-bar-title>
            <div style="flex-grow: 1"></div>
            <mdui-button-icon>
                <mdui-icon-settings--outlined></mdui-icon-settings--outlined>
            </mdui-button-icon>
        </mdui-top-app-bar>
        <mdui-layout-main id="container">
            <mdui-list v-if="!isFetching && !error && questionnairesList">
                <template v-for="category in questionnairesList.categories">
                    <mdui-list-subheader>
                        {{ category.name }}
                    </mdui-list-subheader>
                    <RouterLink
                        v-for="questionnaire in category.questionnaires"
                        :to="`/test/${questionnaire.value}`"
                        custom
                        v-slot="{ isActive, href, navigate }"
                    >
                        <mdui-list-item
                            :headline="questionnaire.name"
                            :description="questionnaire.lang"
                            :href="href"
                            @click="navigate"
                        ></mdui-list-item>
                    </RouterLink>
                </template>
            </mdui-list>
        </mdui-layout-main>
    </mdui-layout>
</template>
