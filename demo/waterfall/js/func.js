/**
 * 使用 JSON 封闭 scrollTop 及 scrollLeft 属性
 * 求偏移高度：scroll().top
 * 求偏移宽度：scroll().left
 *
 * @returns {*}
 */
function scroll() {
    if (window.pageYOffset !== null){
        return {
            top : window.pageYOffset,
            left : window.pageXOffset
        };
    }else if (document.compatMode === 'CSS1Compat'){    // W3C
        return {
            top : document.documentElement.scrollTop,
            left : document.documentElement.scrollLeft
        };
    }

    return {
        top : document.body.scrollTop,
        left : document.body.scrollLeft
    };
}
