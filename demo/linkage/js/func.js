    /**
     * 缓动运动封装
     *
     * @param obj           元素
     * @param target        偏移点
     */
    function buffer(obj, json, fn) {
        // 1.1、定时器的原则：先清除，后使用
        clearInterval(obj.timer);

        var speed = 0;  // 运动步长
        var begin = 0;  // 偏移量初始值
        var target = 0; // 偏移目标

        // 1.2、设置定时器
        obj.timer = setInterval(function () {
            var flag = true;    // 清除定时器的标识

            for (var key in json){
                // 1.3、获取初始值
                if ('opacity' === key){     // 透明度
                    begin = Math.round(parseFloat(getCssAttrValue(obj, key)) * 100) || 100;
                    target = parseInt(json[key] * 100);
                } else {    // 其它情况
                    begin = parseInt(getCssAttrValue(obj, key)) || 0;
                    target = parseInt(json[key]);
                }

                // 1.4、求出步长
                speed = (target - begin) * 0.2;

                // 1.5、判断 speed 向上取整还是向下取整
                speed = (target > begin) ? Math.ceil(speed) : Math.floor(speed);

                // 1.6、作用于元素，让其运动起来
                if ("opacity" === key){
                    // W3C 浏览器
                    obj.style.opacity = (begin + speed) / 100;
                    // IE 浏览器
                    obj.style.filter = 'alpha(opacity:' + (begin + speed) + ')';
                } else {
                    obj.style[key] = begin + speed + 'px';
                }

                // 1.7、边界检测 && 清除定时器
                if (begin !== target){
                    flag = false;
                }
            }

            // 1.8、清除定时器
            if (flag){
                clearInterval(obj.timer);

                // 判断有没有回调函数
                if (fn){
                    fn();
                }
            }
        }, 20);
    }


    /**
     * 获取 CSS 属性值兼容性写法
     *
     * @param {Object} 元素
     * @param {string} 属性
     */
    function getCssAttrValue(obj, attr){
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        } else {
            return window.getComputedStyle(obj, null)[attr];
        }
    }


    function $(id) {
        return typeof id === 'string' ? document.getElementById(id) : null;
    }