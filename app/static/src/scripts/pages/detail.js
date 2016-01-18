define(function (require, exports) {

    var appConfig = require('../config')
        , jsToOC = require('../utils/jsToOC')
        , getUrlParam = require('../utils/getUrlParam')
        , OpenPage = require('../utils/openPage')
        , renderDetail = require('../templates/detail')
        , renderZY = require('../templates/zyList')
        , localStore = require('../utils/localStorage')
        , loading = require('../views/loading')
        , renderRecommend = require('../templates/recommendVideo')
        , renderSeries = require('../templates/videoSeries')
        , pageInfo = require('../utils/global')
        , debugMode = getUrlParam('debug')
        , pageBannerSet = require('../utils/pageBannerSet')
        , supportedApps = require('../utils/supportedApps')
        , sweetAlert = require('../plugins/sweetalert')

    require('../plugins/cookie');
        

    var CardedList = {};

    var RangedList = {};

    var VideoInfo = {};

    var $card = $('.pageView');

    var appVersion = parseFloat($.cookie('xy_a_version'));

    var cookieDevice = $.cookie('xy_d_model');

    var appDevice = pageInfo.appInfo.deviceInfo.deviceType;

    var downloadTarget;

    var seriesID,
        seriesInfo;

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
                "placement": "9070500587785286"
            }
        };

    //appDidLoadNativeAd
    pageInfo.appDidLoadNativeAd = function (data) {

        console.log('appDidLoadNativeAd');

        // console.log(JSON.parse(data));

        var adData = JSON.parse(data);

        if (appDevice == 'iPad' && adData.length == nativeCount){

            $card.append('<div class="native-ad-con clearfix"></div>');

        }

        for (var i = 0;i < adData.length;i ++){

            var adTitle = adData[i].title,
                adIndex = adData[i].index,
                adImg = adData[i].img,
                adIcon = adData[i].icon,
                adDesc = adData[i].desc,
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

                $card.append(adTpl);

            }

            jsToOC.send('nativeadrender?index=' + adIndex);

        }

        //点击广告
        $card.on(appConfig.clickEvent, '.native-ad-link', function () {

            var thiz = $(this);

            var thizHref = thiz.data('href');

            console.log(thizHref);

            jsToOC.send(thizHref);            

        });

        //点击关闭
        $card.on(appConfig.clickEvent, '.native-ad .close', function (e) {

            $(this).parents('.native-ad').remove();

        });

    }

    //get native ad
    function getNativeAd () {

        jsToOC.send('getnativead?o=' + encodeURIComponent(JSON.stringify(nativeAdOption)));

    }

    var originTop = 0,
        followLock = 0,
        scrollInterval = null,
        isSubcribed = 0,
        recoType,
        recoId,
        pageName = getUrlParam('video_name'),
        pageId = getUrlParam('video_id'),
        viewedLock = 0,
        viewedTimer = null;

    console.log(getUrlParam('video_name'));

    console.log(pageName);

    // 获取单个媒体的参数串
    function getMediaParams (media) {

        var hash = media.hash || '',
            size = media.play ? media.play.file_size : '',
            name = media.tv ? media.tv.name : VideoInfo.name,
            index = media.tv ? media.tv.episode : '';

        var param = hash + '|' + size + '|' + name + '|[' + index + ']';

        return param;
    }

    //页面重现
    pageInfo.viewDidReShow = function () {

        console.log('view did reshow');

        var videoID = getUrlParam('video_id');

        jsToOC.send('checkviewed?vid=' + videoID); 

        viewedTimer = setTimeout(function(){

            showViewedProcess();
            
        }, 1000);

    }

    //观看进度
    function showViewedProcess () {

        if (pageInfo.viewedInfo){

            var d = getDuration(pageInfo.viewedInfo.d);
            var vd = getDuration(pageInfo.viewedInfo.vd);

            var viTpl = '';
        
            if (pageInfo.viewedInfo.index){

                viTpl += '上次看到第' + pageInfo.viewedInfo.index + '集 ';

                if (d){

                    viTpl += vd + ' / ' + d; 

                }             

            }else if (d){

                viTpl += '上次看到 ' + vd + ' / ' + d;

            }

            $('.viewedInfo').html(viTpl).css({'visibility': 'visible'});

        }

    }

    //页面即将展现
    pageInfo.viewWillAppear = function () {

        console.log('view will appear');

    }

    //页面展现完成
    pageInfo.viewDidAppear = function () {

        console.log('view did appear');

    }

    //页面即将消失
    pageInfo.viewWillDisappear = function () {

        console.log('view will disappear');

    }

    //页面消失
    pageInfo.viewDidDisappear = function () {

        console.log('view did disappear');

        viewedLock = 0;

    }


    pageInfo.appCanOpenUrl = function (url, canOpen) {

        // 标记检查结果
        supportedApps.markSupported(url, canOpen, function (bannerHtml) {

            if (bannerHtml && bannerHtml.length) {

                $('.pageView').prepend(bannerHtml);
            };
        });
    }


    // 添加下载列表VIEW
    function addDownloadListView() {

        var list = VideoInfo.mediaInfo.list[VideoInfo.selectedSite],
            videoInfoDownload = {
                'videoID': VideoInfo.videoID,
                'videoName': decodeURIComponent(VideoInfo.name),
                'videoType': VideoInfo.topCategory,
                'videoTarget': downloadTarget,
                'videoOriType': VideoInfo.originCate
            }

        list.forEach(function (media, index) {

            var params = getMediaParams(media)

            media.name = media.tv ? media.tv.name : VideoInfo.name;
        });

        localStorage.downloadInfo = JSON.stringify(list);
        localStorage.downloadVideo = JSON.stringify(videoInfoDownload);

        var downLoadUrl;

        // 读取downloadInfo JSON.parse(localStorage.downloadInfo)

        if (appConfig.isLocal) {
            downLoadUrl = 'http://10.88.0.111/tonight/server-v3/static/client/src/html/detail.html'
        }
        else {
            downLoadUrl = appConfig.webDomain + '/video/downloads';
        }

        if (!isNaN(appVersion) && appVersion>3.2){
            OpenPage({
                url: downLoadUrl,
                t:  '缓存',
                tbh: true,
                pdr: false,
                ahl: false
            });
        }
        else{
            OpenPage({
                url: downLoadUrl,
                t:  '缓存',
                tbh: true,
                pdr: false
                // ahl: false
            });
        }

    }

    //分享+报告
    function showMoreSelect() {

        var tpl = ['<div class="more-select-con">',
                        '<div class="more-select">',
                            '<div class="arrow"></div>',
                            // '<a data-type="share" class="more-share" href="javascript:;">分享</a>',
                            // '<div class="separator-line"></div>',
                            '<a data-type="report" class="more-report" href="javascript:;">反馈</a>',
                        '</div>',
                    '</div>'].join('');

        if ($('.more-select-con').size() > 0){

            $('.more-select-con').remove();

        }else{

            $('body').append(tpl);
            // $card.append(tpl);

        }

    }

    function moreAction() {

        //点击分享或报告
        $('body').on(appConfig.clickEvent, '.more-select a', function (e) {

            var thiz = $(this),
                thizType = thiz.data('type');

            if (thizType == 'share'){



            }else if (thizType == 'report'){

                report();

            }

        });

        //点击报告编辑
        $('body').on('touchend', '.report-link', function (e) {

            setTimeout(function(){

                report();

            }, 400);

            e.preventDefault();
            

        });

        //点击确定或取消
        $('body').on('touchend', '.btn-con button', function (e) {

            var thiz = $(this),
                thizType = thiz.data('type');

            if (thizType == 'cancel'){

                $('.report-pop').remove();

                $('.pageView').css('height', 'auto');

                $('body').css('height', 'auto');

                $('html').css('height', 'auto');

            }
            else if (thizType == 'confirm'){

                var reportType = $('.report-con input:checked').data('type'),
                    reportWords = $.trim($('.report-con textarea').val()),
                    reportID = thiz.data('id'),
                    reportName = thiz.data('name'),
                    gaReport = '';

                if ($('.report-con input:checked').size()){

                    if (reportType == 'other' && reportWords.length > 0){

                        gaReport = reportType + '_' + reportWords;
                        

                    }else if (reportType != 'other'){

                        gaReport = reportType;

                    }else{

                        return;

                    }

                    ga('send', 'event', 'Video Detail', 'report', reportName + '_' + reportID + '_' + gaReport);

                    $('.report-pop').remove();

                    $('.pageView').css('height', 'auto');

                    $('body').css('height', 'auto');

                    $('html').css('height', 'auto');

                    sweetAlert({
                        title: "提交成功",
                        // text: "Something went wrong!",
                        timer: 1000,
                        type: "success",
                        showConfirmButton: false
                    });

                }

            }

            e.preventDefault();

        });

        //点击弹窗以外区域
        $('body').on('touchend', '.report-bg', function (e) {

            $('.report-pop').remove();

            $('.pageView').css('height', 'auto');

            $('body').css('height', 'auto');

            $('html').css('height', 'auto');

            e.preventDefault();

        });

    }



    //报告问题
    function report() {

        var json = $('.pageView').data('result'),
            videoID = json.video_id,
            videoName = decodeURIComponent(json.video_title),
            ifShow = '';

        if ($('.more-select-con').size() > 0){

            $('.more-select-con').remove();

        }


        $('.pageView').css('height', '100%');

        $('body').css('height', '100%');

        $('html').css('height', '100%');

        // $('body').append(tpl);

        $('html').scrollTop(0);


        var tpl = ['<div class="report-con">',
                        '<p><label><input class="video-report" name="video-report" data-type="error_play" type="radio" >无法播放</label></p>',
                        '<p style="' + ifShow + '"><label><input class="video-report" name="video-report" data-type="error_update" type="radio" >剧集更新慢</label></p>',
                        '<p><label><input class="video-report" name="video-report" data-type="error_cache" type="radio" >无法缓存</label></p>',
                        '<p><label><input class="video-report" name="video-report" data-type="error_info" type="radio" >影片信息有误</label></p>',
                        '<p><label><input class="video-report" name="video-report" data-type="error_celebrity" type="radio" >艺人信息有误</label></p>',
                        '<p><label><input class="video-report" name="video-report" data-type="add" type="radio" >催促小编添加片源</label></p>',
                    '</div>'].join('');

        sweetAlert({
            title: '',
            text: tpl,
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            closeOnConfirm: false,
            closeOnCancel: true,
            html: true
            // imageUrl: appConfig.staticPath+'/images/banner/'+targetItem.scheme+'-icon.png'
        },
        function(isConfirm) {

            if (isConfirm) {

                if ($('.report-con input:checked').size()){

                    var reportType = $('.report-con input:checked').data('type'),
                        reportWords = $.trim($('.report-con textarea').val()),
                        gaReport = '';

                    if (reportType == 'other' && reportWords.length > 0){

                        gaReport = reportType + '_' + reportWords;
                        

                    }else if (reportType != 'other'){

                        gaReport = reportType;

                    }else{

                        return;

                    }

                    console.log(gaReport);

                    ga('send', 'event', 'Video Detail', 'report', videoName + '_' + videoID + '_' + gaReport);

                    sweetAlert({
                        title: "提交成功",
                        // text: "Something went wrong!",
                        timer: 1000,
                        type: "success",
                        showConfirmButton: false
                    });

                }

            }
            else {

                // sweetAlert("Oops...", "Something went wrong!", "error");

            }

            $('.pageView').css('height', 'auto');

            $('body').css('height', 'auto');

            $('html').css('height', 'auto');
        });

    }


    // 获取所在大类
    function getCategory (cates) {

        var category = 'unknown';

        if (cates && cates.length) {

            category = cates[0]['alias'] ? cates[0]['alias'].split('/')[1] : 'tv';
        }

        return category;
    }


    function getDuration (seconds) {

        var result = '';

        if (seconds > 0) {

            var hour = Math.floor(seconds/3600),
                minite = Math.floor((seconds - hour*3600)/60),
                second = seconds % 60;

            var hour_s = hour>0 ? hour+':' : '',
                minite_s = minite>9 ? minite+':' : '0'+minite+':',
                second_s = second>9 ? second+'' : '0'+second;

            result = hour_s+minite_s+second_s;
        }

        return result;
    }


    function getRangedList (mediaList) {

        var lists = {},
            ranges = [];

        var targetRange;

        var episodeStart = 1;
        var index = 0;

        var firstMedia = mediaList[0];

        if (firstMedia.tv && firstMedia.tv.episode) {

            episodeStart = parseInt(mediaList[0].tv.episode);
        };


        var rangeCount = 100,
            rangeIndex = Math.floor(episodeStart/rangeCount);
            

        while (mediaList[index]) {

            // console.log('range index: %s  episode start: %s', rangeIndex, episodeStart)

            // 700
            var episodeEnd = (rangeIndex+1) * rangeCount;

            // console.log('episode start: %s  end: %s', episodeStart, episodeEnd)
            
            // 700 - 652 + 1 = 49
            // 当前区间有多少个剧集
            var count = episodeEnd - episodeStart + 1;
            var endIndex = index + count;

            // console.log('start index: %s  end index: %s  count: %s', index, endIndex, count)

            var list = mediaList.slice(index, endIndex);

            // 取截取的区间列表最后一条的剧集
            var lastEpisode = list[list.length-1];

            if (lastEpisode && lastEpisode.tv && lastEpisode.tv.episode) {
                episodeEnd  = parseInt(list[list.length-1].tv.episode)
            };


            var range = episodeStart.toString() + '-' + episodeEnd.toString();

            ranges.push(range);


            // 获取初始显示的区间
            var currentIndex = VideoInfo.targetEpisodeIndex;

            // console.log('currentIndex: %s', currentIndex)

            if (currentIndex && currentIndex>=episodeStart && currentIndex<=episodeEnd) {

                targetRange = range;
            };


            lists[range] = list;

            // 更新各种位置索引
            episodeStart = episodeEnd + 1;
            index = endIndex;

            rangeIndex += 1;
        }


        return {
            ranges: ranges.reverse(),
            lists: lists,
            targetRange: targetRange
        };
    }


    // 切换视频源
    function reloadData(button, first) {

        var $button = $(button);

        var target = $button.data('name');

        if (target == VideoInfo.selectedSite) return;

        $button.addClass('selected').siblings('a').removeClass('selected');

        VideoInfo.selectedSite = target;

        var sourceList = VideoInfo.mediaInfo.list;

        var mediaList = sourceList[target];


        if (mediaList && mediaList.length) {

            var mediaDefault = VideoInfo.isDesc ? mediaList[mediaList.length-1] : mediaList[0];
            // var mediaDefault = mediaList[0];

            //判断是否为sohu
            if (target == 'sohu'){

                $('.download-guide').show().css('opacity', '0.7');

            }else{

                $('.download-guide').hide();

            }

            // 如果有之前选中过剧集
            if (VideoInfo.targetEpisodeIndex) {

                var targetMedia = null;

                for (var i=0; i<mediaList.length; i++) {

                    var media = mediaList[i];

                    if (media.tv && media.tv.episode==VideoInfo.targetEpisodeIndex) {
                        targetMedia = media;

                        break;
                    }
                };

                if (targetMedia) mediaDefault = targetMedia;
            }



            VideoInfo.targetEpisodeIndex = mediaDefault.tv && mediaDefault.tv.episode ? mediaDefault.tv.episode : 1;


            var params = getMediaParams(mediaDefault);


            var $playButton = $('.detail-item').find('.play');

            var playUrl = appConfig.appScheme + 'play?h=' + params;
            // 如果需要跳转到其它应用中播放
            // playUrl = supportedApps.formatPlayUrl(playUrl, $playButton);

            var downloadUrl = appConfig.appScheme + 'download?h=' + params;

            $playButton.attr('href', playUrl);

            $playButton.data('vname', mediaDefault.tv ? mediaDefault.tv.name : decodeURIComponent(VideoInfo.name));
            $playButton.data('sname', mediaDefault.site_name);
            $playButton.data('hash', mediaDefault.hash);
            $playButton.data('eindex', VideoInfo.targetEpisodeIndex);


            var $downloadButton = $('.detail-item').find('.download');


            var downloadUrl = appConfig.appScheme + 'download?h=' + params;
                var videoName = decodeURIComponent(VideoInfo.name),
                    siteName = VideoInfo.selectedSite,
                    sourceList = VideoInfo.mediaInfo.list,
                    mediaList = sourceList[siteName],
                    videoHash = mediaList[0].hash,
                    episodeIndex = 0,
                    gaPlayArry = [];
                $downloadButton.text('缓存').attr('href', downloadUrl);

                $downloadButton.off(appConfig.clickEvent);
                $downloadButton.on(appConfig.clickEvent, function() {
                    // ga('send', 'event', 'Video', 'Download', gaPlayArry.join('_'), {'nonInteraction':1});
                    ga('send', 'event', 'Video Detail', 'download', videoName + '_' + VideoInfo.videoID + '_' + episodeIndex, {'nonInteraction': 1});

                    ga('send', 'event', 'Video Site Name', 'download', videoName + '_' + VideoInfo.videoID + '_' + siteName + '_' + videoHash, {'nonInteraction': 1});
                });

            // 视频源切换提示(第一次不显示)
            if (!first) {

                showViewedProcess();

                jsToOC.send('notification?text=视频源已切换&success=1');

            }else{

                pageInfo.viewDidReShow();  

                // getNativeAd();              

            }
            
        }

        else {
            console.warn('has no medias for %s !', target);
            ga('send', 'event', 'Video Site Empty', 'error', decodeURIComponent(VideoInfo.name) + '_' + VideoInfo.videoID + '_' + VideoInfo.selectedSite, {'nonInteraction':1});
        }
    }


    //发送ga请求
    function sendGaPlay(item){
        var thiz = item,
            videoName = decodeURIComponent(VideoInfo.name),
            siteName = thiz.data('sname'),
            videoHash = thiz.data('hash'),
            episodeIndex = thiz.data('eindex'),
            gaPlayArry = [];

        if (VideoInfo.mediaInfo.type == 'movie'){
            episodeIndex = 0;
        }

        // ga('send', 'event', 'Video', 'Play', gaPlayArry.join('_'), {'nonInteraction':1});
        ga('send', 'event', 'Video Detail', 'play', videoName + '_' + VideoInfo.videoID + '_' + episodeIndex, {'nonInteraction':1});

        ga('send', 'event', 'Video Site Name', 'play', videoName + '_' + VideoInfo.videoID + '_' + siteName + '_' + videoHash, {'nonInteraction':1});
    }

    //错误提示
    function errorNotice () {

        console.log('error');

        var errorTpl = ['<div class="error-notice">',
                            '<p>非常抱歉，此视频已失效</p>',
                            '<p>如果您已经订阅此视频</p>',
                            '<a class="unfollow" href="javascript:;">取消订阅</a>',
                            '<p>如果此视频存在于观看记录列表，请手动删除</p>',
                        '</div>'];

        $card.html(errorTpl.join(''));

        // 取消订阅
        $card.on(appConfig.clickEvent, 'a.unfollow', function () {

            var didSubString = 'unsubscribe?';
                
                didSubString += 'id=' + pageId;

            jsToOC.send(didSubString);

            console.log(didSubString);

        });

    }

    //  同步加载视频信息
    function addView (options) {


        // 查看视频详情
        $card.on(appConfig.clickEvent, '.video-item', function () {
         
            var url,
                gaType;

            if (appConfig.isLocal) {
                url = 'http://10.88.0.111/tonight/server-v3/static/client/src/html/detail.html'
            }
            else {
                url = appConfig.webDomain + '/video/detail';
            }

            var data = $(this).data();

            localStore.set(data);

            OpenPage({

                url: url + '?video_id=' + data.videoId + '&video_name=' + data.name,

                // title: video-name
                t:  data['name'],
                
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

            if (data.type == 'series'){

                gaType = 'Series';

            }
            else if (data.type == 'recommend'){

                gaType = 'Recommand';

            }

            ga('send', 'event', 'Video ' + gaType + ' To Video Detail', 'click', data.name + '_' + data.videoId, {'nonInteraction':1});

        }); 

        var json = $('.pageView').data('result');

        console.log(json.status);

        if (video_can_download == false){

            $('.actions .download').hide();
            
            $('.actions .play').css({'display': 'block','width': '22%'});

        }

        // 切换按钮
        var $buttons = $card.find('.detail-cards .button');
        $buttons.on(appConfig.clickEvent, cardSwitch);

    } 

    function cardSwitch () {

        var $button = $(this);

        if ($button.hasClass('current')) return;

        var $card = $('#card-' + $button.data('target'));

        // 如果button是隐藏的，不显示arrow
        if ($button.is(':visible')) {

            var offset = $button.offset(),
                buttonLeft = offset.left,
                buttonWidth = offset.width;

            $button.addClass('current').siblings().removeClass('current');

            $card.show().siblings('.card').hide();

        }

        else {
            $card.show().siblings('.card').hide();
        }

        if ($button.data('target') == 'related' && $('#card-related').find('.video-item').length == 0 && $('#card-related').find('.message').length == 0 && $('.loader').length == 0){
            recommends(recoType, recoId);
        }
    }

    //相关推荐
    function recommends(dType, vId){

        if ($('.loader').length == 0){

            $('#card-related').append(loading.init());

        } 
        
        var getCount = 10;

        if (dType == 'iPad' || dType == 'unknown'){
            getCount = 16;
        }

        $.ajax({
            url: appConfig.apiDomain + '/videos/recommendation' + appConfig.ajaxCallback,
            data: {
                video_id: vId,
                count: getCount
            },
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                if (data.status && data.videos){
                    var data = data.videos;
                    if (data.length > 0){
                        $card.find('#card-related').append(renderRecommend(data));
                    }else {
                        $card.find('#card-related').append('<div class="message" style="text-align: center;">暂无相关视频</div>');
                    }
                }else{
                    $card.find('#card-related').append('<div class="message" style="text-align: center;">暂无相关视频</div>');
                }

                if ($('.loader').length > 0){

                    loading.hide();

                }

            },

            error: function() {
                alert('error');
                console.log("recommend error");

                if ($('.loader').length > 0){

                    loading.hide();
                    
                }

                $card.find('#card-related').append('<div class="message" style="text-align: center;">暂无相关视频</div>');

            }
        });
    }

    //追剧
    function videoFollow(){

        if (debugMode) {

            pageInfo.subscribed = 0;    

        }

        isSubcribed = pageInfo.subscribed ? pageInfo.subscribed : '0';

        console.log('pageInfo=' + JSON.stringify(pageInfo));

        console.log('isSubcribed=' + isSubcribed);
        
        if (isSubcribed == 0){

            $('.follow').removeClass('hasfollow');

        }
        else if (isSubcribed == 1){

            $('.follow').addClass('hasfollow');

        }

        $card.on(appConfig.clickEvent, '.follow', function(){
            
            if (isSubcribed == 0){
                var didSubString = 'subscribe?';

                didSubString += 'id=' + VideoInfo.videoID + '&name=' + VideoInfo.name + '&cover=' + VideoInfo.cover;
                didSubString += '&multi=' + VideoInfo.multiple + '&rating=' + VideoInfo.rating + '&duration=' + VideoInfo.duration;
                didSubString += '&date=' + VideoInfo.date + '&total=' + VideoInfo.total + '&current=' + VideoInfo.targetEpisodeIndex + '&site=' + VideoInfo.selectedSite;
                didSubString += '&latest=' + VideoInfo.latest;
            }else{
                var didSubString = 'unsubscribe?';
                
                didSubString += 'id=' + VideoInfo.videoID;
            }
            
            if (followLock == 0){
                followLock = 1;
                jsToOC.send(didSubString);
               // window[appConfig.appUAPrefix].didUnsubscribeVideo(1);
                
            }

            ga('send', 'event', 'Video Detail', 'follow', decodeURIComponent(VideoInfo.name) + '_' + VideoInfo.videoID, {'nonInteraction':1});

        })

        if (!isNaN(appVersion) && appVersion>=3.9){
            
            $('.follow').show();

        }

    }

    pageInfo.didSubscribeVideo = function (num) {

        subscribeBack(num);
    }

    pageInfo.didUnsubscribeVideo = function (num) {

        //如果页面有错误
        if ($('.error-notice').length > 0){

            if (num == 1){

                $('.unfollow').prev().text('取消订阅成功，请返回');

                $('.unfollow').remove();

            }

        }
        else{

            unSubscribeBack(num);

        }

    }

    //追剧回调
    function subscribeBack(type){
        
        followLock = 0;
        
        if (type == 1){
            pageInfo.subscribed = 1;
            isSubcribed = pageInfo.subscribed;
            $('.follow').addClass('hasfollow');
        }else{
            console.log('didSubscribeVideo failed');
        }
    }

    //取消追剧回调
    function unSubscribeBack(type){
        
        followLock = 0;
        
        if (type == 1){
            pageInfo.subscribed = 0;
            isSubcribed = pageInfo.subscribed;
            $('.follow').removeClass('hasfollow');
        }else{
            console.log('didUnSubscribeVideo failed');
        }
    }

    //检查追剧状态
    function checkSubscribe() {
        var checksubscribeString = 'checksubscribe?';

        checksubscribeString += 'id=' + VideoInfo.videoID + '&name=' + VideoInfo.name + '&cover=' + VideoInfo.cover;
        checksubscribeString += '&multi=' + VideoInfo.multiple + '&rating=' + VideoInfo.rating + '&duration=' + VideoInfo.duration;
        checksubscribeString += '&date=' + VideoInfo.date + '&total=' + VideoInfo.total + '&current=' + VideoInfo.targetEpisodeIndex + '&site=' + VideoInfo.selectedSite;
        checksubscribeString += '&latest=' + VideoInfo.latest;

        jsToOC.send(checksubscribeString);

        setTimeout(function() {

            videoFollow();

        }, 500)
        
    }

    //计算星级
    function tranStar(score){

        var starClass = 35;
        
        if (score && score.length) {

            // 6.7
            score = parseFloat(score);

            if (score != 0) {

                // 四舍五入后包含0.5的数量(13)
                starClass = Math.round(score/0.5);

                // 如果是奇数: -1(12) 保证 0.25 数量是偶数
                if (starClass%2 == 1) starClass -= 1;

                // 10分制转换成5分制 *10 消除小数点
                starClass = 'star-' + starClass/4 * 10;
            }
        }

        return starClass;
        
    }

    $(function() {

        var videoID = getUrlParam('video_id'),
            videoName = getUrlParam('video_name'),
            options = {},
            cookieDevice = $.cookie('xy_d_model');
        
        recoId = videoID;
        options.preData = localStore.get(videoID);

        options.deviceType = 'iPhone';
        recoType = 'iPhone';

        if (cookieDevice && cookieDevice.indexOf('iPad') >= 0){
            options.deviceType = 'iPad';
            recoType = 'iPad';
        }

        options.videoID = videoID;

        options.videoName = videoName;

        jsToOC.send('checkviewed?vid=' + videoID);

        setTimeout(function(){

            addView(options);

        }, 500);

        moreAction();

        $(document).on('touchmove', function(){
            $('.pageView').addClass('touch-invisible');
            
        });

        $(document).on('touchend', function(){
            $('.pageView').removeClass('touch-invisible');
            
        });

    });


});