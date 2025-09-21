<script setup lang="ts">
defineProps<{
    reference: string;
}>();

const isURL = (url: string) => {
    return url.startsWith("http://") || url.startsWith("https://");
};
</script>

<template>
    <a v-if="isURL(reference)" :href="reference" target="_blank">{{ reference }}</a>
    <p v-else>
        {{ reference }}
    </p>
</template>

<style lang="css" scoped>
a,
p {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin: 0.1rem 0;
    /* display: block; */
}
</style>
