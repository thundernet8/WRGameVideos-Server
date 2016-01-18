define(function(require, exports){

    var appConfig = require('../config');

    require('../plugins/cookie');
    
    // var deviceType = 'unknown'
    //     , dExp = new RegExp('\\b' + appConfig.appUAPrefix + 'MD\/([a-zA-Z]+)\\b')
    //     , ds = navigator.userAgent.match(dExp);
    // if (ds && ds.length) deviceType = ds[1];

    var deviceType = 'unknown';

    if (deviceType == 'unknown' && $.cookie('xy_d_model') == 'iPad') deviceType = 'iPad';
    if (deviceType == 'unknown' && $.cookie('xy_d_model') == 'iPhone') deviceType = 'iPhone';

    console.log('device type: %s', deviceType);

    // return deviceType;

    // var v = 0
    //     , vExp = new RegExp('\\b' + appConfig.appUAPrefix + 'SV\/((\\d)(\\.\\d)+)\\b')
    //     , vs = navigator.userAgent.match(vExp);
    // if (vs && vs.length) v = parseFloat(vs[1]);

    var v = $.cookie('xy_s_version');

    console.log('system version: %s', v);

    // return v;

    // var iOS7 = v >= 7.0;    

    var deviceInfo = {
        'deviceType': deviceType,
        'systemVersion': v,
        // 'ios': iOS7
    };

    var appVersion = parseFloat($.cookie('xy_a_version'));

    var appInfo = {
        'appVersion': appVersion,
        'deviceInfo': deviceInfo
    };

    window[appConfig.appUAPrefix] = {};
    window[appConfig.appUAPrefix].appInfo = appInfo;
    window[appConfig.appUAPrefix].deviceInfo = deviceInfo;

    return window[appConfig.appUAPrefix]

});