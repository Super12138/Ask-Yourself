<script setup lang="ts">
// 导入
import { computed, onMounted, ref } from 'vue';
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

const router = useRoute();
const currentPage = computed(() => router.name?.toString() || 'list');
const largeScreen = ref(window.innerWidth >= 840);

const pages = ref<PageItem[]>([
  {
    name: '题库',
    value: 'list',
    icon: 'list--outlined',
    url: '/'
  },
  {
    name: '答题',
    value: 'test',
    icon: 'brush--outlined',
    url: '/test'
  },
  {
    name: '设置',
    value: 'settings',
    icon: 'settings--outlined',
    url: '/settings'
  }
]);

onMounted(() => {
  window.addEventListener('resize', () => {
    window.innerWidth < 840 ? largeScreen.value = false : largeScreen.value = true;
  });
});
</script>

<template>
  <mdui-layout>
    <NavRail v-if="largeScreen" :value="currentPage" :pages="pages" />
    <NavBar v-else :value="currentPage" :pages="pages" />

    <mdui-layout-main id="container">
      <RouterView />
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