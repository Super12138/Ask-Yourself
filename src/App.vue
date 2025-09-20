<script setup lang="ts">
import { RouterView } from "vue-router";
import FadeOutInTransition from "./components/transition/FadeOutInTransition.vue";
</script>

<template>
    <FadeOutInTransition>
        <RouterView />
    </FadeOutInTransition>
</template>
