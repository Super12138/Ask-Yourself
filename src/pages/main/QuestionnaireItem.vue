<script setup lang="ts">
import type { QuestionnaireListItem } from "@/types/QuestionnaireList";
import { computed } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps<{
    questionnaire: QuestionnaireListItem;
}>();

const language = computed(() => {
    switch (props.questionnaire.lang) {
        case "zh":
            return "中文版";
        case "en":
            return "英文版";
    }
});
</script>

<template>
    <RouterLink
        :to="`/test/${questionnaire.value}`"
        :key="questionnaire.value"
        custom
        v-slot="{ isActive, href, navigate }"
    >
        <mdui-list-item
            :headline="questionnaire.name"
            :description="language"
            :href="href"
            :disabled="isActive"
            @click="navigate"
        ></mdui-list-item>
    </RouterLink>
</template>
