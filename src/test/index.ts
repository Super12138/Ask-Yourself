import 'mdui/components/button.js';
import 'mdui/components/circular-progress.js';
import 'mdui/components/linear-progress.js';
import 'mdui/components/radio-group.js';
import 'mdui/components/radio.js';

import type { ButtonIcon } from 'mdui/components/button-icon.js';
import type { Button } from 'mdui/components/button.js';
import type { LinearProgress } from 'mdui/components/linear-progress.js';
import type { TopAppBarTitle } from 'mdui/components/top-app-bar-title.js';

import '@mdui/icons/arrow-back--outlined.js';
import '@mdui/icons/arrow-forward--outlined.js';
import '@mdui/icons/check--outlined.js';

import { RadioGroup } from 'mdui/components/radio-group.js';
import { ButtonType, Criterion, GroupedData, QuestionnaireFile, QuestionResult, Ranges, ScoreResult, Scoring } from '../interfaces';
import { hide, show } from '../utils/element';
import { showKeyboardNotice } from '../utils/notices';
import { Question } from './question';
import { getScore, SCL90Score } from './scoring';
import { LogHelper } from '../utils/LogHelper';
import { getFile } from '../utils/network';

const appTitle: TopAppBarTitle = document.querySelector('#appTitle')!;
const url: URL = new URL(window.location.href);
const questionnaire: string | null = url.searchParams.get("name");
const backBtn: ButtonIcon = document.querySelector('#backBtn')!;
const logHelper = LogHelper.getInstance();

let nextButtonType: number = 1; // 1: 下一题 | 2: 开始 | 3: 提交
let currentQuestion: number = 0;

let questions = [];

const buttonType: ButtonType[] = [
    {
        name: '上一题',
        icon: 'arrow-back--outlined'
    },
    {
        name: '下一题',
        icon: 'arrow-forward--outlined'
    },
    {
        name: '开始',
        icon: 'arrow-forward--outlined'
    },
    {
        name: '提交',
        icon: 'check--outlined'
    }
];

