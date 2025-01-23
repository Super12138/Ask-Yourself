<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import 'mdui/components/top-app-bar-title.js';
import 'mdui/components/top-app-bar.js';

const { t } = useI18n();
</script>

<template>
    <mdui-top-app-bar scroll-behavior="elevate" scroll-target="#container">
        <mdui-top-app-bar-title>{{ t("app.name") }}</mdui-top-app-bar-title>
    </mdui-top-app-bar>
</template>