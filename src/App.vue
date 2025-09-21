<script setup lang="ts">
import { KeepAlive } from "vue";
import { RouterView } from "vue-router";
import FadeOutInTransition from "./components/transition/FadeOutInTransition.vue";
</script>

<template>
    <RouterView v-slot="{ Component }">
        <FadeOutInTransition>
            <KeepAlive exclude="TestPage">
                <component :is="Component" />
            </KeepAlive>
        </FadeOutInTransition>
    </RouterView>
</template>
