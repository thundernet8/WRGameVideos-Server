define(function (require, exports) {

    var appConfig = require('../config')
        , JsToOC = require('../utils/jsToOC')
        , OpenPage = require('../utils/openPage')
        , localStore = require('../utils/localStorage')
        , pageInfo = require('../utils/global')
        , lazyLoad = require('../utils/lazyLoad')
        , pageBannerGoogle = require('../utils/pageBannerGoogle')
        , linkActiveTimer = null
        , mvadCheck = require('../utils/mvadRenderCall')

    var $page = $('.pageView');

    var iScroll = require('../plugins/iscroll');

    require('../plugins/cookie');

    var appVersion = parseFloat($.cookie('xy_a_version'));

    var appDevice = pageInfo.appInfo.deviceInfo.deviceType;

    // var appDevice = 'iPad';

    var channelAliasArry = ['movie', 'tv', 'zongyi', 'dongman'];

    // var lazyTimer = null;
    var timeOutObj;

    var mvadLock = 0;

    var mvadRenderString = '';

    var bdadLock = 0;

    var bdadRenderString = '';

    // 原生广告配置
    var nativeCountSlider = 1;

    var nativeCountCate = 1;

    if (appDevice == 'iPad'){

        nativeCountCate = 2;
    }


    var nativeAdOptionArry = [];

    // 轮播
    var nativeOptionSlider_gdt = {
        "type": "gdt",
        "count": nativeCountSlider,
        "key": {
            "publisher": "1103603602",
            "placement": "9080607514176731"
        }
    }

    var nativeOptionSlider_mvad = {
        "type": "mvad",
        // count not supported
        "key": {
            "publisher": "FPuQu9krTq"
            // placement not required
        }
    }

    //百度
    var nativeOptionSlider_bdad = {
        "type": "baidu",
        "key": {
         "publisher": "c134ee15",
         "placement": "2072285"
        }
    }

    // 排行榜下方
    var nativeOptionCate_mvad = {
        "type": "mvad",
        // count not supported
        "key": {
            "publisher": "kPkGFJwTmM"
            // "publisher": "FPuQu9krTq"
            // placement not required
        }
    }

    var nativeOptionCate_gdt = {
        "type": "gdt",
        "count": nativeCountCate,
        "key": {
            "publisher": "1103603602",
            "placement": "7050801535516843"
        }
    }


    nativeAdOptionArry.push(nativeOptionSlider_gdt);

    // nativeAdOptionArry.push(nativeOptionSlider_bdad);

    nativeAdOptionArry.push(nativeOptionCate_gdt);

    


    console.log(JSON.stringify(nativeAdOptionArry));


    //appDidLoadNativeAd
    pageInfo.appDidLoadNativeAd = function (data, sIndex) {

        console.log('appDidLoadNativeAd');

        // console.log(JSON.parse(data));

        var adData = JSON.parse(data);

        for (var i = 0;i < adData.length;i ++){

            var adTitle = adData[i].title,
                adIndex = adData[i].index,
                adImg = adData[i].img,
                adIcon = adData[i].icon,
                adDesc = adData[i].desc,
                adType = adData[i].source,
                adTpl = '',
                adsliderstyle = '';

            if (sIndex == 1) {

                // 轮播只渲染第一个广告
                if (adIndex == 0) {

                    if (adType == 'gdt'){

                        JsToOC.send('nativeadrender?index=' + adIndex + '&source_index=' + sIndex);

                        console.log('slider-ad-gdt : nativeadrender?index=' + adIndex + '&source_index=' + sIndex);
                    
                    }
                    else if (adType == 'mvad'){

                        adsliderstyle = ' style="display:none;"';
                    }

                    else if (adType == 'baidu'){

                        adsliderstyle = ' style="display:none;"';
                    }

                    adTpl = '<a href="javascript:;" data-type="' + adType + '" data-href="nativeadclick?index=' + adIndex + '&source_index=' + sIndex + '" data-name="' + adTitle + '" data-index="' + adIndex + '" data-desc="' + adDesc + '" data-icon="' + adIcon + '" style="background-image: url(&quot;' + adImg + '&quot;);" class="slide native-ad ' + adType + '-slider"><div' + adsliderstyle + ' class="ad-notice"></div><span class="ad-icon">广告</span></a>';

                    
                    $('#scroller a:eq(1)').after(adTpl);

                    initSlider();

                    mvadRenderString = 'nativeadrender?index=' + adIndex + '&source_index=' + sIndex;

                    bdadRenderString = 'nativeadrender?index=' + adIndex + '&source_index=' + sIndex;
                }
            }

            else if (sIndex == 2 || sIndex == 3){

                if (adType == 'gdt'){

                    
                
                }
                else if (adType == 'mvad'){

                    adsliderstyle = ' style="display:none;"';
                }
                else if (adType == 'baidu'){

                    adsliderstyle = ' style="display:none;"';
                }

                adTpl = ['<div class="native-ad ' + adType + '-list"><a data-type="' + adType + '" data-render="nativeadrender?index=' + adIndex + '&source_index=' + sIndex + '" data-href="nativeadclick?index=' + adIndex + '&source_index=' + sIndex + '" class="native-ad-link">',
                            '<img src="' + adImg + '">',
                            // '<span class="close"></span>',
                            '<div class="title-con">',
                                '<span class="ad-icon">广告</span>',
                                '<span class="title">' + adTitle + '</span>',
                                '<span class="caption">' + adDesc + '</span>',
                            '</div>',
                            '<div' + adsliderstyle + ' class="ad-notice"></div>',
                        '</a>',
                        // '<span class="close"></span>',
                        '</div>'].join('');

                if (appDevice == 'iPad'){   //首先判断是否ipad

                    if (adData.length >= nativeCountCate && adIndex < nativeCountCate){  //若返回广告数小于2，则不输出

                        if (sIndex == 2) {

                            if ($('.native-ad-con-a').length == 0){

                                $('.chart-list').after('<div class="native-ad-con native-ad-con-a clearfix"></div>');

                            }

                            $('.native-ad-con-a').append(adTpl);        //a容器在上

                        }

                        else if (sIndex == 3) {

                            if ($('.native-ad-con-b').length == 0){

                                $('.zongyi:eq(0)').parents('.cate-list').after('<div class="native-ad-con native-ad-con-b clearfix"></div>');   //综艺后

                            }

                            $('.native-ad-con-b').append(adTpl);

                        } 

                        if (adType == 'gdt'){

                            //发送list-ad render回调
                            JsToOC.send('nativeadrender?index=' + adIndex + '&source_index=' + sIndex);

                            console.log('list-ad-gdt : nativeadrender?index=' + adIndex + '&source_index=' + sIndex);

                        }
                        else if (adType == 'mvad'){

                        }
                        else if (adType == 'baidu'){

                        }

                    }

                }
                else{

                    //取最后一个
                    // if (i == (adData.length - 1)){       

                    //取第一个
                    if (i == 0){

                        if (sIndex == 2) {

                            if ($('.native-ad-con-a').length == 0){

                                $('.chart-list').after('<div class="native-ad-con native-ad-con-a clearfix"></div>');

                            }

                            $('.native-ad-con-a').append(adTpl);        //a容器在上

                        }

                        else if (sIndex == 3) {

                            if ($('.native-ad-con-b').length == 0){

                                $('.zongyi:eq(0)').parents('.cate-list').after('<div class="native-ad-con native-ad-con-b clearfix"></div>');   //综艺后

                            }

                            $('.native-ad-con-b').append(adTpl);

                        } 

                        if (adType == 'gdt') {
                            
                            //发送list-ad render回调
                            JsToOC.send('nativeadrender?index=' + adIndex + '&source_index=' + sIndex);

                            console.log('list-ad-gdt : nativeadrender?index=' + adIndex + '&source_index=' + sIndex);

                        }
                        else if (adType == 'mvad'){

                        }
                        else if (adType == 'baidu'){

                        }

                    }

                }

                mvadCheck.check();

            }

        }
    }

    //get native ad
    function getNativeAd () {

        for (var i = 0; i < nativeAdOptionArry.length; i ++) {

            JsToOC.send('getnativead?o=' + encodeURIComponent(JSON.stringify(nativeAdOptionArry[i])) + '&source_index=' + String(i+1));

            console.log(JSON.stringify(nativeAdOptionArry[i]));

        }

    }


    //首页初始化
    function addIndexView () {

        //init slider
        initSlider();

        // cate list
        $('.cate-list').show();

        // $page.append('<a href="http://www.baidu.com" id="banner_test"></a>');

        $('.scroller').each(function() {

            var $el = $(this);
            var $items = $(this).find('a');

            var itemWidth = $items.first().width();

            if ($el.hasClass('chart-scroller')){

                $el.css('width', $items.length/5*itemWidth);

            }
            else{

                $el.css('width', $items.length*itemWidth);

            }
        });

        // lazyLoad.first();
    }


    //slider初始化
    function initSlider () {

        var $slider = $('#home-slider');

        var screenWidth = appConfig.screenWidth;

        var scale = pageInfo.appInfo.deviceInfo.deviceType == 'iPad' ? 0.375 : 0.444;

        var height = screenWidth * scale;

        $slider.css('height', height);

        var $scroller = $('#scroller');

        var $slides = $scroller.find('.slide');
        var number = $slides.size();

        // 固定每个轮播的宽度
        $slides.css({
            width: screenWidth
        });
        
        // 计算可滚动区域宽度
        $scroller.css({
            width: screenWidth * number
        });

        //保证indicator唯一
        if ($('#indicator').size() > 0){

            $('#indicator').remove();

        }

        // ad indicator
        var $indicators = $('<div id="indicator"><dic class="dot"><div class="inner"></div></div>').appendTo($slider).css({
            'width': number*20,
            'margin-left': -number*20/2
        });

        //slider点击事件
        $slides.off(appConfig.clickEvent).on(appConfig.clickEvent, function () {

            var $link = $(this);
            var thizId = $link.data('id');
            var thizName = $link.data('name');

            // ad banner
            if ($link.hasClass('ad')) {

                ga('send', 'event', 'Home Slider', 'click', 'AD_' + thizName + '_' + thizId);

               // 发送 wingmob 广告统计
                if (thizName.indexOf('wingmob') == 0) {

                    var idfa = $.cookie('xy_d_idfa');

                    var adid = 'Yxo';

                    var url = 'http://api.wingmob.com/s/c/' + adid + '?r=3&advid=' + idfa;

                    console.log(url)

                    $.ajax({
                        url: url,
                        dataType: 'jsonp'
                    });
                }

                // 发送 vxinyou 广告统计
                else if (thizName.indexOf('vxinyou') == 0) {

                    var idfa = $.cookie('xy_d_idfa'),
                        adid = '20243';

                    var url = 'https://adapi.vxinyou.com/auth/index/index/?adid=' + adid + '&idfa=' + idfa;

                    console.log(url)

                    $.ajax({
                        url: url,
                        dataType: 'jsonp'
                    });
                }
                
                return;
            }

            //专题
            else if ($link.hasClass('special')) {

                var preData = $link.data();

                var specialUrl;

                if (appConfig.isLocal) {
                    specialUrl = 'http://10.88.0.111/tonight/server-v3/static/client/src/html/special.html'
                }
                else {
                    specialUrl = appConfig.webDomain + '/video/special';
                }


                OpenPage({
                    url: specialUrl + '?special_id=' + preData.id + '&from=home',
                    t:  preData.name,
                    tbh: true,
                    ahl: false,
                    pdr: false,
                    pcf: true,
                    rb: {
                        t: '1',
                        v: 'share'
                    }
                    // pcf: true               //彩色进度条
                });

                ga('send', 'event', 'Home Slider', 'click', 'Special_' + preData.name + '_' + preData.id);

                return;

            }
            else if ($link.hasClass('native-ad')){

                var thizHref = $link.data('href'),
                    thizType = $link.data('type'),
                    thizCon = $link.parents('#home-slider'),
                    thizConLeft = thizCon.offset().left,
                    thizConTop = thizCon.offset().top,
                    thizWidth = $link.width(),
                    thizHeight = $link.height(),
                    thizCenterX = thizConLeft + thizWidth/2,
                    thizCenterY = thizConTop + thizHeight/2;

                if (thizType == 'mvad'){

                    thizHref = thizHref + '&x=' + thizCenterX + '&y=' + thizCenterY;

                }
                else if (thizType == 'baidu'){

                    thizHref = thizHref + '&x=' + thizCenterX + '&y=' + thizCenterY;

                }

                JsToOC.send(thizHref);

                console.log('slider-ad-' + thizType + ' : ' +thizHref);

                return;

            }

            var slideId = $link.data('id'),
                slideName = $link.data('name');

            var slideUrl;

            if (appConfig.isLocal) {
                slideUrl = 'http://10.88.0.111/tonight/server-v3/static/client/src/html/detail.html'
            }
            else {
                slideUrl = appConfig.webDomain + '/video/detail';
            }

            if (!isNaN(appVersion) && appVersion>=3.6){

                OpenPage({
                    url: slideUrl + '?video_id=' + slideId + '&video_name=' + slideName,

                    // title: video-name
                    t:  slideName,
                    
                    // 隐藏TabBar
                    tbh: true,

                    // 下拉刷新
                    pdr: false,

                    pcf: true,

                    rb: {
                        t: '1',
                        v: 'share'
                    }

                    // 展示banner
                    ,ban: {
                        i: 2,
                        p: 2
                    }

                    // 页面加载完不会自动隐藏菊花
                    // ahl: false
                });

            }else{

                OpenPage({
                    url: slideUrl + '?video_id=' + slideId + '&video_name=' + slideName,

                    // title: video-name
                    t:  slideName,
                    
                    // 隐藏TabBar
                    tbh: true,

                    // 下拉刷新
                    pdr: false,

                    pcf: true

                    //展示banner
                    ,ban: {
                        i: 2,
                        p: 2
                    }

                    // rb: {
                    //     t: '1',
                    //     v: 'share'
                    // }

                    // 页面加载完不会自动隐藏菊花
                    // ahl: false
                });

            }

            ga('send', 'event', 'Home Slider', 'click', 'Video Detail_' + slideName + '_' + slideId);
        });


        var slider = new iScroll('#home-slider', {
            scrollX: true,
            scrollY: false,
            momentum: true,
            snap: true,
            eventPassthrough: true,
            mouseWheel: true,
            mouseWheelSpeed: 1,
            deceleration: 0.05,
            indicators: {
                el: '#indicator',
                interactive: true,
                resize: false
            }
        });

        // 定时第一次自动切换
        setTimeOutToScroll();

        // user scroll: clear timeout
        slider.on('scrollStart', function () {

            clearTimeout(timeOutObj);
        });


        // scroll end: set time out
        slider.on('scrollEnd', function () {

            setTimeOutToScroll();

            if (mvadLock == 0){     //发送过就不在发送

                var currentSlider = $('#scroller a:eq(' + slider.currentPage.pageX + ')');

                if (currentSlider.data('type') == 'mvad'){

                    JsToOC.send(mvadRenderString);

                    mvadLock = 1;

                    console.log('render mvad');

                }

            }

            // if (bdadLock == 0){     //发送过就不在发送

            //     var currentSlider = $('#scroller a:eq(' + slider.currentPage.pageX + ')');

            //     if (currentSlider.data('type') == 'baidu'){

            //         JsToOC.send(bdadRenderString);

            //         bdadLock = 1;

            //         console.log('render baidu');

            //     }

            // }

            

        });


        function setTimeOutToScroll () {

            clearTimeout(timeOutObj);

            timeOutObj = setTimeout(function () {

                // 最后一个: 回到第一个
                if (slider.currentPage.pageX == number-1) slider.goToPage(0, 0, 500);

                // 切换到下一个
                else slider.next();

            }, 3000);
        }

    }


    $(function() {

        // 显示首页
        addIndexView();


        // $('.cate-list').not('.special-list').eq(2).after('<a id="home-banner" href="qisi-hd://open/window?o=%7B%22url%22%3A%22http%3A%2F%2Fum0.cn%2F4BjpgU%22%2C%22t%22%3A%22%E5%AE%85%E7%94%B7%E5%A6%82%E4%BD%95%E6%B4%97%E8%A1%A3%E6%9C%8D%22%2C%22asl%22%3A0%2C%22nbs%22%3A1%2C%22tc%22%3A%7B%22r%22%3A255%2C%22g%22%3A255%2C%22b%22%3A255%2C%22a%22%3A1%7D%2C%22cc%22%3A%7B%22r%22%3A255%2C%22g%22%3A255%2C%22b%22%3A255%2C%22a%22%3A1%7D%2C%22or%22%3A2%2C%22ar%22%3A0%2C%22ck%22%3A1%2C%22bs%22%3A1%2C%22tbh%22%3A1%7D"></a>')
        // $('#home-banner').css('height', appConfig.screenWidth*0.18)


        // pageScroll();
        lazyLoad.init();

        getNativeAd();

        mvadCheck.init();

        lazyLoad.first();



        //点击广告
        $page.on(appConfig.clickEvent, '.native-ad-link', function () {

            var $link = $(this),
                thizHref = $link.data('href'),
                thizType = $link.data('type'),
                thizCon = $link.parent(),
                thizConLeft = thizCon.offset().left,
                thizConTop = thizCon.offset().top,
                thizWidth = $link.width(),
                thizHeight = $link.height(),
                thizCenterX = thizConLeft + thizWidth/2,
                thizCenterY = thizConTop + thizHeight/2;

            if (thizType == 'mvad'){

                thizHref = thizHref + '&x=' + thizCenterX + '&y=' + thizCenterY;

            }

            console.log(thizHref);

            JsToOC.send(thizHref);            

        });

        //点击关闭
        $page.on(appConfig.clickEvent, '.native-ad .close', function (e) {

            $(this).parents('.native-ad').remove();

        });
        

        $page.on(appConfig.clickEvent, '.special-list a', function () {

            var $link = $(this);

            var specialData = $link.data();

            var specialUrl;

            if ($link.hasClass('banner-item')){

                var bannerType = specialData.bannertype,
                    bannerSource = specialData.bannersource,
                    bannerID = specialData.id;

                console.log(typeof(bannerType));

                if (bannerType == '0'){

                    if (appConfig.isLocal) {
                        specialUrl = 'http://10.88.0.110/hd-v3/server-v3/static/client/src/html/detail.html'
                    }
                    else {
                        specialUrl = appConfig.webDomain + '/video/detail';
                    }
                    
                    localStore.set(specialData);


                    OpenPage({
                        url: specialUrl + '?video_id=' + bannerSource + '&video_name=' + encodeURIComponent(specialData.name),

                        // title: video-name
                        t: specialData.name,
                        
                        // 隐藏TabBar
                        tbh: true,

                        // 下拉刷新
                        pdr: false,

                        pcf: true,

                        rb: {
                            t: '1',
                            v: 'share'
                        }

                        // 展示banner
                        ,ban: {
                            i: 2,
                            p: 2
                        }

                        // 页面加载完不会自动隐藏菊花
                        // ahl: false
                    });

                    ga('send', 'event', 'Home To Video Detail', 'click', decodeURIComponent(specialData.name) + '_' + bannerSource);

                }
                else if (bannerType == '1'){
                    
                    var name = $link.data('name');

                    console.log(name)

                    if (name.indexOf('wingmob') == 0) {

                        var idfa = $.cookie('xy_d_idfa');

                        var adid = 'TZa';

                        var url = 'http://api.wingmob.com/s/c/' + adid + '?r=3&advid=' + idfa;

                        console.log(url)

                        $.ajax({
                            url: url,
                            dataType: 'jsonp'
                        });
                    }

                    // 发送 vxinyou 广告统计
                    else if (name.indexOf('vxinyou') == 0) {

                        var idfa = $.cookie('xy_d_idfa'),
                            adid = '20243';

                        var url = 'https://adapi.vxinyou.com/auth/index/index/?adid=' + adid + '&idfa=' + idfa;

                        console.log(url)

                        $.ajax({
                            url: url,
                            dataType: 'jsonp'
                        });
                    
                    }
                    else{

                        ga('send', 'event', 'Home To Video Special', 'click', 'AD_' + specialData.name + '_' + specialData.id);

                        // return false

                    }
                }
                else if (bannerType == '2'){

                    if (appConfig.isLocal) {
                        specialUrl = 'http://10.88.0.110/hd-v3/server-v3/static/client/src/html/special.html'
                    }
                    else {
                        specialUrl = appConfig.webDomain + '/video/special';
                    }

                    OpenPage({
                        url: specialUrl + '?special_id=' + bannerSource + '&from=home',
                        t:  specialData.name,
                        tbh: true,
                        pdr: false,
                        ahl: false,
                        pcf: true,
                        rb: {
                            t: '1',
                            v: 'share'
                        }
                    });

                    ga('send', 'event', 'Home To Video Special', 'click', specialData.name + '_' + bannerSource);
                }
            }
            else{

                if (appConfig.isLocal) {
                    specialUrl = 'http://10.88.0.111/hd-v3/server-v3/static/client/src/html/special.html'
                }
                else {
                    specialUrl = appConfig.webDomain + '/video/special';
                }


                OpenPage({
                    url: specialUrl + '?special_id=' + specialData.id + '&from=home',
                    t:  specialData.name,
                    tbh: true,
                    pdr: false,
                    ahl: false,
                    pcf: true,
                    rb: {
                        t: '1',
                        v: 'share'
                    }
                });

                ga('send', 'event', 'Home To Video Special', 'click', specialData.name + '_' + specialData.id);

            }
        });



        // $('.video-item').attr('href', 'http://10.88.0.111/tonight/server/static/client/src/html/detail.html?video_id=1');


        // 查看视频详情
        $page.on(appConfig.clickEvent, '.video-item', function () {
     
            var url;

            if (appConfig.isLocal) {
                url = 'http://10.88.0.111/tonight/server-v3/static/client/src/html/detail.html'
            }
            else {
                url = appConfig.webDomain + '/video/detail';
            }

            var data = $(this).data();

            localStore.set(data);

            OpenPage({
                url: url + '?video_id=' + data.videoId + '&video_name=' + encodeURIComponent(data.name),

                // title: video-name
                t: data['name'],
                
                // 隐藏TabBar
                tbh: true,

                pcf: true,

                rb: {
                    t: '1',
                    v: 'share'
                }

                //展示banner
                ,ban: {
                    i: 2,
                    p: 2
                }

                // 页面加载完不会自动隐藏菊花
                // ahl: false
            });


            if ($(this).parents('.cate-list').hasClass('chart-list')){

                ga('send', 'event', 'Home Chart To Video Detail', 'click', decodeURIComponent(data.name) + '_' + data.videoId);

            }
            else{

                ga('send', 'event', 'Home To Video Detail', 'click', decodeURIComponent(data.name) + '_' + data.videoId);
            }   
        });

        // 查看分类列表
        $page.on(appConfig.clickEvent, '.cate-head', function () {

            var $link = $(this);

            var cateTitle = $link.find('.cate-title').text();

            var cateAlias = $link.data('target');

            var cateFilter = $link.data('filter');

            var url;

            if ($link.find('.more').length > 0){

                if ($link.hasClass('channel-list')){

                    var isMore = $link.find('.more').data('ismore');

                    if (isMore == '1'){

                        if (appConfig.isLocal) {

                            url = 'http://10.88.0.110/tonight-v3/server-v3/static/client/src/html/channellist.html';
                        
                        }
                        else {

                            url = appConfig.webDomain + '/channel/list';

                        }

                        OpenPage({
                            url: url + '?cate_id=' + cateAlias + '&from=channelindex&cate_alias=' + cateTitle,
                            t:  cateTitle,
                            tbh: true,
                            pdr: false,
                            asl: false,
                            rb: {
                                t: '3',
                                v: '更多'
                            },
                            ck: 1
                        });

                    }else{

                        if (appConfig.isLocal) {

                            url = 'http://10.88.0.110/tonight-v3/server-v3/static/client/src/html/channellist.html';
                        
                        }
                        else {

                            url = appConfig.webDomain + '/channel/list';

                        }

                        OpenPage({
                            url: url + '?cate_id=' + cateAlias + '&from=channelindex&cate_alias=' + cateTitle,
                            t:  cateTitle,
                            tbh: true,
                            asl: false,
                            // rb: {
                            //     t: '3',
                            //     v: '更多'
                            // },
                            ck: 1
                        });
                        
                    }

                   ga('send', 'event', 'Home To List', 'click', 'Channel_' + cateTitle + '_' + cateAlias);

                }else{

                    if ($link.find('.chart').length > 0){

                        if (appConfig.isLocal) {
                            url = 'http://10.88.0.110/hd-v3/server-v3/static/client/src/html/rank.html';
                        }
                        else {
                            url = appConfig.webDomain + '/video/rank';
                        }

                        if (!isNaN(appVersion) && appVersion>=3.2){

                            OpenPage({
                                url: url,
                                t:  cateTitle,
                                tbh: true,
                                pdr: false,
                                ahl: false,
                                bce:false,
                                pc: {
                                    r: 255,
                                    g: 255,
                                    b: 255,
                                    a: 0.2
                                }
                            });

                        }
                        else{

                            OpenPage({
                                url: url,
                                t:  cateTitle,
                                tbh: true,
                                pdr: false,
                                // ahl: false,
                                pc: {
                                    r: 255,
                                    g: 255,
                                    b: 255,
                                    a: 0.2
                                }
                            });

                        }

                        ga('send', 'event', 'Home To List', 'click', 'Chart_' + cateTitle + '_' + cateAlias);

                    }else{

                        if (appConfig.isLocal) {

                            url = 'http://10.88.0.110/tonight-v3/server-v3/static/client/src/html/list.html';
                        
                        }
                        else {

                            url = appConfig.webDomain + '/video/list';
                        
                        }

                        OpenPage({
                            url: url + '?cate_alias=' + cateAlias + '&from=home&filter=' + cateFilter,
                            t:  cateTitle,
                            tbh: true,
                            pdr: false,
                            ahl: false,
                            rb: {
                                t: '1',
                                v: 'panel'
                            },
                            ck: 1
                        });

                        ga('send', 'event', 'Home To Video List', 'click', cateAlias);

                    }

                }
                
            }

        });

        $(document).on('touchstart', '.video-item', function(){

            linkActiveTimer = setTimeout(function(){

                $('.pageView').addClass('touch-visible');

            },300);
            
        });

        $(document).on('touchmove', '.video-item', function(){

            $('.pageView').removeClass('touch-visible');

            if (linkActiveTimer){

                clearTimeout(linkActiveTimer);

            }

            console.log(linkActiveTimer);
            
        });

        $(document).on('touchend', '.video-item', function(){

            $('.pageView').removeClass('touch-visible');

            if (linkActiveTimer){

                clearTimeout(linkActiveTimer);

            }

            console.log(linkActiveTimer);
            
        });

        ga('send', 'pageview', {
            'page': '/v3/index',
            'title': appConfig.appUAPrefix
        });

    });


});