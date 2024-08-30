import 'mdui/components/badge.js';
import 'mdui/components/list-item.js';
import 'mdui/components/list-subheader.js';
import 'mdui/components/list.js';
import 'mdui/components/text-field.js';

import type { Badge } from 'mdui/components/badge.js';
import type { ListSubheader } from 'mdui/components/list-subheader.js';
import type { List } from 'mdui/components/list.js';
import { Category, QuestionnaireList, QuestionnaireListItem, QuestionnairesList } from '../interfaces';
import { hide, show } from '../utils/element';
// import { TextField } from 'mdui/components/text-field.js';
import { LogHelper } from '../utils/LogHelper';
import { getFile } from '../utils/network';

const languages: string[] = ['中文版', '英文版'];
const logHelper = LogHelper.getInstance();

document.addEventListener('listPageLoaded', async () => {
    const mduiList: List = document.querySelector('#questionnaireList')!;
    const loadingTip: HTMLDivElement = document.querySelector('#loadingTip')!;
    hide(mduiList);
    // const searchBar: TextField = document.querySelector('#searchBar')!;
    getFile(`https://cdn.jsdelivr.net/gh/Super12138/AY-Questionnaires-DB@main/list.json?${new Date().getTime()}`)
        .then((response: string) => {
            const json: QuestionnairesList = JSON.parse(response);
            const catogories: Category[] = json.categories; // 获取分组

            for (const group in catogories) { // 遍历大组内的每一个小组
                const listContainer: HTMLDivElement = document.createElement('div'); // 创建包裹每个列表项的容器（响应式布局）
                listContainer.className = 'items-container';

                for (const item of catogories[group].questionnaires) { // 遍历每个小问卷组的每一个量表的信息
                    makeListElement(item, listContainer); // 生成列表项
                }

                const subheader: ListSubheader = document.createElement('mdui-list-subheader'); // 列表子标题
                subheader.textContent = catogories[group].name; // 设置子标题为每个分组的名称

                mduiList.appendChild(subheader); // 添加子标题
                mduiList.appendChild(listContainer); // 添加列表项
            }
            loadingTip.style.opacity = "0";
            setTimeout(() => {
                hide(loadingTip);
                mduiList.style.opacity = "1";
            }, 100)
            show(mduiList);
        })
        .catch((error) => {
            logHelper.error(error);
            const errorElement: HTMLParagraphElement = document.createElement('p');
            errorElement.style.width = '100%';
            errorElement.style.textAlign = 'center';
            errorElement.innerHTML = `加载列表时出现问题：<code>${error}</code></p>`
            document.querySelector<HTMLDivElement>('#container')!.appendChild(errorElement);
            hide(loadingTip);
            hide(mduiList);
        })
});

function makeListElement(item: QuestionnaireList, listContainer: HTMLElement) {
    // 创建列表项
    const listItem: QuestionnaireListItem = document.createElement('mdui-list-item') as QuestionnaireListItem;
    listItem.alignment = 'center'; // 居中对齐
    listItem.value = item.value; // 设置传参名称
    listItem.textContent = item.name; // 设置量表名称
    listItem.description = item.lang === "en" ? languages[1] : languages[0]; // 判断语言
    listItem.addEventListener('click', () => {
        window.location.href = `?page=test&name=${item.value}`; // 点击跳转答题页面
    })

    // 判断是否为新增列表
    if (item.new) {
        const badge: Badge = document.createElement('mdui-badge');
        badge.variant = 'large';
        badge.textContent = '新';
        // // 将标签上标
        // const sup: HTMLElement = document.createElement('sup');
        // sup.appendChild(badge);
        listItem.appendChild(badge);
    }

    listContainer.appendChild(listItem);
}