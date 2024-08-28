import type { Button } from 'mdui/components/button.js';
import type { Radio } from 'mdui/components/radio.js';

export class Option {
    html: Radio;
    score: number;
    /**
     * 选项
     * @param name 选项名称
     * @param score 选项分数
     */
    constructor(name: string, score: number) {
        /**
         * 构建单选按钮元素
         */
        const radio: Radio = document.createElement('mdui-radio');
        const nextBtn: Button = document.querySelector('.next-btn')!;

        radio.textContent = name;
        /**
         * 将分数设置为value
         */
        radio.value = score.toString();
        radio.addEventListener('click', () => {
            setTimeout(() => {
                nextBtn.click();
            }, 280)
        })
        /**
         * 返回单选按钮
         */
        this.html = radio;
        this.score = score;
    }
}