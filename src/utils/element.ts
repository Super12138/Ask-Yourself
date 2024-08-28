/**
 * 用于控制元素的工具类
 */

/**
 * 显示一个元素
 * @param element 要显示的元素
 */
export function show(element: HTMLElement) {
    element.style.display = 'block';
}

/**
 * 隐藏一个元素
 * @param element 要隐藏的元素
 */
export function hide(element: HTMLElement) {
    element.style.display = 'none';
}