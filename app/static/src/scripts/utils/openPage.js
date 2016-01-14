define(function (require, exports, module) {

	var JsToOC = require('./jsToOC');

	require('../plugins/cookie');

	var appVersion = parseFloat($.cookie('xy_a_version'));

	return function (o) {

		var options;

		if (!isNaN(appVersion) && appVersion>=4.3) {

			options = {
				nbs: 1,
			    tc: {
			        r: 255,
			        g: 255,
			        b: 255,
			        a: 1
			    },
			    bgc: {
			        r: 0,
			        g: 0,
			        b: 0,
			        a: 1
			    },
			    cc: {
			        r: 255,
			        g: 255,
			        b: 255,
			        a: 1
			    },
			    bs: 1,
			    ck: 1,
				or: 2,
				ar: 0,
				ca: 0
			};
		}

		else {

			options = {
			    tc: {
			        r: 255,
			        g: 255,
			        b: 255,
			        a: 1
			    },
			    bgc: {
			        r: 25,
			        g: 25,
			        b: 25,
			        a: 1
			    },
			    btc: {
			        r: 0,
			        g: 0,
			        b: 0,
			        a: 1
			    },
			    cc: {
			        r: 255,
			        g: 255,
			        b: 255,
			        a: 1
			    },
			    bs: 1,
			    ck: 1,
				or: 2,
				ar: 0,
				ca: 0
			};
		}

		

		var opts = $.extend(true, options, o);

		var jsonString = JSON.stringify(opts);

		console.log(jsonString)
		
		JsToOC.send('open/window?o='+encodeURIComponent(jsonString));
	}
});