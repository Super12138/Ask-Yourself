<script setup lang="ts">
import type { Answer } from "@/types";
import type { ScoringMethod } from "@/types/QuestionnaireFile";

const props = defineProps<{
    userAnswers?: Answer[];
    scoringMethod: ScoringMethod[];
}>();
</script>

<template>
    <h1>Result</h1>
    <div v-if="userAnswers">
        <h2>Your Answers:</h2>
        <ul>
            <li v-for="(answer, index) in userAnswers">
                Question {{ index }} (GroupId: <code>[{{ answer.groupId.join(", ") }}]</code>):
                Score = {{ answer.score }}
            </li>
        </ul>

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
