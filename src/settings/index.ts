import 'mdui/components/dialog.js';
import 'mdui/components/dropdown.js';
import 'mdui/components/segmented-button-group.js';
import 'mdui/components/segmented-button.js';
import 'mdui/components/switch.js';

import '@mdui/icons/delete--outlined.js';
import '@mdui/icons/info--outlined.js';
import '@mdui/icons/mode-night--outlined.js';

import type { Button } from 'mdui/components/button.js';
import type { Dialog } from 'mdui/components/dialog.js';
import type { ListItem } from 'mdui/components/list-item.js';
import type { SegmentedButtonGroup } from 'mdui/components/segmented-button-group.js';

import { QuestionnairesList } from '../interfaces';
import { getStorageItem, setStorageItem } from '../utils/localstorage';
import { LogHelper } from '../utils/LogHelper';
import { getFile } from '../utils/network';
import { showClearAllDataDialog } from '../utils/notices';

const logHelper = LogHelper.getInstance();

document.addEventListener('settingsPageLoaded', async () => {
    const clearAllDataItem: ListItem = document.querySelector('#clearAllDataItem')!;
    const darkModeItem: SegmentedButtonGroup = document.querySelector('#darkMode')!;

    const aboutItem: ListItem = document.querySelector('#aboutItem')!;
    const aboutDialog: Dialog = document.querySelector('#about')!;
    const aboutCloseBtn: Button = document.querySelector('#aboutCloseBtn')!;
    const appVersion: HTMLParagraphElement = document.querySelector('#appVersion')!;
    const listVersion: HTMLParagraphElement = document.querySelector('#listVersion')!;
    appVersion.innerHTML = `网站版本：${VERSION_NAME}-${VARIANT}-${COMMIT_HASH} (${VERSION_CODE})`;

    getFile(`https://cdn.jsdelivr.net/gh/Super12138/AY-Questionnaires-DB@minify/list.json?${new Date().getTime()}`)
        .then((response: string) => {
            const json: QuestionnairesList = JSON.parse(response);

            listVersion.innerHTML = `题库版本：${json.version}`;
        })
        .catch(error => logHelper.log(error));

    const darkMode = getStorageItem('darkMode');
    if (darkMode !== null) {
        darkModeItem.value = darkMode;
    } else {
        darkModeItem.value = 'auto';
    }

    clearAllDataItem.addEventListener('click', () => {
        showClearAllDataDialog();
    });

    aboutItem.addEventListener('click', () => {
        aboutDialog.open = true;
    });

    aboutCloseBtn.addEventListener('click', () => {
        aboutDialog.open = false;
    });

    darkModeItem.addEventListener('change', () => {
        switchDarkMode(darkModeItem.value);
        if (darkModeItem.value == '') {
            setStorageItem('darkMode', 'auto');
        } else {
            setStorageItem('darkMode', darkModeItem.value);
        }
    });
});

export function switchDarkMode(darkMode: string | string[]) {
    switch (darkMode) {
        case 'auto':
            document.documentElement.classList.remove('mdui-theme-light');
            document.documentElement.classList.remove('mdui-theme-dark');
            document.documentElement.classList.add('mdui-theme-auto');
            break;

        case 'light':
            document.documentElement.classList.remove('mdui-theme-auto');
            document.documentElement.classList.remove('mdui-theme-dark');
            document.documentElement.classList.add('mdui-theme-light');
            break;

        case 'dark':
            document.documentElement.classList.remove('mdui-theme-auto');
            document.documentElement.classList.remove('mdui-theme-light');
            document.documentElement.classList.add('mdui-theme-dark');
            break;
        default:
            document.documentElement.classList.remove('mdui-theme-light');
            document.documentElement.classList.remove('mdui-theme-dark');
            document.documentElement.classList.add('mdui-theme-auto');
            break;
    }
}