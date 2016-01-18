define(function (require, exports) {

	var Spinner = require('../plugins/spin');

	var spinner;
	var $el;

	var opts = {
		lines: 11, // The number of lines to draw
		length: 4, // The length of each line
		width: 3, // The line thickness
		radius: 8, // The radius of the inner circle
		corners: 1, // Corner roundness (0..1)
		rotate: 0, // The rotation offset
		direction: 1, // 1: clockwise, -1: counterclockwise
		color: '#999', // #rgb or #rrggbb or array of colors
		speed: 1, // Rounds per second
		trail: 60 // Afterglow percentage
	};

	var showLoader = function(){     

		spinner = new Spinner(opts).spin();

		$el = $('<div class="loader"></div>');
			
		return $el.append(spinner.el);
			
	};

	var complete = function () {

		$el.html('<div class="allItemsLoaded"></div>');

		return $el;
	}
	
	var destoryLoader = function(){

		if ($('.loader').length > 0){
			spinner.spin();
			$el.remove();
		}
		
	}

	return {
		init: showLoader,
		hide: destoryLoader,
		complete: complete
	}
})