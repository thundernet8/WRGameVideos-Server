define(function (require, exports) {

    var appConfig = require('../config')
        , OpenPage = require('../utils/openPage')
        , PageInfo = require('../utils/global')
        , RecommendApps = require('../utils/recommendApps')
        , JsToOC = require('../utils/jsToOC')


    require('../plugins/cookie');


    var $page = $('.pageView'),
        appVersion = parseFloat($.cookie('xy_a_version'));

    var appDevice = PageInfo.appInfo.deviceInfo.deviceType;

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
                "placement": "1000404574492182"
            }
        };

    //appDidLoadNativeAd
    PageInfo.appDidLoadNativeAd = function (data) {

        console.log('appDidLoadNativeAd');

        // console.log(JSON.parse(data));

        var adData = JSON.parse(data);

        if (appDevice == 'iPad' && adData.length == nativeCount){

            $('.categoryView').append('<div class="native-ad-con clearfix"></div>');

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
                                '<span class="ad-icon">广告</span>',
                                '<span class="title">' + adTitle + '</span>',
                                '<span class="caption">' + adDesc + '</span>',
                            '</div>',
                            '<div class="ad-notice"></div>',
                        '</a>',
                        // '<span class="close"></span>',
                        '</div>'].join('');

            if (appDevice == 'iPad'){

                if (adData.length == nativeCount){

                    $('.native-ad-con').append(adTpl);

                }

            }
            else{

                $('.categoryView').append(adTpl);

            }

            JsToOC.send('nativeadrender?index=' + adIndex);

        }

        // //点击广告
        // $page.on(appConfig.clickEvent, '.native-ad', function () {

        //     var $button = $(this).find('.download');

        //     var thizHref = $button.data('href');

        //     console.log(thizHref);

        //     JsToOC.send(thizHref);

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

            JsToOC.send(thizHref);            

        });

        //点击关闭
        $page.on(appConfig.clickEvent, '.native-ad .close', function (e) {

            $(this).parents('.native-ad').remove();

        });

    }

    //get native ad
    function getNativeAd () {

        JsToOC.send('getnativead?o=' + encodeURIComponent(JSON.stringify(nativeAdOption)));

        // var jsonStr = JSON.stringify([{
        //                     desc: "神作，爱玩不玩，哼",
        //                     icon: "http://pgdt.gtimg.cn/gdt/0/CAACNwGCWBVo4cwA2l8Vw5n.jpg/0?ck=dd3b76392f72c7a53c7e5290283046ad",
        //                     img: "http://pgdt.gtimg.cn/gdt/0/CAACS2DCVBVirpKBVoclbCN.jpg/0?ck=0edf57f5349c62b47438455956245109",
        //                     index: 0,
        //                     title: "苍穹变-娜扎代言 斗破苍穹"
        //                 }
        //                 ,{
        //                     desc: "神作，爱玩不玩，哼",
        //                     icon: "http://pgdt.gtimg.cn/gdt/0/CAACNwGCWBVo4cwA2l8Vw5n.jpg/0?ck=dd3b76392f72c7a53c7e5290283046ad",
        //                     img: "http://pgdt.gtimg.cn/gdt/0/CAACNwGCWBVo4ctCSG985FV.jpg/0?ck=7b43d30fb7d0891bad11553404c224db",
        //                     index: 1,
        //                     title: "苍穹变-娜扎代言 斗破苍穹"
        //                 }
        //                 ])

        // PageInfo.appDidLoadNativeAd(jsonStr);

    }


    // 查看分类列表
    function showList() {

        $page.on(appConfig.clickEvent, '.cate-item', function () {

            var $link = $(this);

            var cateTitle = $link.text();

            var cateAlias = $link.data('target');

            var cateFilter = $link.data('filter');

            var cateSubid = $link.data('subid');

            var url;

            if ($link.hasClass('parent-cate')){
                if (appConfig.isLocal) {
                    url = 'http://10.88.0.110/jinwankansha-v3/server-v3/static/client/src/html/channellist.html';
                }
                else {
                    url = appConfig.webDomain + '/channel/list';
                }
            }

            else if($link.hasClass('special-cate')){
                if (appConfig.isLocal) {
                    url = 'http://10.88.0.110/jinwankansha-v3/server-v3/static/client/src/html/speciallist.html';
                }
                else {
                    url = appConfig.webDomain + '/special';
                }

                OpenPage({
                    url: url + '?cate_alias=' + cateAlias + '&from=channelindex',
                    t:  cateTitle,
                    tbh: true,
                    pdr: false,
                    ahl: false
                });

                // ga('send', 'event', 'Channel To Special List', 'click', '');

                ga('send', 'event', 'Channel To List', 'click', 'Special_' + cateTitle + '_' + cateAlias);
            }

            else{

                if ($link.hasClass('rank-cate')){

                    if (appConfig.isLocal) {
                        url = 'http://10.88.0.110/hd-v3/server-v3/static/client/src/html/rank.html';
                    }
                    else {
                        url = appConfig.webDomain + '/video/rank';
                    }


                    OpenPage({
                        url: url,
                        t:  cateTitle,
                        tbh: true,
                        ahl: false,
                        bce: false,
                        pc: {
                            r: 255,
                            g: 255,
                            b: 255,
                            a: 0.2
                        }
                    });


                    // ga('send', 'event', 'Channel To Chart List', 'click');

                    ga('send', 'event', 'Channel To List', 'click', 'Chart_' + cateTitle + '_' + cateAlias);

                }
                else {

                    if (appConfig.isLocal) {
                        url = 'http://10.88.0.110/hd-v3/server-v3/static/client/src/html/list.html';
                    }
                    else {
                        url = appConfig.webDomain + '/video/list';
                    }


                    OpenPage({
                        url: url + '?cate_alias=' + cateAlias + '&from=channelindex&filter=' + cateFilter + '&subid=' + cateSubid,
                        t:  cateTitle,
                        tbh: true,
                        ahl: false,
                        rb: {
                            t: '1',
                            v: 'panel'
                        }
                    });

                    // ga('send', 'event', 'Channel To Video List', 'click', cateTitle + '_' + cateAlias);

                    ga('send', 'event', 'Channel To List', 'click', 'Category_' + cateTitle + '_' + cateAlias);

                }
                
            }
        });


        function openChannelList (cateTitle, cateAlias) {

            var url;

            if (appConfig.isLocal) {
                url = 'http://10.88.0.110/jinwankansha-v3/server-v3/static/client/src/html/channellist.html';
            }
            else {
                url = appConfig.webDomain + '/channel/list';
            }


            OpenPage({
                url: url + '?cate_id=' + cateAlias + '&from=channelindex&cate_alias=' + cateTitle,
                t: cateTitle,
                tbh: true,
                asl: false,
                rb: {
                    t: '3',
                    v: '更多'
                }
            });

            // ga('send', 'event', 'Channel To Channel List', 'click', cateTitle + '_' + cateAlias);

            ga('send', 'event', 'Channel To List', 'click', 'Channel_' + cateTitle + '_' + cateAlias);
        }

    
        // 点击上方主入口
        $page.on(appConfig.clickEvent, '.head-cate-item', function (e) {

            var $link = $(this);

            var cateTitle = $link.text();

            var cateAlias = $link.data('target');

            setTimeout(function(){

                RecommendApps.handleSelect(cateAlias, function (shouldOpenPage) {

                    if (shouldOpenPage) {

                        // console.log('shouldOpenPage is ' + shouldOpenPage);

                        openChannelList(cateTitle, cateAlias);
                    }
                });

            }, 400);

            // openChannelList(cateTitle, cateAlias);

        });
    }
    

    $(function() {

        if (!isNaN(appVersion) && appVersion>=3.7) {

            // 注册检查结果的回调函数
            PageInfo.appCanOpenUrl = function (url, canOpen) {

                if (canOpen) {

                    // 标记检查结果
                    RecommendApps.markInstalled(url, canOpen);
                };
            }


            // 检查主入口对应的App是否已安装
            $('.head-cate-item').each(function () {

                var $item = $(this);

                var category = $item.data('target');

                RecommendApps.checkInstalled(category);
            });


            // debug
            // setTimeout(function () {

            //  PageInfo.appCanOpenUrl('qisi-miaowu://', false);

            //  PageInfo.appCanOpenUrl('qisi-zongyi://', true);

            // }, 500);
        };




        showList();

        //获取原生广告数据
        if (!isNaN(appVersion) && appVersion > 3.7){

            getNativeAd();

        }

        // getNativeAd();

    });


});