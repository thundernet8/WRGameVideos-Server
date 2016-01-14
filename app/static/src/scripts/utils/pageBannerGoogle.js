define(function(require, exports){

    var appConfig = require('../config');

    require('../plugins/cookie');

    var initBanner = function(target){

        var doc=document, 
            h=doc.getElementsByTagName('head')[0], 
            s=doc.createElement('script');

        s.async=true; s.src='http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';

        h && h.insertBefore(s,h.firstChild);

        // $('body').append('<ins class="adsbygoogle" style="display:block;width:100%;height:50px;" data-ad-client="ca-pub-4635126905896687" data-ad-slot="5632841656" data-ad-format="auto"></ins>');
        target.append('<ins class="adsbygoogle" style="display:block;width:100%;height:50px;" data-ad-client="ca-pub-4635126905896687" data-ad-slot="9325960458"></ins>');
        // $('body').append('<script async src="http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>');

        

        (adsbygoogle = window.adsbygoogle || []).push({});

        // $('body').append('<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>');

    }

    var initBannerB = function(target){

        var doc=document, 
            h=doc.getElementsByTagName('head')[0], 
            s=doc.createElement('script');

        s.async=true; s.src='http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';

        h && h.insertBefore(s,h.firstChild);

        // $('body').append('<ins class="adsbygoogle" style="display:block;width:100%;height:50px;" data-ad-client="ca-pub-4635126905896687" data-ad-slot="5632841656" data-ad-format="auto"></ins>');
        target.append('<ins class="adsbygoogle" style="display:block;width:100%;height:50px;" data-ad-client="ca-pub-4635126905896687" data-ad-slot="5765217254"></ins>');
        // $('body').append('<script async src="http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>');

        

        (adsbygoogle = window.adsbygoogle || []).push({});

        // $('body').append('<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>');

    }
    
    var setBanner = function(yType){

        var bannerHeight = 60;

        var cookieDevice = $.cookie('xy_d_model');

        if (cookieDevice && cookieDevice.indexOf('iPad') >= 0){
            bannerHeight = 120;
        }

        $("body").bind("DOMNodeInserted", function() {
            
            if ($('.adsbygoogle').length > 0){

                $("body").unbind("DOMNodeInserted");

                setTimeout(function(){
                    
                    if (yType == 'fixBottom'){

                        // $('.pageView').css({'padding-bottom': bannerHeight, 'box-sizing': 'border-box'});

                        $('.pageView').css({'padding-bottom': 50, 'box-sizing': 'border-box'});
                        
                        $('.adsbygoogle').css({'position': 'fixed','z-index': '5', 'bottom': '0', 'height': 50});
                        
                    }
                    else if (yType == 'bottom'){
                        
                        $('.adsbygoogle').css({'z-index': '5', 'height': 50});

                    }

                    $('.adsbygoogle').css({'height': 50});

                }, 1000);
                
            }
        });
        
        
    } 
    

    return {
        initBanner: initBanner,
        initBannerB: initBannerB,
        setBanner: setBanner
    }


});