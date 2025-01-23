<script setup lang="ts">
import type { PropType } from 'vue';
import { RouterLink } from 'vue-router';

import type { PageItem } from '@/interfaces/Interfaces';

import 'mdui/components/navigation-bar-item.js';
import 'mdui/components/navigation-bar.js';

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
    <mdui-navigation-bar :value="value">
        <RouterLink
            v-for="page in pages"
            :key="page.value"
            :to="page.url"
            custom
            v-slot="{ navigate, href }"
        >
            <mdui-navigation-bar-item
                :value="page.value"
                @click="navigate"
            >
                <component
                    :is="`mdui-icon-${page.icon}`"
                    slot="icon"
                ></component>
                {{ page.name }}
            </mdui-navigation-bar-item>
        </RouterLink>
    </mdui-navigation-bar>
</template>
