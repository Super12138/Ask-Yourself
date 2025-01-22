
/**
 * 生成一个正则表达式，用于匹配包含给定关键字字符的任何字符串
 * 用于进行模糊搜索的关键字匹配
 *
 * @param keyword - 要生成正则表达式的关键字
 * @returns 一个不区分大小写的正则表达式，用于匹配包含关键字字符按顺序排列的任何字符串（模糊搜索）
 *
 * @example
 * ```typescript
 * const regex = generateRegex("abc");
 * console.log(regex); // 输出: /(.*)(a)(.*)(b)(.*)(c)(.*)/i
 * console.log(regex.test("a123b456c")); // 输出: true
 * console.log(regex.test("acb")); // 输出: false
 * ```
 */
export function generateRegex(keyword: string): RegExp {
    const regexStr = `(.*)(` + keyword.split('').join(')(.*)(') + `)(.*)`;
    return new RegExp(regexStr, 'i');
}

export function isURL(url: string): boolean {
    return url.startsWith("http://") || url.startsWith("https://");
}