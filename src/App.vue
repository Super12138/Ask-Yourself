<script setup lang="ts">
// 导入
import { observeResize } from 'mdui';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterView, useRoute } from 'vue-router';

// 接口
import type { PageItem } from './interfaces/Interfaces';

// 组件
import NavBar from './components/NavigationBar.vue';
import NavRail from './components/NavigationRail.vue';
import PWABadge from './components/PWABadge.vue';
import TopAppBar from './components/TopAppBar.vue';

// MDUI 组件
import 'mdui/components/layout-item.js';
import 'mdui/components/layout-main.js';
import 'mdui/components/layout.js';

const { t } = useI18n();
const router = useRoute();
const currentPage = computed(() => router.name?.toString() || 'list');
const largeScreen = ref(window.innerWidth >= 840);

const pages = ref<PageItem[]>([
    {
        name: t('navigation.list'),
        value: 'list',
        icon: 'list--outlined',
        url: '/',
    },
    {
        name: t('navigation.test'),
        value: 'test',
        icon: 'brush--outlined',
        url: '/test',
    },
    {
        name: t('navigation.settings'),
        value: 'settings',
        icon: 'settings--outlined',
        url: '/settings',
    },
]);

onMounted(() => {
    observeResize(document.body, (entry, observer) => {
        entry.contentRect.width < 840
            ? (largeScreen.value = false)
            : (largeScreen.value = true);
    });
});
</script>

<template>
    <mdui-layout>
        <NavRail
            v-if="largeScreen"
            :value="currentPage"
            :pages="pages"
        />
        <NavBar
            v-else
            :value="currentPage"
            :pages="pages"
        />

        <mdui-layout-main id="container">
            <RouterView v-slot="{ Component }">
                <component :is="Component" />
            </RouterView>
        </mdui-layout-main>

        <TopAppBar />
    </mdui-layout>
    <PWABadge />
</template>

<style lang="css">
mdui-layout {
    height: 100vh;
}

/* mdui-layout-main {
  margin: 8px;
} */
</style>
