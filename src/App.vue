<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router';
import PWABadge from './components/PWABadge.vue';

import 'mdui/components/layout-item.js';
import 'mdui/components/layout-main.js';
import 'mdui/components/layout.js';

import { computed, onMounted, ref } from 'vue';
import type { PageItem } from './interfaces';

import TopAppBar from './components/TopAppBar.vue';
import NavBar from './components/NavigationBar.vue';
import NavRail from './components/NavigationRail.vue';

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
</style>