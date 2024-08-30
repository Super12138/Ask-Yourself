import 'mdui/components/dialog.js';
import 'mdui/components/dropdown.js';
import 'mdui/components/switch.js';

import '@mdui/icons/delete--outlined.js';
import '@mdui/icons/info--outlined.js';

import type { Button } from 'mdui/components/button.js';
import type { Dialog } from 'mdui/components/dialog.js';
import type { ListItem } from 'mdui/components/list-item.js';

import { showClearAllDataDialog } from '../utils/notices';
import { getFile } from '../utils/network';
import { QuestionnairesList } from '../interfaces';
import { LogHelper } from '../utils/LogHelper';

const logHelper = LogHelper.getInstance();

document.addEventListener('settingsPageLoaded', async () => {
    const clearAllDataItem: ListItem = document.querySelector('#clearAllDataItem')!;

    const aboutItem: ListItem = document.querySelector('#aboutItem')!;
    const aboutDialog: Dialog = document.querySelector('#about')!;
    const aboutCloseBtn: Button = document.querySelector('#aboutCloseBtn')!;
    const appVersion: HTMLParagraphElement = document.querySelector('#appVersion')!;
    const listVersion: HTMLParagraphElement = document.querySelector('#listVersion')!;
    appVersion.innerHTML = `网站版本：${VERSION_NAME}-${VARIANT}-${COMMIT_HASH} (${VERSION_CODE})`;
    
    getFile(`https://cdn.jsdelivr.net/gh/Super12138/AY-Questionnaires-DB@main/list.json?${new Date().getTime()}`)
        .then((response: string) => {
            const json: QuestionnairesList = JSON.parse(response);

            listVersion.innerHTML = `题库版本：${json.version}`;
        })
        .catch(error => logHelper.log(error));

    clearAllDataItem.addEventListener('click', () => {
        showClearAllDataDialog();
    });

    aboutItem.addEventListener('click', () => {
        aboutDialog.open = true;
    });

    aboutCloseBtn.addEventListener('click', () => {
        aboutDialog.open = false;
    });
});