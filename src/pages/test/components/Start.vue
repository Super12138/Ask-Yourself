<script setup lang="ts">
import "@mdui/icons/person--outlined.js";
import "@mdui/icons/access-time--outlined.js";

import "mdui/components/divider.js";
import LinkItem from "./LinkItem.vue";

defineProps<{
    name: string;
    author: string;
    year: number;
    description: string;
    answerTips: string;
    references: string[];
}>();
</script>

<template>
    <div>
        <h2>{{ name }}</h2>
        <p class="basic-info">
            <mdui-icon-person--outlined></mdui-icon-person--outlined>
            {{ author }}
            <mdui-icon-access-time--outlined></mdui-icon-access-time--outlined>
            {{ year }} 年
        </p>

        <h3>量表介绍</h3>
        <p>{{ description }}</p>

        <h3>作答提示</h3>
        <strong class="red">{{ answerTips }}</strong>

        <h3>参考资料</h3>
        <LinkItem v-for="reference in references" :key="reference" :reference="reference" />
    </div>
</template>

<style lang="css" scoped>
.basic-info {
    display: flex;
    align-items: center;
}

mdui-icon-person--outlined {
    margin-right: 0.25rem;
}

mdui-icon-access-time--outlined {
    margin-left: 1rem;
    margin-right: 0.25rem;
}

h2 {
    margin-bottom: 0.5rem;
}

h3 {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
}
</style>
