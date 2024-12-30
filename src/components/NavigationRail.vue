<script setup lang="ts">
import type { PropType } from 'vue';
import { RouterLink } from 'vue-router';

import type { PageItem } from '../interfaces';

import 'mdui/components/navigation-rail-item.js';
import 'mdui/components/navigation-rail.js';

import '@mdui/icons/brush--outlined.js';
import '@mdui/icons/list--outlined.js';
import '@mdui/icons/settings--outlined.js';

defineProps({
    value: {
        type: String,
        required: true,
    },
    pages: {
        type: Array as PropType<PageItem[]>,
        required: true,
    },
});
</script>

<template>
    <mdui-navigation-rail :value="value">
        <RouterLink v-for="page in pages" :key="page.value" :to="page.url" custom v-slot="{ navigate, href }">
            <mdui-navigation-rail-item :value="page.value" @click="navigate">
                <component :is="`mdui-icon-${page.icon}`" slot="icon"></component>
                {{ page.name }}
            </mdui-navigation-rail-item>
        </RouterLink>
    </mdui-navigation-rail>
</template>