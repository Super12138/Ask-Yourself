import { confirm } from 'mdui/functions/confirm.js';
import { dialog } from 'mdui/functions/dialog.js';
import { snackbar } from 'mdui/functions/snackbar.js';
import { clearStorage, getStorageItem, setStorageItem } from './localstorage';

/**
 * 展示键盘操作提示
 */
export function showKeyboardNotice() {
    if (getStorageItem("keyboardNotice") !== "true") {
        snackbar({
            message: "你也可以使用键盘的 “←” “→” 键来进行题目的切换",
            // action: "知道了",
            // onActionClick: () => true,
            onClosed: () => setStorageItem("keyboardNotice", true),
        });
    }
}

/**
 * 弹出清除全部数据确认对话框
 */
export function showClearAllDataDialog() {
    confirm({
        headline: "清除全部数据",
        description: "是否清除本网站全部相关数据？",
        closeOnEsc: false,
        closeOnOverlayClick: false,
        confirmText: "确定",
        cancelText: "取消",
        onConfirm: () => {
            clearStorage();
            window.location.reload();
            return true;
        },
        onCancel: () => true
    });
}

/**
 * 展示使用提示对话框
 */
export function showDisclaimerDialog() {
    if (getStorageItem('disclaimer') !== 'true') {
        const body: HTMLDivElement = document.createElement('div');

        const p1: HTMLParagraphElement = document.createElement('p');
        const s1: HTMLElement = document.createElement('strong');
        s1.textContent = "本网站为公益网站，仅收集互联网上的信息并整理，不对网站内任何量表具有版权。如侵权请联系我，我会及时删除。";
        p1.appendChild(s1);

        const p2: HTMLParagraphElement = document.createElement('p');
        const s2: HTMLElement = document.createElement('strong');
        s2.textContent = "本网站会尽最大限度保护您的答题数据和结果的安全。请不要随意将结果分享给他人。";
        p2.appendChild(s2);

        const p3: HTMLParagraphElement = document.createElement('p');
        const s3: HTMLElement = document.createElement('strong');
        s3.textContent = "所有量表的测量结果仅供参考，不作为任何医学诊断的依据。";
        p3.appendChild(s3);

        body.appendChild(p1);
        body.appendChild(p2);
        body.appendChild(p3);
        dialog({
            headline: "使用提示",
            description: "请务必仔细阅读下方内容 Please read the following content carefully",
            body: body,
            closeOnEsc: false,
            closeOnOverlayClick: false,
            actions: [
                {
                    text: "知道了",
                    onClick: () => {
                        setStorageItem('disclaimer', true);
                        return true;
                    },
                }
            ]
        });
    }
}