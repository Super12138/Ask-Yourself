import type { RadioGroup } from 'mdui/components/radio-group.js';
import { OptionItem } from "../interfaces";
import { Option } from './option';

export class Question {
    groupId: number;
    html: HTMLDivElement;
    /**
     * 题目
     * @param id 题目id
     * @param groupId 题目组id
     * @param options 题目选项
     * @param content 题目内容
     */
    constructor(id: number, groupId: number, options: OptionItem[], content: string, reverse: boolean = false) {
        const div: HTMLDivElement = document.createElement('div');
        const radioGroup: RadioGroup = document.createElement('mdui-radio-group');
        let currentScoreList = options.map(option => option.score);

        // 反转选项分值（改动原列表）
        if (reverse) {
            currentScoreList.reverse();
        }

        radioGroup.name = groupId.toString();
        radioGroup.id = `questions-${id}`;

        const questionContent: HTMLParagraphElement = document.createElement('p');
        // questionContent.textContent = `${id}. ${content}`;
        questionContent.textContent = content;

        options.forEach((option: OptionItem, index: number) => {
            const radio: Option = new Option(option.name, currentScoreList[index]);
            radioGroup.appendChild(radio.html);
        });
        // 测试用 生成随机数（0-3）
        // const randomNumber = Math.floor(Math.random() * 5);
        // radioGroup.value = randomNumber.toString();

        div.appendChild(questionContent);
        div.appendChild(radioGroup);

        this.html = div;
        this.groupId = groupId;
    }
}