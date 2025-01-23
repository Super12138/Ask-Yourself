<template>
    <div>
        <slot name="icon"></slot>
        <slot name="content"></slot>
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
    height: 100%;
    /* 让文本居中对齐 */
    text-align: center;
}
</style>
