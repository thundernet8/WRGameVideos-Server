define(function(require, exports){

    var appConfig = require('../config');

    var setPreData = function (data){

        var preArry = localStorage.preData ? JSON.parse(localStorage.preData) : [];
        var pushLock = 0;
        
        for (var i = 0;i < preArry.length;i ++){
            if (preArry[i].videoId == data.videoId){
                pushLock = 1;
                
                return;

                break;
            }
        }
        
        if (pushLock == 0){
            if (preArry.length > 19){
                preArry.shift();
            }
            preArry.push(data);
            localStorage.preData = JSON.stringify(preArry);
        }
            
        
        

    }

    var getPreData = function (vId){

        var preArry = localStorage.preData ? JSON.parse(localStorage.preData) : '';
        if (preArry.length > 0){
            for (var i = 0;i < preArry.length;i ++){
                if (preArry[i].videoId == vId){
                    return preArry[i];
                    break;
                }
            }
        }

    }

    return {
        set: setPreData,
        get: getPreData

    }


});