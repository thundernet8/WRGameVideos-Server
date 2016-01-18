define(function() {

    var hostname = location.hostname,
        isLocal = hostname=='192.168.2.104' || hostname=='127.0.0.1' || hostname == 'dev.parser.cc',
        isDev = hostname.indexOf('dev')!==-1,
        $win = $(window);

    return {
        isLocal: isLocal,
        ajaxCallback: isLocal ? '?callback=?' : ''
        , apiDomain: (isLocal || isDev) ? 'http://127.0.0.1:5000/api/v1.0' : 'http://api.parser.cc/api/v1.0'
        , webDomain: (isLocal || isDev) ? 'http://127.0.0.1:5000/client/v1.0' : 'http://client.parser.cc/client/v1.0'
        , screenWidth: $win.width()
        , screenHeight : $win.height()
        , staticPath: isLocal ? '/hdvideo/server-v3/static/client/src' : '/static/m/hd/v3/client/src'
        , appScheme: 'wrgv-hd://'
        , appUAPrefix: 'WRGV-HD'
        , clickEvent: 'ontouchstart' in window ? 'tap' : 'click'
        , appID: '1054342776'
        , appName: '高清游戏视频'
        , appSpecialName: '来自《高清游戏视频》的专题推荐: '
        , appVersion: '1.0.0'
    }
});