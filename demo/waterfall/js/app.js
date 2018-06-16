window.onload = function () {
    // 1、实现瀑布流布局
    waterFall('main', 'box');

    // 2、动态加载图片
    window.onscroll = function () {
        if (checkWillLoadImage()){
            // 2.1、选数据
            var dataArr = [
                {"src" : "img01.jpg"},
                {"src" : "img15.jpg"},
                {"src" : "img14.jpg"},
                {"src" : "img16.jpg"},
                {"src" : "img37.jpg"},
                {"src" : "img18.jpg"},
                {"src" : "img19.jpg"},
                {"src" : "img20.jpg"},
                {"src" : "img21.jpg"},
                {"src" : "img22.jpg"},
                {"src" : "img23.jpg"},
                {"src" : "img24.jpg"},
                {"src" : "img25.jpg"},
                {"src" : "img26.jpg"},
                {"src" : "img27.jpg"},
                {"src" : "img28.jpg"},
                {"src" : "img29.jpg"},
                {"src" : "img30.jpg"},
                {"src" : "img31.jpg"},
                {"src" : "img32.jpg"},
                {"src" : "img33.jpg"},
                {"src" : "img34.jpg"},
                {"src" : "img35.jpg"},
                {"src" : "img36.jpg"},
            ];

            //2.2、创建元素
            for (var i = 0; i < dataArr.length; i++){
                var newBox = document.createElement('div');
                newBox.className = 'box';
                $('main').appendChild(newBox);

                var newPic = document.createElement('div');
                newPic.className = 'pic';
                newBox.appendChild(newPic);

                var newImg = document.createElement('img');
                newImg.src = 'images/' + dataArr[i].src;
                newPic.appendChild(newImg);
            }

            //2.3、重新布局
            waterFall('main', 'box');
        }
    };
};

/**
 * 实现瀑布流布局
 */
function waterFall(parent, child) {
    // 1、父盒子居中
    // 1.1、获取所有的盒子
    var allBox = $(parent).getElementsByClassName(child);
    // 1.2、获取子盒子的宽度
    var boxWidth = allBox[1].offsetWidth;
    // 1.3、获取内容区的宽度
    var screenWidth = document.documentElement.clientWidth;
    // 最大宽度不超过 1200 px
    if (screenWidth > 1200){
        screenWidth = 1200;
    }
    // 1.4、求出列数
    var cols = parseInt(screenWidth / boxWidth);
    // 1.5、父盒子宽度  && 居中
    $(parent).style.width = boxWidth * cols + 'px';
    $(parent).style.margin = '0 auto';

    // 2、 子盒子的定位
    // 2.1、 高度数组
    var heightArr = [], boxHeight = 0, minBoxHeight = 0, minBoxIndex = 0;
    // 2.2、遍历子盒子
    for (var i = 0; i < allBox.length; i++){
        // 2.3、 获取所有子盒子的高度
        boxHeight = allBox[i].offsetHeight;
        // 2.4、 取出第一行盒子的高度，放入数组
        if (i < cols){  // 第一行
            heightArr.push(boxHeight);
        }else{  // 剩余行
            // 2.5、取出最矮的盒子高度
            // minBoxHeight = Math.min.apply(this, heightArr);
            minBoxHeight = _.min(heightArr);
            // 2.6、求出最矮盒子对应的索引
            minBoxIndex = getMinBoxIndex(heightArr, minBoxHeight);
            // 3、子盒子定位
            allBox[i].style.position = 'absolute';
            allBox[i].style.left = minBoxIndex * boxWidth + 'px';
            allBox[i].style.top = minBoxHeight + 'px';
            // 4、最新数组中的高度
            heightArr[minBoxIndex] += boxHeight;
        }
    }

}

/**
 * 求图片数组的索引
 * @param arr           图片数组
 * @param val           图片高度
 * @returns {number}    索引
 */
function getMinBoxIndex(arr, val) {
    for (var i = 0; i < arr.length; i++){
        if (arr[i] === val){
            return i;
        }
    }
}

function $(id) {
    return typeof id === 'string' ? document.getElementById(id) : null;
}

/**
 * 检测图片加载的条件
 * 网页偏移高度 scrollTop + 内容区高度 screenHeight 必须大于 lastBixDis，才加载图片
 *
 * @returns {boolean}
 */
function checkWillLoadImage() {
    // 1、获取最后一个盒子
    var allBox = document.getElementsByClassName('box');
    var lastBox = allBox[allBox.length - 1];

    // 2、求出最后一个盒子自身高度的一半 + offsetTop
    var lastBixDis = lastBox.offsetHeight * 0.5 + lastBox.offsetTop;

    //3、求出屏幕的高度
    var screenHeight = document.body.clientHeight || document.documentElement.clientHeight;

    //4、求出页面偏移浏览器的高度
    var scrollTop = scroll().top;

    return lastBixDis <= screenHeight + scrollTop;
}