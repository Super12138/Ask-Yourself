<script setup lang="ts">
import "mdui/components/divider.js";
import LinkItem from "./LinkItem.vue";

defineProps<{
    name: string;
    description: string;
    answerTips: string;
    references: string[];
}>();
</script>

<template>
    <div>
        <h2>{{ name }}</h2>
        <p>{{ description }}</p>
        <!-- </div> -->
        <!-- <div> -->
        <h3>作答提示</h3>
        <strong class="red">{{ answerTips }}</strong>
        <!-- </div> -->
        <!-- <div> -->
        <h3>参考资料</h3>
        <LinkItem v-for="reference in references" :key="reference" :reference="reference" />
    </div>
</template>

<style lang="css" scoped>
h3 {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
}
</style>
