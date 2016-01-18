define(function (require, exports, module) {

	require('../plugins/cookie');

	var jsToOC = require('./jsToOC');

    var appConfig = require('../config');

    var miaowuUrl = 'http://um0.cn/OkcYP';

    var zongyiUrl = 'http://um0.cn/2YILgk';

	var appList = [
        {
            scheme: 'qisi-miaowu',
            category: 'dongman',
            shouldOpen: false,
            device: 'iPhone',
            appName: '喵呜动漫',
            url: appConfig.appScheme + 'open/safari?url=' + miaowuUrl
        },
        {
            scheme: 'qisi-zongyi',
            category: 'zongyi',
            shouldOpen: false,
            device: 'iPhone,iPad',
            appName: '综艺大爆炸',
            url: appConfig.appScheme + 'open/safari?url=' + zongyiUrl
        }
    ];



    exports.formatPlayUrl = function (playUrl, button) {

    	for (item in appList) {

    		if (appList[item].shouldOpen) {

    			var schemeInUrl = playUrl.match(/^.*(?=:\/\/)/);

    			if (schemeInUrl && schemeInUrl.length) {

    				var targetScheme = schemeInUrl[0];

    				playUrl = playUrl.replace(targetScheme, appList[item].scheme);

                    button.text('去《' + appList[item].appName + '》内播放');
    			};

    			// qisi-hd://play?h=cac9e86e97a7165a697196107f917e64||Secret Love
    			// qisi-miaowu://play?h=cac9e86e97a7165a697196107f917e64||Secret Love
    			// qisi-zongyi://play?h=cac9e86e97a7165a697196107f917e64||Secret Love

    			// 只替换匹配到的第一项
    			break;
    		};
    	}

    	return playUrl;
    }



    exports.checkSupported = function (category) {

    	for (item in appList) {

    		if (!appList[item].shouldOpen && appList[item].category == category) {

    			var device = $.cookie('xy_d_model');

    			if (appList[item].device.indexOf(device) >= 0) {

    				jsToOC.send('canopenurl?url=' + appList[item].scheme + '://');

    			};
    		};
    	}

    }



    exports.markSupported = function (url, supported, callback) {

		var scheme = url.replace('://', '');

    	// 引导安装banner的html
    	var bannerHtml = '';

    	if (supported) {

    		for (item in appList) {
    			
    			if (appList[item].scheme == scheme) {

    				appList[item].shouldOpen = true;
    			};
    		};

    	}

    	// 未安装的话生成banner的html
    	else {

            for (item in appList) {

                if (appList[item].scheme == scheme){

                    var bannerHtml = ['<div class="goto-apps">',
                                    '<a href="' + appList[item].url + '">',
                                        '<img src="' + appConfig.staticPath + '/images/banner/' + scheme + '.jpg">',
                                    '</a>',
                                '</div>'].join('');

                    break;

                }

            }
    	    
    	}


    	// 回调
    	callback(bannerHtml);
    }

});





