<script setup lang="ts">
import "mdui/components/button.js";

import "@mdui/icons/arrow-back--outlined.js";
import "@mdui/icons/arrow-forward--outlined.js";
import "@mdui/icons/check--outlined.js";

defineProps<{
    totalQuestion: number;
}>();

const emit = defineEmits<{
    (e: "finish"): void;
}>();

const currentQuestion = defineModel<number>();
</script>
<template>
    <p>当前题号{{ currentQuestion + 1 }}，共{{ totalQuestion }}</p>
    <div>
        <mdui-button v-if="currentQuestion === -1" @click="currentQuestion++">
            <mdui-icon-arrow-forward--outlined slot="end-icon"></mdui-icon-arrow-forward--outlined>
            开始
        </mdui-button>
        <template v-else>
            <mdui-button
                variant="tonal"
                :disabled="currentQuestion === 0"
                @click="currentQuestion--"
            >
                <mdui-icon-arrow-back--outlined slot="icon"></mdui-icon-arrow-back--outlined>
                上一题
            </mdui-button>
            <mdui-button
                :disabled="currentQuestion == totalQuestion - 1"
                v-if="currentQuestion < totalQuestion - 1"
                @click="currentQuestion++"
            >
                <mdui-icon-arrow-forward--outlined
                    slot="end-icon"
                ></mdui-icon-arrow-forward--outlined>
                下一题
            </mdui-button>
            <mdui-button v-else @click="emit('finish')">
                <mdui-icon-check--outlined slot="end-icon"></mdui-icon-check--outlined>
                提交
            </mdui-button>
        </template>
    </div>
</template>

<style lang="css" scoped>
div {
    display: flex;
    justify-content: space-between;
    margin: 8px;
}
</style>
