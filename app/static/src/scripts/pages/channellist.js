define(function (require, exports) {

var appConfig = require('../config')
    , jsToOC = require('../utils/jsToOC')
    , OpenPage = require('../utils/openPage')
    , localStore = require('../utils/localStorage')
    , pageInfo = require('../utils/global')
    , lazyLoad = require('../utils/lazyLoad')
    , getUrlParam = require('../utils/getUrlParam')

var $page = $('.pageView');

require('../plugins/cookie');

var appVersion = parseFloat($.cookie('xy_a_version'));

var appDevice = pageInfo.appInfo.deviceInfo.deviceType;

// var appDevice = 'iPad';

var nativeCount = 1;

if (appDevice == 'iPad'){

    nativeCount = 2;

}

var nativeAdOption = {
            "type": "gdt",
            "count": nativeCount,
            "key": {
                "publisher": "1103603602",
                "placement": "4040102546412350"
            }
        };

    //appDidLoadNativeAd
    pageInfo.appDidLoadNativeAd = function (data) {

        console.log('appDidLoadNativeAd');

        // console.log(JSON.parse(data));

        var adData = JSON.parse(data);

        // if (appDevice == 'iPad' && adData.length == nativeCount){

        //     $('.cate-list:eq(1)').after('<div class="native-ad-con clearfix"></div>');

        // }

        if (adData.length == nativeCount){

            $('.cate-list:eq(1)').after('<div class="native-ad-con clearfix"></div>');

        }

        for (var i = 0;i < adData.length;i ++){

            var adTitle = adData[i].title,
                adIndex = adData[i].index,
                adImg = adData[i].img,
                adIcon = adData[i].icon,
                adDesc = adData[i].desc,
                // adTpl = ['<div class="channel-ad-part">',
                //             '<div class="ad-title">推广<a class="close" href="javascript:;"></a></div>',
                //             '<div class="native-ad">',
                //                 '<div style="background-image: url(' + adIcon + ')" class="icon clearfix">',
                //                     '<span class="title">' + adTitle + '</span>',
                //                     '<span class="desc">' + adDesc + '</span>',
                //                     '<a href="javascript:;" data-href="nativeadclick?index=' + adIndex + '" class="download">下载</a>',
                //                 '</div>',
                //                 '<img src="' + adImg + '">',
                //             '</div>',
                //         '</div>'].join('');
                adTpl = ['<div class="native-ad"><a data-href="nativeadclick?index=' + adIndex + '" class="native-ad-link">',
                            '<img src="' + adImg + '">',
                            // '<span class="close"></span>',
                            '<div class="title-con">',
                                '<span class="ad-icon">推广</span>',
                                '<span class="title">' + adTitle + '</span>',
                                '<span class="caption">' + adDesc + '</span>',
                            '</div>',
                            '<div class="ad-notice"></div>',
                        '</a>',
                        // '<span class="close"></span>',
                        '</div>'].join('');

            // if (appDevice == 'iPad'){

            //     if (adData.length == nativeCount){

            //         $('.native-ad-con').append(adTpl);

            //     }

            // }
            // else{

            //     $('.cate-list:eq(1)').after(adTpl);

            // }

            $('.native-ad-con').append(adTpl);

            jsToOC.send('nativeadrender?index=' + adIndex);

        }

        // //点击广告
        // $page.on(appConfig.clickEvent, '.native-ad', function () {

        //     var $button = $(this).find('.download');

        //     var thizHref = $button.data('href');

        //     console.log(thizHref);

        //     jsToOC.send(thizHref);

        // });

        // //点击关闭
        // $page.on(appConfig.clickEvent, '.ad-title .close', function () {

        //     $(this).parents('.channel-ad-part').remove();

        // });

        //点击广告
        $page.on(appConfig.clickEvent, '.native-ad-link', function () {

            var thiz = $(this);

            var thizHref = thiz.data('href');

            console.log(thizHref);

            jsToOC.send(thizHref);            

        });

        //点击关闭
        $page.on(appConfig.clickEvent, '.native-ad .close', function (e) {

            $(this).parents('.native-ad').remove();

        });

    }

    //get native ad
    function getNativeAd () {

        jsToOC.send('getnativead?o=' + encodeURIComponent(JSON.stringify(nativeAdOption)));

        // var jsonStr = JSON.stringify([{
        //                     desc: "神作，爱玩不玩，哼",
        //                     icon: "http://pgdt.gtimg.cn/gdt/0/CAACNwGCWBVo4cwA2l8Vw5n.jpg/0?ck=dd3b76392f72c7a53c7e5290283046ad",
        //                     img: "http://pgdt.gtimg.cn/gdt/0/CAACS2DCVBVirpKBVoclbCN.jpg/0?ck=0edf57f5349c62b47438455956245109",
        //                     index: 0,
        //                     title: "苍穹变-娜扎代言 斗破苍穹"
        //                 },
        //                 {
        //                     desc: "神作，爱玩不玩，哼",
        //                     icon: "http://pgdt.gtimg.cn/gdt/0/CAACNwGCWBVo4cwA2l8Vw5n.jpg/0?ck=dd3b76392f72c7a53c7e5290283046ad",
        //                     img: "http://pgdt.gtimg.cn/gdt/0/CAACS2DCVBVirpKBVoclbCN.jpg/0?ck=0edf57f5349c62b47438455956245109",
        //                     index: 1,
        //                     title: "苍穹变-娜扎代言 斗破苍穹"
        //                 }])

        // pageInfo.appDidLoadNativeAd(jsonStr);

    }

function showChannelList () {

    // cate list

    $('.cate-list').show();

    $('.scroller').each(function() {

        var $el = $(this);
        var $items = $(this).find('a');

        var itemWidth = $items.first().width();

        $el.css('width', $items.length*itemWidth);
    });

    lazyLoad.first();

    getNativeAd();
}




$(function() {

    pageInfo.rightButtonDidTap = function () {

        console.log('right button did tap!');

        var pageMore = $('.pageView').data('moreid');

        var pageFilter = $('.pageView').data('filter');

        var pageTitle = decodeURIComponent(getUrlParam('cate_alias'));

        // var $link = $('.cate-head').first();

        // var cateAlias = $link.data('target');

        // if (cateAlias == 'movie'){
        //     var cateTitle = '电影';
        // }else if (cateAlias == 'tv'){
        //     var cateTitle = '电视剧';
        // }else if(cateAlias == 'dongman'){
        //     var cateTitle = '动漫';
        // }else if(cateAlias == 'zongyi'){
        //     var cateTitle = '综艺';
        // }

        var url;

        if (appConfig.isLocal) {
            url = 'http://10.88.0.111/tonight/server-v3/static/client/src/html/list.html';
        }
        else {
            url = appConfig.webDomain + '/video/list';
        }

        OpenPage({
            url: url + '?cate_alias=' + pageMore + '&from=channellist&filter=' + pageFilter,
            t: pageTitle,
            tbh: true,
            ahl: false,
            rb: {
                t: '1',
                v: 'panel'
            }
        });
        
        ga('send', 'event', 'Channel To Channel List To Video List', 'click', pageTitle + '_' + pageMore);
    }

    // 显示首页
    showChannelList();

    lazyLoad.init();

    $page.on(appConfig.clickEvent, '.special-list a', function () {

        var $link = $(this);

        var specialData = $link.data();

        var specialUrl;

        if (appConfig.isLocal) {
            specialUrl = 'http://10.88.0.111/tonight/server-v3/static/client/src/html/special.html'
        }
        else {
            specialUrl = appConfig.webDomain + '/video/special';
        }

        OpenPage({
            url: specialUrl + '?special_id=' + specialData.id + '&from=channellist',
            t:  specialData.name,
            tbh: true,
            ahl: false,
            pcf: true
        });

        ga('send', 'event', 'Channel To Channel List To Video Specail', 'click', specialData.name + '_' + specialData.id);
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

        var data = $(this).data(),
            name = $(this).find('.title').text();
        data.name == name;
        // console.log(data);
        localStore.set(data);
        // console.log(localStore.get(data.videoId));

        OpenPage({
            url: url + '?video_id=' + data.videoId + '&video_name=' + encodeURIComponent(name),

            // title: video-name
            t: name,
            
            // 隐藏TabBar
            tbh: true,

            pcf: true

            //展示banner
            ,ban: {
                i: 2,
                p: 2
            }

            ,rb: {
                t: '1',
                v: 'share'
            }

            // 页面加载完不会自动隐藏菊花
            // ahl: false
        });

        ga('send', 'event', 'Channel To Channel List To Video Detail', 'click', name + '_' + data.videoId);

    });

    // 查看分类列表
    $page.on(appConfig.clickEvent, '.cate-head', function () {

        var $link = $(this);

        var cateTitle = $link.find('.cate-title').text();

        var cateAlias = $link.data('target');

        var cateFilter = $link.data('filter');

        var url;

        if ($link.find('.more').length > 0){

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
                ahl: false,
                rb: {
                    t: '1',
                    v: 'panel'
                },
                ck: 1
            });

            ga('send', 'event', 'Home To Video List', 'click', cateAlias);

        }

    });

});


});