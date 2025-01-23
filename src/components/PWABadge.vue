<script setup lang="ts">
import { snackbar } from 'mdui';
import { useRegisterSW } from 'virtual:pwa-register/vue';
import { ref, watch } from 'vue';

// 每小时检查更新
const period = 60 * 60 * 1000;

const swActivated = ref(false);

/**
 * 这个函数将每小时注册一次定期同步检查，您可以根据需要修改间隔时间
 */
function registerPeriodicSync(swUrl: string, r: ServiceWorkerRegistration) {
    if (period <= 0) return;

    setInterval(async () => {
        if ('onLine' in navigator && !navigator.onLine) return;

        const resp = await fetch(swUrl, {
            cache: 'no-store',
            headers: {
                cache: 'no-store',
                'cache-control': 'no-cache',
            },
        });

        if (resp?.status === 200) await r.update();
    }, period);
}

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
    immediate: true,
    onRegisteredSW(swUrl, r) {
        if (period <= 0) return;
        if (r?.active?.state === 'activated') {
            swActivated.value = true;
            registerPeriodicSync(swUrl, r);
        } else if (r?.installing) {
            r.installing.addEventListener('statechange', (e) => {
                const sw = e.target as ServiceWorker;
                swActivated.value = sw.state === 'activated';
                if (swActivated.value) registerPeriodicSync(swUrl, r);
            });
        }
    },
});

watch(offlineReady, (newValue) => {
    if (newValue) {
        snackbar({
            message: '问心（不包含试题部分）已准备好在离线环境下运行',
        });
    }
});

watch(needRefresh, (newValue) => {
    if (newValue) {
        snackbar({
            message: '问心有新版本',
            action: '立即更新',
            onActionClick: () => {
                updateServiceWorker();
            },
        });
    }
}); // TODO: 只触发一次，节省性能
</script>

<template></template>
