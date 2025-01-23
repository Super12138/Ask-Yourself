<script setup lang="ts">
defineProps({
    content: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
});
</script>

<template>
    <mdui-radio :value="score">88888{{ content }}</mdui-radio>
</template>

<style lang="css" scoped>
mdui-radio {
    width: 100%;
}
</style>
