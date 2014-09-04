/**
 * Open fetch bus line Ctrl
 * @author open-thinks@outlook.com
 *
 */

function parseBus() {
	var $loadHolder = $("iframe.open-fetcher-holder");
	var doc = $loadHolder.contents() ;
	$("#results table a", doc).each(function() {
//		var $link = $(this);
//		alert($link.attr("href"));
//		console.log($link.attr("href"));
	});
}

(function($) {

	$.fn.fetcher = function(userOptions) {
		var form = this, loadUrl = function() {
			var $loadHolder = $("iframe.open-fetcher-holder");
			if ($loadHolder.length == 0) {
				$loadHolder = $("<iframe class='open-fetcher-holder' onload='parseBus()'></iframe>").appendTo('body').css("display", "block");
			}
			$loadHolder.attr("src", "http://m.sz-map.com/search?kw=176&st=1&paging=y");

		};
		loadUrl();
	};

	$.fn.fetcher.defaults = {
		buslineSelector : '#bus-line',
		fetchUrl : 'http://m.sz-map.com/search?kw={bus-line}&st=1&paging=y'
	}

})(window.jQuery);
