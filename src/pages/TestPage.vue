<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const name = ref(route.query.name);

watch(() => route.query.name, (newName) => {
    name.value = newName;
});
</script>

<template>
    <div>
        <h1>测试</h1>
        <p>{{ name || '没有试题传参' }}</p>
    </div>
</template>