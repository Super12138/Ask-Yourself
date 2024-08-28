import { exec } from 'child_process';
import path from 'path';
import { promisify } from 'util';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
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