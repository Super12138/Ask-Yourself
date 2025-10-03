<script setup lang="ts">
import { KeepAlive } from "vue";
import { RouterView } from "vue-router";
import SlideFadeOutInTransition from "./components/transition/SlideFadeOutInTransition.vue";
</script>

<template>
    <RouterView v-slot="{ Component }">
        <SlideFadeOutInTransition>
            <KeepAlive exclude="TestPage">
                <component :is="Component" />
            </KeepAlive>
        </SlideFadeOutInTransition>
    </RouterView>
</template>
