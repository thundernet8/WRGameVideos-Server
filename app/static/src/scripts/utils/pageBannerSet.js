define(function(require, exports){

    var appConfig = require('../config');

    require('../plugins/cookie');

    var initBanner = function(){

        $('body').append('<script type="text/javascript" id="gdt-1040009171100119"></script>');

        window.TencentGDT = window.TencentGDT || [];

        TencentGDT.push({
            posid:'1040009171100119',
            type:'banner',
            filltype:'full',//填充方式，full：填满宽度，fix:固定大小,
            appid: "1104067950"
        });

        var doc=document, 
            h=doc.getElementsByTagName('head')[0], 
            s=doc.createElement('script');

        s.async=true; s.src='http://qzs.qq.com/qzone/biz/res/i.js';

        h && h.insertBefore(s,h.firstChild);

    }
    
    var setBanner = function(yType){

        var bannerHeight = 60;

        var cookieDevice = $.cookie('xy_d_model');

        if (cookieDevice && cookieDevice.indexOf('iPad') >= 0){
            bannerHeight = 120;
        }

        $("body").bind("DOMNodeInserted", function() {
            
            if ($('#gdt_banner_popup_wrap').length > 0){

                $("body").unbind("DOMNodeInserted");

                setTimeout(function(){
                    
                    if (yType == 'bottom'){

                        $('.pageView').css({'padding-bottom': bannerHeight, 'box-sizing': 'border-box'});
                        
                        $('#gdt_banner_popup_wrap').css({'position': 'fixed','z-index': '5'});
                        
                    }
                }, 1000);
                
            }
        });
        
        
    } 
    

    return {
        initBanner: initBanner,
        setBanner: setBanner
    }


});