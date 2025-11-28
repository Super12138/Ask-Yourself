<script setup lang="ts">
import type { GroupedAnswer } from "@/types";
import type { ScoringMethod } from "@/types/QuestionnaireFile";
import { watch } from "vue";

const props = defineProps<{
    groupedAnswers: GroupedAnswer;
    scoringMethod: ScoringMethod[];
}>();

watch(
    () => props.groupedAnswers,
    (answers) => {
        if (!answers) return;
    },
    { immediate: true },
);
</script>

<template>
    <h1>Result</h1>
    <div v-if="groupedAnswers">
        <h2>Your Answers:</h2>
        <p>{{ groupedAnswers }}</p>

        <h2>Scoring Method:</h2>
        <ul>
            <li v-for="(method, index) in scoringMethod">
                GroupId: <code>{{ method.groupId }}</code
                >, name: {{ method.name }}, method: {{ method.method }}, ranges:
                <ul>
                    <li v-for="(range, rIndex) in method.ranges">
                        {{ range.min }} - {{ range.max }}: {{ range.name }}
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<style lang="css"></style>
