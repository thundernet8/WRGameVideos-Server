define(function(require, exports){

    return function (key) {

        var arg = window.location.search;
        
        if (arg=='') return '';
        
        arg = arg.substring(1, arg.length);
        var args = arg.split("&"); 
        
        var value = '';
        
        for (var i = 0; i < args.length; i ++) {
            var item = args[i];
            var arg = item.split("=");
            if (arg.length < 2) continue;
            if (arg[0] == key) value = arg[1];
        }

        return value;
    }


});