import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { VitePWA } from 'vite-plugin-pwa';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag.startsWith('mdui-')
                }
            }
        }),
        vueDevTools(),
        VitePWA({
            registerType: 'prompt',
            injectRegister: false,

            pwaAssets: {
                disabled: false,
                config: true,
            },

            manifest: {
                name: '问心',
                short_name: '问心',
                description: '常用心理量表集合',
                theme_color: '#ffffff',
                lang: "zh",
            },

            workbox: {
                globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
                cleanupOutdatedCaches: true,
                clientsClaim: true,
            },

            devOptions: {
                enabled: false,
                navigateFallback: 'index.html',
                suppressWarnings: true,
                type: 'module',
            },
        }),
        createHtmlPlugin({
            minify: true,
        }),
    ],
    server: {
        open: true
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        // return id.toString().split('node_modules/')[1].split('/')[0].toString();
                        if (id.includes('mdui')) {
                            return 'mdui';
                        }
                        return 'vendor';
                    }
                }
            }
        }
    }
});