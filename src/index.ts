import 'mdui/components/button-icon.js';
import 'mdui/components/divider.js';
import 'mdui/components/layout-item.js';
import 'mdui/components/layout-main.js';
import 'mdui/components/layout.js';
import 'mdui/components/navigation-bar-item.js';
import 'mdui/components/navigation-bar.js';
import 'mdui/components/navigation-rail-item.js';
import 'mdui/components/navigation-rail.js';
import 'mdui/components/top-app-bar-title.js';
import 'mdui/components/top-app-bar.js';
import 'mdui/mdui.css';

import type { LayoutMain } from 'mdui/components/layout-main.js';
import type { NavigationBarItem } from 'mdui/components/navigation-bar-item.js';
import type { NavigationBar } from 'mdui/components/navigation-bar.js';
import type { NavigationRailItem } from 'mdui/components/navigation-rail-item.js';
import type { NavigationRail } from 'mdui/components/navigation-rail.js';
import type { TopAppBarTitle } from 'mdui/components/top-app-bar-title.js';

import '@mdui/icons/brush--outlined.js';
import '@mdui/icons/list--outlined.js';
import '@mdui/icons/settings--outlined.js';
import { PageItem } from './interfaces';
import { initPWA } from './pwa/pwa';
import { hide, show } from './utils/element';
import { getFile } from './utils/network';
import { showDisclaimerDialog } from './utils/notices';
import { switchDarkMode } from './settings';
import { getStorageItem } from './utils/localstorage';

const navigationRail: NavigationRail = document.querySelector('#navigationRail')!;
const container: LayoutMain = document.querySelector('#container')!;
const navigationBar: NavigationBar = document.querySelector('#navigationBar')!;
const appTitle: TopAppBarTitle = document.querySelector('#appTitle')!;

const pages: PageItem[] = [
    {
        name: '题库',
        value: 'list',
        icon: 'list--outlined',
        url: 'list.html'
    },
    {
        name: '答题',
        value: 'test',
        icon: 'brush--outlined',
        url: 'test.html'
    },
    {
        name: '设置',
        value: 'settings',
        icon: 'settings--outlined',
        url: 'settings.html'
    }
]

window.addEventListener('resize', () => {
    checkWidth();
});

const url: URL = new URL(window.location.href);
const currentPage: string | null = url.searchParams.get("page");

let page: PageItem;

window.addEventListener('DOMContentLoaded', async () => {
    // 设置当前页面
    for (let i = 0; i < pages.length; i++) {
        if (pages[i].value === currentPage) {
            page = pages[i];
            break;
        }
    }

    if (currentPage === null) {
        page = pages[0];
    }

    for (let i = 0; i < pages.length; i++) {
        navigationRail.appendChild(makeActionElement(pages[i], 'mdui-navigation-rail-item'));
        navigationBar.appendChild(makeActionElement(pages[i], 'mdui-navigation-bar-item'));
    }

    const pageData = await getFile(page.url);

    navigationRail.value = page.value;
    navigationBar.value = page.value;
    document.title = `${page.name} - 问心`;
    appTitle.textContent = page.name;

    checkWidth();

    // 创建 MutationObserver 实例并提供回调函数
    const observer = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                // 检查是否插入了新内容
                if (mutation.addedNodes.length > 0) {
                    // 页面加载完成（看看要不要删掉）
                    switch (page.value) {
                        case 'list':
                            document.dispatchEvent(new Event('listPageLoaded'));
                            break;

                        case 'test':
                            document.dispatchEvent(new Event('testPageLoaded'));
                            break;

                        case 'settings':
                            document.dispatchEvent(new Event('settingsPageLoaded'));
                            break;

                        default:
                            document.dispatchEvent(new Event('listPageLoaded'));
                            break;
                    }
                    observer.disconnect();
                }
            }
        }
    });

    // 启动观察
    observer.observe(container, { childList: true, subtree: true });
    // 深色模式
    const darkMode = getStorageItem('darkMode');
    if (darkMode !== null) switchDarkMode(darkMode);
    // 将不同页面的内容上屏
    container.innerHTML = pageData;
    // 展示使用提示对话框
    showDisclaimerDialog();
    // 显示页面内容
    document.body.classList.add('ready');
    // 初始化 PWA
    initPWA();
});

/**
 * 生成侧边/底部导航栏的元素
 * @param item 单个导航元素
 * @param type 可选值：mdui-navigation-bar-item | mdui-navigation-rail-item
 * @returns 
 */
function makeActionElement(item: PageItem, type: string) {
    const element: NavigationBarItem | NavigationRailItem = document.createElement(type) as NavigationBarItem | NavigationRailItem;
    element.setAttribute("value", item.value);
    element.addEventListener('click', () => {
        if (item.value !== page.value) {
            window.location.href = `?page=${item.value}`;
        }
    });

    const iconElement: HTMLElement = document.createElement(`mdui-icon-${item.icon}`);
    iconElement.setAttribute("slot", "icon");
    element.appendChild(iconElement);

    const nameTextNode: Text = document.createTextNode(item.name);
    element.appendChild(nameTextNode);

    return element;
}

/**
 * 检查窗口宽度并判断是否显示侧边栏/底部导航栏
 */
function checkWidth() {
    if (window.innerWidth < 840) {
        hide(navigationRail);
        navigationBar.style.display = '';
    } else {
        show(navigationRail);
        navigationBar.style.display = 'none';
    }
}