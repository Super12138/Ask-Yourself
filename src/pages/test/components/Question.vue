<script setup lang="ts">
import "mdui/components/radio-group.js";
import "mdui/components/radio.js";
import "mdui/components/list-item.js";
import "mdui/components/list.js";

import type { OptionItem } from "@/types/QuestionnaireFile";
import type { RadioGroup } from "mdui/components/radio-group.js";

defineProps<{
    index: number;
    question: string;
    options: OptionItem[];
    reverse?: boolean;
}>();

const emit = defineEmits<{
    (e: "selected", value: number): void;
}>();
</script>

<template>
    <p>{{ `${index}. ${question}` }}</p>
    <mdui-radio-group
        @change="
            (e: CustomEvent<void> & Event) => {
                emit('selected', Number.parseInt((e.target as RadioGroup).value));
            }
        "
    >
        <mdui-radio v-for="option in options" :value="option.score" :key="option.score">
            {{ option.name }}
        </mdui-radio>
    </mdui-radio-group>
    <!-- <mdui-list>
        <mdui-list-item
            rounded
            v-for="option in options"
            :value="option.score"
            :key="option.score"
            :headline="option.name"
        >
            <mdui-radio slot="icon"></mdui-radio>
        </mdui-list-item>
    </mdui-list> -->
</template>

<style lang="css" scoped>
mdui-radio {
    width: 100%;
}
</style>
