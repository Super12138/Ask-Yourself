<script setup lang="ts">
import "mdui/components/button-icon.js";
import "mdui/components/layout-item.js";
import "mdui/components/layout-main.js";
import "mdui/components/layout.js";
import "mdui/components/top-app-bar-title.js";
import "mdui/components/top-app-bar.js";

import "@mdui/icons/settings--outlined.js";
</script>

<template>
    <mdui-layout>
        <mdui-top-app-bar scroll-behavior="elevate" variant="large" scroll-target="#container">
            <mdui-top-app-bar-title>问心</mdui-top-app-bar-title>
            <div style="flex-grow: 1"></div>
            <mdui-button-icon>
                <mdui-icon-settings--outlined></mdui-icon-settings--outlined>
            </mdui-button-icon>
        </mdui-top-app-bar>
        <mdui-layout-main>
            <RouterLink to="/test">前往答题页面</RouterLink>
        </mdui-layout-main>
    </mdui-layout>
</template>
