define(function(require, exports){

    var appConfig = require('../config');

    var JsToOC = require('../utils/jsToOC');

    var mvadTimer = null;

    var mvadLock = 0;

    var bdadLock = 0;

    //获取当前页面范围
    function getClient () {

        var top = $('body').scrollTop();

        var bottom = $(window).height();

        return {
            'top': top,
            'bottom': top + bottom
        }

    }

    //返回MVAD顶部与底部
    function getMvadOffset () {

        if ($('.mvad-list').size()){

            var mvad = $('.mvad-list').offset();

        }
        else if ($('.baidu-list').size()){

            var mvad = $('.baidu-list').offset();

        }

        

        return {
            'top': mvad.top,
            'height': mvad.height,
            'bottom': mvad.top + mvad.height
        }

    }

    //检查mvad
    function mvadCheck () {

        var clientTop = getClient().top,
            clientBottom = getClient().bottom;

        if ($('.mvad-list').size()){

            var mvadTop = getMvadOffset().top,
                mvadBottom = getMvadOffset().bottom;

            // if (mvadTop > clientTop && mvadTop < clientBottom || mvadBottom > clientTop && mvadBottom < clientBottom){
            if (mvadTop < clientBottom){

                console.log('send ' + mvadLock);

                var mvadArry = $('.mvad-list').find('.native-ad-link');

                if (mvadLock == 0){

                    for (var j = 0;j < mvadArry.length;j ++) {

                        JsToOC.send($(mvadArry[j]).data('render'));

                        console.log($(mvadArry[j]).data('render'));

                    }

                    mvadLock = 1;

                }

            }
        }
        else if ($('.baidu-list').size()){

            var mvadTop = getMvadOffset().top,
                mvadBottom = getMvadOffset().bottom;

            // if (mvadTop > clientTop && mvadTop < clientBottom || mvadBottom > clientTop && mvadBottom < clientBottom){
            if (mvadTop < clientBottom){

                console.log('send ' + mvadLock);

                var mvadArry = $('.baidu-list').find('.native-ad-link');

                if (bdadLock == 0){

                    for (var j = 0;j < mvadArry.length;j ++) {

                        JsToOC.send($(mvadArry[j]).data('render'));

                        console.log($(mvadArry[j]).data('render'));

                    }

                    bdadLock = 1;

                }

            }
        }

    }

    //滚动后执行
    function pageScroll () {

        $(document).on('touchstart', function(){

            if (mvadTimer){

                clearTimeout(mvadTimer);

            }

        });

        $(document).on('touchend', function(){

            mvadTimer = setTimeout(function(){

                mvadCheck();

            },0);

        });

}

    return {

        init: pageScroll,

        check: mvadCheck

    }


});