import { exec } from 'child_process';
import path from 'path';
import { promisify } from 'util';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { VitePWA } from 'vite-plugin-pwa';
import packageJson from './package.json';

const execPromise = promisify(exec);

async function getVersionInfo() {
    try {
        const { stdout: versionCode } = await execPromise("git rev-list --count HEAD");
        const { stdout: commitHash } = await execPromise("git rev-parse --short HEAD");
        return {
            versionCode: versionCode.trim(),
            commitHash: commitHash.trim(),
        };
    } catch (error) {
        console.error(`执行命令时发生错误：${error}`);
        throw error;
    }
}

export default defineConfig(async ({ command, mode, isSsrBuild, isPreview }) => {
    const { versionCode, commitHash } = await getVersionInfo();
    const baseConfig = {
        build: {
            rollupOptions: {
                input: {
                    index: path.resolve(__dirname, 'index.html'),
                    list: path.resolve(__dirname, 'list.html'),
                    test: path.resolve(__dirname, 'test.html'),
                    settings: path.resolve(__dirname, 'settings.html'),
                },
            },
        },
        plugins: [
            createHtmlPlugin({
                minify: true,
            }),
            VitePWA({
                strategies: 'injectManifest',
                srcDir: 'src/pwa',
                filename: 'sw.ts',
                registerType: 'prompt',
                injectRegister: false,

                pwaAssets: {
                    disabled: false,
                    config: true,
                },

                manifest: {
                    name: '问心',
                    short_name: '问心',
                    start_url: '/Ask-Yourself/',
                    description: '心理量表集合',
                    lang: "zh",
                    theme_color: '#ffffff',
                    orientation: "any",
                    dir: "ltr",
                    shortcuts: [
                        {
                            "name": "问心",
                            "url": "index.html",
                            "description": "问心"
                        }
                    ],
                },

                injectManifest: {
                    globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
                },

                devOptions: {
                    enabled: false,
                    navigateFallback: 'index.html',
                    suppressWarnings: true,
                    type: 'module',
                },
            })
        ],
    };
    if (command === 'serve') {
        return {
            ...baseConfig,
            server: {
                open: true,
                hmr: {
                    protocol: "ws",
                }
            },
            define: {
                VERSION_NAME: JSON.stringify(packageJson.version),
                VARIANT: JSON.stringify("dev"),
                COMMIT_HASH: JSON.stringify(commitHash),
                VERSION_CODE: JSON.stringify(versionCode),
            },
        }
    } else {
        return {
            ...baseConfig,
            base: '/Ask-Yourself/',
            define: {
                VERSION_NAME: JSON.stringify(packageJson.version),
                VARIANT: JSON.stringify("web"),
                COMMIT_HASH: JSON.stringify(commitHash),
                VERSION_CODE: JSON.stringify(versionCode),
            },
        }
    }
});