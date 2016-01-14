define(function(require, exports){

    var appConfig = require('../config');

    var JsToOC = require('../utils/jsToOC');

    var lazyTimer = null;

    //获取当前页面范围
    function getClient () {

        var top = $('body').scrollTop();

        var bottom = $(window).height();

        return {
            'top': top,
            'bottom': top + bottom
        }

    }

    //返回元素顶部与底部
    function getItemOffset (item) {

        var thiz = $(item).offset();

        return {
            'top': thiz.top,
            'height': thiz.height,
            'bottom': thiz.top + thiz.height
        }

    }

    //加载图片
    function lazyPicInit () {

        var lazyPic = $('.lazy-pic:not(.loaded-pic)'),
            clientTop = getClient().top,
            clientBottom = getClient().bottom;

        if (lazyPic.length > 0){

            for (var i = 0;i < lazyPic.length;i ++){

                var thiz = $(lazyPic[i]),
                    itemTop = getItemOffset(lazyPic[i]).top,
                    itemHeight = getItemOffset(lazyPic[i]).height,
                    itemBottom = getItemOffset(lazyPic[i]).bottom;

                if (itemTop > clientTop && itemTop < clientBottom || itemBottom > clientTop && itemBottom < clientBottom){

                    thiz.attr('src', thiz.data('pic')).addClass('loaded-pic');

                }

            }

        }

    }

    //滚动后执行
    function pageScroll () {

        $(document).on('touchstart', function(){

            if (lazyTimer){

                clearTimeout(lazyTimer);

            }

        });

        $(document).on('touchend', function(){

            lazyTimer = setTimeout(function(){

                lazyPicInit();

            },0);

        });

}

    return {

        init: pageScroll,

        first: lazyPicInit

    }


});