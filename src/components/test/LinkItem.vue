<script setup lang="ts">
import { isURL } from '@/utils/string';

defineProps({
    reference: {
        type: String,
        required: true
    }
});
</script>

<template>
    <a v-if="isURL(reference)" :href="reference" class="link" target="_blank">{{ reference }}</a>
    <p v-else class="link">{{ reference }}</p>
</template>

<style lang="css" scoped>
a,
p {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin: 0.1rem 0;
    display: block;
}
</style>