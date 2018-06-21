/**
 * 均速动画
 *
 * @param  {object} obj    [元素]
 * @param  {number} target [移动距离目标值]
 * @param  {number} speed  [速度]
 * @return {[type]}        []
 */
function constant (obj, target, speed) {
    // 1、清除定时器
    clearInterval(obj.timer);

    // 判断方向
    var dir = obj.offsetLeft < target ? speed : -speed;

    // 2、设置定时器
    obj.timer = setInterval(function () {
        obj.style.left = obj.offsetLeft + dir + 'px';

        if (Math.abs(target - obj.offsetLeft) < Math.abs(dir)) {
            clearInterval(obj.timer);

            // 解决偏差
            obj.style.left = target + 'px';
        }
    }, 20);
}

/**
 * 获取元素 ID
 * @param id
 *
 * @returns {*}
 */
function $(id) {
    return typeof id === 'string' ? document.getElementById(id) : null;
}


/**
 * 使用 json 封装 scrollTop 与 scrollLeft
 * 获取滚动的头部距离: scroll().top
 * 获取滚动的左边距离: scroll().left
 *
 * @return {*}
 */
function scroll(){
    if (window.pageYOffset !== null) {
        return {
            top : window.pageYOffset,
            left : window.pageXOffset,
        };
    }else if (document.compatMode === 'CSS1Compat') {   // W3C
        return {
            top : document.documentElement.scrollTop,
            left : document.documentElement.scrollLeft
        };
    }

    return {
        top : document.body.scrollTop,
        left : document.body.scrollLeft,
    };
}