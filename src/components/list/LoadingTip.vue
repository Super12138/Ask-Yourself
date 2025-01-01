<script setup lang="ts">
import 'mdui/components/circular-progress.js';
</script>

<template>
    <div>
        <mdui-circular-progress></mdui-circular-progress>
        <slot></slot>
    </div>
</template>

<style lang="css" scoped>
div {
    display: flex;
    flex-direction: column;
    /* 垂直排列子元素 */
    align-items: center;
    /* 水平居中 */
    justify-content: center;
    /* 垂直居中 */
    height: 100%;
    text-align: center;
    /* 让文本居中对齐 */
}
</style>