document.addEventListener('testPageLoaded', async () => {
    const container: HTMLDivElement = document.querySelector('#testContainer')!;
    const nullTip: HTMLParagraphElement = document.querySelector('#nullTip')!;
    const loadingTip: HTMLDivElement = document.querySelector('#loadingTip')!;
    const referencesElement: HTMLDivElement = document.querySelector('#references')!;
    const previousBtn: Button = document.querySelector('.prev-btn')!;
    const nextBtn: Button = document.querySelector('.next-btn')!;
    const progressBar: LinearProgress = document.querySelector('.progress-bar')!;
    const progressText: HTMLSpanElement = document.querySelector('#progressText')!;

    const testArea: HTMLDivElement = document.querySelector('#testArea')!;
    const controlArea: HTMLDivElement = document.querySelector('#controlArea')!;
    const introPart: HTMLDivElement = document.querySelector('#introPart')!;
    const resultArea: HTMLDivElement = document.querySelector('#resultArea')!;

    // 将“下一题”按钮设置为“开始”
    setUpNextButton(nextBtn, 2);

    // 获取量表json
    getFile(`https://cdn.jsdelivr.net/gh/Super12138/AY-Questionnaires-DB/questionnaires/${questionnaire}.json?${new Date().getTime()}`)
        .then((response: string) => {
            // 加载完了显示答题页面，隐藏加载提示
            show(container);
            hide(loadingTip);
            const json: QuestionnaireFile = JSON.parse(response); // 解析量表json
            const jsonName: string = json.name;
            appTitle.textContent = jsonName; // 将标题设置为问卷名称

            document.title = `${jsonName} - 问心`;

            const questionnaireTotal: number = json.questions.length; // 量表试题总数
            progressBar.max = questionnaireTotal; // 将进度条最大值设置为量表试题总数

            let generatedId: number = 0;
            for (const question of json.questions) {
                generatedId += 1; // 遍历题目并添加到question数组
                const questionItem: Question = new Question(generatedId, question.groupId, json.options, question.content);
                testArea.appendChild(questionItem.html); // 题目上屏
                hide(questionItem.html); // 在还没有点击开始按钮前先把题目隐藏起来
                questions.push(questionItem);
            }

            document.querySelector<HTMLParagraphElement>('#questionnaireDescription')!.textContent = json.description; // 将问卷描述设置为问卷描述
            document.querySelector<HTMLElement>('#questionnaireTips')!.textContent = json.answerTips; // 将提示设置为问卷提示
            for (const links of json.references) { // 将引用内容上屏
                const a: HTMLAnchorElement = document.createElement('a');
                const br: HTMLBRElement = document.createElement('br');
                a.target = '_blank'; // 在新页面打开链接
                a.href = links;
                a.textContent = links;
                referencesElement.appendChild(a);
                referencesElement.appendChild(br);
            }

            /**
             * 更新进度条和进度提示文本
             * @return {void}
             */
            const updateProgress = () => {
                progressBar.value = currentQuestion + 1;
                progressText.textContent = `${currentQuestion + 1}/${questionnaireTotal}`;
            };

            function checkQuestionChecked(id: number) {
                const radioGroup: RadioGroup = document.querySelector(`#questions-${id}`)!;
                if (radioGroup.value) {
                    nextBtn.disabled = false;
                } else {
                    nextBtn.disabled = true;
                    const radioChangeListener = () => {
                        nextBtn.disabled = false;
                        radioGroup.removeEventListener('change', radioChangeListener);
                    };
                    radioGroup.addEventListener('change', radioChangeListener);
                }
            }


            nextBtn.addEventListener('click', () => {
                switch (nextButtonType) {
                    case 1: // “下一题”按钮
                        currentQuestion += 1;
                        logHelper.log(currentQuestion);
                        show(questions[currentQuestion].html);
                        hide(questions[currentQuestion - 1].html);
                        if (currentQuestion === questionnaireTotal - 1) {
                            setUpNextButton(nextBtn, 3);
                        }
                        checkQuestionChecked(currentQuestion + 1);
                        break;

                    case 2: // “开始”按钮
                        currentQuestion = 0;
                        setUpNextButton(nextBtn, 1);
                        hide(introPart);
                        show(testArea);
                        show(previousBtn);
                        show(questions[currentQuestion].html);
                        checkQuestionChecked(currentQuestion + 1); // 检查是否有一个选项被选中
                        showKeyboardNotice(); // 键盘操作提示
                        backBtn.disabled = true;

                        document.title = `答题中 - ${jsonName} - 问心`;
                        break;

                    case 3: // “提交”按钮
                        currentQuestion = 0;
                        nextButtonType = 2;
                        hide(testArea);
                        hide(controlArea);
                        nextBtn.disabled = true;

                        let questionsResult: QuestionResult[] = [];
                        // 获取页面上所有的题目
                        const groupRadio: NodeListOf<RadioGroup> = document.querySelectorAll('mdui-radio-group')!;
                        // 遍历每个题目
                        groupRadio.forEach((group: RadioGroup) => {
                            // 将每个题目的组id和用户分数存入数组
                            questionsResult.push({ name: group.name, value: group.value });
                        });
                        // 对题目按照groupId进行分组
                        const groupedQuestions: GroupedData = questionsResult.reduce((acc: GroupedData, current: QuestionResult) => {
                            const name: string = current.name;
                            if (!acc[name]) {
                                acc[name] = [];
                            }
                            acc[name].push(current.value); // 将用户分数存入数组
                            return acc;
                        }, {});


                        // 获取评分组
                        const scoring: Scoring = json.scoring;
                        // 获取评分标准
                        const criteria: Criterion[] = scoring.criteria;
                        // 获取分值范围
                        const ranges: Ranges[] = scoring.ranges;

                        // 获取每个评分标准，并按照groupId对其分组
                        const groupedCriteria: GroupedData = criteria.reduce((acc: GroupedData, current: Criterion) => {
                            const name: number = current.groupId;
                            if (!acc[name]) {
                                acc[name] = [];
                            }
                            acc[name].push(current.method);
                            return acc;
                        }, {});

                        const resultTbody: HTMLTableSectionElement = document.querySelector('#resultTbody')!;

                        if (questionnaire === 'scl90' || questionnaire === 'scl90-eng') {
                            SCL90Score(groupRadio).forEach((item) => {
                                const itemContainer: HTMLTableRowElement = document.createElement('tr');
                                // 项目名称
                                const itemName: HTMLTableCellElement = document.createElement('td');
                                // 得分
                                const itemScore: HTMLTableCellElement = document.createElement('td');
                                itemName.textContent = item.name;
                                itemScore.colSpan = 2;
                                itemScore.textContent = item.result.toString();
                                itemContainer.appendChild(itemName);
                                itemContainer.appendChild(itemScore);
                                resultTbody.appendChild(itemContainer);
                            });
                        }

                        // 将分组后的题目和分组后的评分标准匹配起来，并计算得分
                        const score: ScoreResult[] = getScore(groupedQuestions, groupedCriteria, ranges);
                        // 将得分上屏
                        score.forEach((item: ScoreResult) => {
                            const itemContainer: HTMLTableRowElement = document.createElement('tr');
                            // 项目名称
                            const itemName: HTMLTableCellElement = document.createElement('td');
                            // 得分
                            const itemScore: HTMLTableCellElement = document.createElement('td');
                            // 评价
                            const itemComment: HTMLTableCellElement = document.createElement('td');
                            itemName.textContent = item.name;
                            itemScore.textContent = item.result.toString();
                            itemComment.textContent = item.range;
                            itemComment.classList.add(item.color); // 设置文字颜色

                            itemContainer.appendChild(itemName);
                            itemContainer.appendChild(itemScore);
                            itemContainer.appendChild(itemComment);
                            resultTbody.appendChild(itemContainer);
                        });

                        if (json.resultTips !== undefined) {
                            document.querySelector<HTMLElement>('.result-tips')!.innerHTML = `结果解读说明（仅供参考，不作为诊断依据）<br>${json.resultTips}`;
                        }
                        // 展示结果区域
                        show(resultArea);
                        document.title = `测试结果 - ${jsonName} - 问心`;
                        backBtn.disabled = false;
                        break;

                    default:
                        currentQuestion = 0;
                        break;
                }

                previousBtn.disabled = currentQuestion === 0;
                updateProgress();
            });

            previousBtn.addEventListener('click', () => {
                if (currentQuestion > 0) {
                    currentQuestion -= 1;
                    show(questions[currentQuestion].html);
                    hide(questions[currentQuestion + 1].html);
                    logHelper.log(currentQuestion);
                    setUpNextButton(nextBtn, 1);
                    previousBtn.disabled = currentQuestion === 0;
                    updateProgress();
                    checkQuestionChecked(currentQuestion + 1);
                }
            });

            // 监听键盘左右键切换题目
            window.addEventListener('keydown', (event: KeyboardEvent) => {
                switch (event.key) {
                    case 'ArrowLeft':
                        if (currentQuestion > 0) {
                            previousBtn.click();
                        }
                        break;

                    case 'ArrowRight':
                        if (currentQuestion < questionnaireTotal && nextButtonType === 1) {
                            nextBtn.click();
                        }
                        break;

                    default:
                        break;
                }
            });

        })
        .catch((error: any) => {
            if (questionnaire === null) {
                hide(container);
                show(nullTip);
                return;
            } else {
                hide(container);
                nullTip.innerHTML = `错误：<code>${error}</code>`;
                show(nullTip);
                return;
            }
        });
});

/**
 * 更新“下一题”按钮的内容
 * @param nextBtn “下一题”按钮
 * @param type 1: “开始”按钮 | 2: “下一题”按钮 | 3: “提交”按钮
 */
function setUpNextButton(nextBtn: Button, type: number) {
    for (let i = 0; i < buttonType.length; i++) {
        if (buttonType[i].name === buttonType[type].name) {
            nextBtn.innerHTML = `${buttonType[i].name}<mdui-icon-${buttonType[i].icon} slot="end-icon"></mdui-icon-${buttonType[i].icon}>`;
            break;
        }
    }
    nextButtonType = type;
}