define(function (require, exports, module) {

	var appConfig = require('../config');

	function send(url) {
		var iframe = document.createElement('IFRAME');
		iframe.setAttribute('src', appConfig.appScheme + url);
		document.documentElement.appendChild(iframe);
		iframe.parentNode.removeChild(iframe);
		iframe = null;
	}

	exports.send = send;

	// exports.send = function(){};
});