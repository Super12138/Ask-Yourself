<script setup lang="ts">
import "mdui/components/button-icon.js";
import "mdui/components/layout-item.js";
import "mdui/components/layout-main.js";
import "mdui/components/layout.js";
import "mdui/components/top-app-bar-title.js";
import "mdui/components/top-app-bar.js";

import "@mdui/icons/arrow-back--outlined.js";
import { RouterLink } from "vue-router";
</script>

<template>
    <mdui-layout>
        <mdui-top-app-bar scroll-behavior="elevate" variant="large" scroll-target="#container">
            <RouterLink to="/" custom v-slot="{ isActive, href, navigate }">
                <mdui-button-icon :disabled="isActive" :href="href" @click="navigate">
                    <mdui-icon-arrow-back--outlined></mdui-icon-arrow-back--outlined>
                </mdui-button-icon>
            </RouterLink>
            <mdui-top-app-bar-title>这里是问卷名称</mdui-top-app-bar-title>
        </mdui-top-app-bar>
        <mdui-layout-main> </mdui-layout-main>
    </mdui-layout>
</template>
