<template>
    <Transition name="slide-fade" mode="out-in">
        <slot></slot>
    </Transition>
</template>

<style lang="css">
/* Transition 组件淡入淡出动画（Fade） */
.slide-fade-enter-active {
    transition: all 0.1s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
    transform: translateX(20px);
    opacity: 0;
}

.slide-fade-leave-to {
    transform: translateX(-20px);
    opacity: 0;
}
</style>
