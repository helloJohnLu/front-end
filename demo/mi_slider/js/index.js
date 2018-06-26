window.onload = function () {
    // 1、获取需要的标签
    var slider = $('slider');
    var slider_main = $('slider_main');
    var slider_main_img = $('slider_main').children;
    var slider_ctl = $('slider_ctl');

    // 图片索引
    var index = 0;

    // 2、动态创建指示器
    for (var i = 0; i < slider_main_img.length; i++){
        var span = document.createElement('span');

        span.className = 'slider-ctl-icon';
        span.innerText = i;
        slider_ctl.appendChild(span);
    }

    // 3、让第一个指示器处于选中状态
    document.getElementsByClassName('slider-ctl-icon')[0].className = 'slider-ctl-icon current';

    // 4、让待滚动的内容偏移到 .slider 右边
    var scroll_w = slider.offsetWidth;
    for (var j = 1; j < slider_main_img.length; j++){
        slider_main_img[j].style.left = scroll_w + 'px';
    }

    // 5、遍历监听操作
    var slider_ctl_child = slider_ctl.children;
    for (var i = 0; i < slider_ctl_child.length; i++){
        // 5.1、 监听点击 
        slider_ctl_child[i].onmousedown = function () {
            // 5.2、判断
            if (this.className === 'slider-ctl-prev'){
                /**
                 * 思路：
                 * 1、当前可视区域的图片快速右移
                 * 2、上一张图片快速出现在可视区域的左边
                 * 3、让这张图片做动画进入
                 */

                // 让当前可视区域图片右移
                buffer(slider_main_img[index], {'left' : scroll_w});
                index--;
                if (index < 0){
                    index = slider_main_img.length - 1;
                }
                // 让下一张图片快速出现在可视区域的右边
                slider_main_img[index].style.left = -scroll_w + 'px';
                // 让出现在右边的图片进入可视区
                buffer(slider_main_img[index], {'left' : 0});
            } else if (this.className === 'slider-ctl-next'){
                /**
                 * 思路：
                 * 1、当前可视区域的图片快速右移
                 * 2、上一张图片快速出现在可视区域的左边
                 * 3、让这张图片做动画进入
                 */

                // 让当前可视区域图片快速左移
                buffer(slider_main_img[index], {'left' : -scroll_w});
                index++;
                if (index > slider_main_img.length - 1){
                    index = 0;
                }
                // 让下一张图片快速出现在可视区域的左边
                slider_main_img[index].style.left = scroll_w + 'px';
                // 让出现在左边的图片进入可视区
                buffer(slider_main_img[index], {'left' : 0});
            }else{
                /**
                 * 监听指示器的点击
                 * 1、用当前点击的索引和选中索引对比
                 * 2、点击的 > 选中的，相当于点击了右边的索引
                 * 3、点击的 < 选中的，相当于点击了左边的索引
                 */

                // 获取指示器索引
                var indicator = parseInt(this.innerText);
                // 对比
                if (indicator > index){
                    // 让当前可视区域图片快速左移
                    buffer(slider_main_img[index], {'left' : -scroll_w});
                    // 让下一张图片快速出现在可视区域的左边
                    slider_main_img[indicator].style.left = scroll_w + 'px';
                } else if (indicator < index){
                    // 让当前可视区域图片右移
                    buffer(slider_main_img[index], {'left' : scroll_w});
                    // 让下一张图片快速出现在可视区域的右边
                    slider_main_img[indicator].style.left = -scroll_w + 'px';
                }
                // 让图片的 index  等于 指示器的 index
                index = indicator;
                // 让出现在左边的图片进入可视区
                buffer(slider_main_img[index], {'left' : 0});
            }
            changeIndicator();
        }
    }

    // 6、切换索引
    function changeIndicator() {
        for (var i = 2; i < slider_ctl_child.length; i++){
            slider_ctl_child[i].className = 'slider-ctl-icon';
        }
        slider_ctl_child[index + 2].className = 'slider-ctl-icon current';
    }

    // 7、自动播放
    var timer = setInterval(autoPlay, 2000);
    // 封装自动播放函数
    function autoPlay() {
        /**
         * 思路：
         * 1、当前可视区域的图片快速右移
         * 2、上一张图片快速出现在可视区域的左边
         * 3、让这张图片做动画进入
         */

        // 让当前可视区域图片快速左移
        buffer(slider_main_img[index], {'left' : -scroll_w});
        index++;
        if (index > slider_main_img.length - 1){
            index = 0;
        }
        // 让下一张图片快速出现在可视区域的左边
        slider_main_img[index].style.left = scroll_w + 'px';
        // 让出现在左边的图片进入可视区
        buffer(slider_main_img[index], {'left' : 0});

        // 调用索引
        changeIndicator();
    }

    // 8、设置及清除定时器
    slider.onmouseover = function () {
        clearInterval(timer);
    }

    slider.onmouseout = function () {
        timer = setInterval(autoPlay, 2000);
    }
};