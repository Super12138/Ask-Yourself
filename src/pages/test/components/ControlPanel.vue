<script setup lang="ts">
import "mdui/components/button.js";

import "@mdui/icons/arrow-back--outlined.js";
import "@mdui/icons/arrow-forward--outlined.js";
import "@mdui/icons/check--outlined.js";

import { computed } from "vue";

const props = defineProps<{
    total: number;
    canNext: boolean;
}>();

enum NextButtonType {
    Start,
    Next,
    Finish,
}

const emit = defineEmits<{
    (e: "finish"): void;
}>();

const currentQuestion = defineModel<number>();

const nextButtonType = computed<NextButtonType>(() => {
    if (currentQuestion.value === -1) {
        return NextButtonType.Start;
    } else if (currentQuestion.value === props.total - 1) {
        return NextButtonType.Finish;
    } else {
        return NextButtonType.Next;
    }
});

const nextButtonDisabled = computed<boolean>(() => {
    if (currentQuestion.value === -1) {
        return false;
    } else if (currentQuestion.value <= props.total - 1) {
        return !props.canNext;
    } else {
        return true;
    }
});

const nextButtonLabel = computed<string>(() => {
    switch (nextButtonType.value) {
        case NextButtonType.Start:
            return "开始";
        case NextButtonType.Next:
            return "下一题";
        case NextButtonType.Finish:
            return "完成";
    }
});

const onNext = () => {
    if (nextButtonType.value === NextButtonType.Finish) {
        emit("finish");
    } else {
        currentQuestion.value++;
    }
};
</script>
<template>
    <div>
        <mdui-button
            v-if="nextButtonType !== NextButtonType.Start"
            class="previous"
            variant="tonal"
            :disabled="currentQuestion <= 0"
            @click="currentQuestion--"
        >
            <mdui-icon-arrow-back--outlined slot="icon"></mdui-icon-arrow-back--outlined>
            上一题
        </mdui-button>

        <mdui-button class="next" :disabled="nextButtonDisabled" @click="onNext">
            <mdui-icon-check--outlined
                v-if="nextButtonType === NextButtonType.Finish"
                slot="end-icon"
            ></mdui-icon-check--outlined>
            <mdui-icon-arrow-forward--outlined
                v-else
                slot="end-icon"
            ></mdui-icon-arrow-forward--outlined>
            {{ nextButtonLabel }}
        </mdui-button>
    </div>
</template>

<style lang="css" scoped>
div {
    display: block;
    margin: 1rem;
}

.previous {
    float: left;
}

.next {
    float: right;
}

div,
mdui-button {
    transition: all var(--mdui-motion-duration-short2) var(--mdui-motion-easing-standard);
}
</style>
