/**
 * widgets components load js
 * @author:open-thinks@outlook.com
 * @description:widgets components loader
 * @since:2015/1/12
 */
(function() {
	var golabl = this;
	var ot = golabl.ot = golabl.ot || {};
	var wconfig = ot.wconfig = ot.wconfig || {};
	var wloader = ot.wloader = ot.wloader || {};
	var widgets = ot.widgets = ot.widgets || {};

	wloader.start = function() {
		$.each(wconfig, function(key, value) {
			var $widget = $('a[widgets-id="' + key + '"]');
			if (value.href) {
				$widget.attr('href', value.href);
			} else {
				$widget.removeAttr('href');
			}
			if (value['init-ops'] && value['init-ops'] != null) {
				widgets[key].init(value['init-ops']);
			}
		});
	}


	$(document).ready(function() {
		wloader.start();
	});
})();