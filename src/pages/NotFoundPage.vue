<script setup lang="ts">
import "mdui/components/button.js";
import "@mdui/icons/cloud--outlined.js";

import { onMounted } from "vue";
import { RouterLink } from "vue-router";

onMounted(() => {
    document.body.classList.add("ready");
});
</script>

<template>
    <div class="mdui-prose">
        <mdui-icon-cloud--outlined></mdui-icon-cloud--outlined>
        <h2>页面未找到</h2>
        <p>
            你可能输入了错误的地址，或者访问了旧版问心的地址。<br />点击下方按钮让我们回到主页再试一次叭~
        </p>
        <RouterLink to="/" custom v-slot="{ href, navigate }">
            <mdui-button variant="tonal" :href="href" @click="navigate">回到主页</mdui-button>
        </RouterLink>
    </div>
</template>

<style lang="css" scoped>
div {
    display: flex;
    /* 垂直排列子元素 */
    flex-direction: column;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
    justify-content: center;
    height: calc(100vh - 2rem);
    /* 让文本居中对齐 */
    text-align: center;
    padding: 1rem;
}

h2 {
    margin: 1rem;
}

mdui-icon-cloud--outlined {
    height: 3rem;
    width: 3rem;
}
</style>
