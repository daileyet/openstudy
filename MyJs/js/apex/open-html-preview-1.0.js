(
	/**
	 * preview text as html on a new window or dialog.
	 * @author:dailey.dai@oracle.com
	 * @since:2014/10/25
	 * @version: 1.0
	 * 			support URL link as preview resource
	 *          URL template for call APEX ajax process:
	 *				f?p=&APP_ID.:&APP_PAGE_ID.:&SESSION.:APPLICATION_PROCESS=AJAX_CALL_PROCESS_NAME:::PAGE_ITEM_NAME:PAGE_ITEM_VALUE
	 */			 
	function($, options) {
		function getPreview(_options) {
			var $iframe = $('iframe[name="' + _options.name + '"]');
			if ($iframe.length == 0) {
				$('<iframe />', _options).appendTo('body');
				$iframe = $('iframe[name="' + _options.name + '"]');
			} else {

			}
			return $iframe;
		}

		$.fn.preview = function(_options) {
			$(this).css({
				cursor: 'pointer'
			});
			$(this).unbind('click');
			$(this).bind('click', function() {
				var $this = $(this);
				var defaults = {
					name: 'open-previewer',
					scrolling: 'auto',
					dialog: {
						width: 600,
						height: 'auto',
						resizable: true,
						maxWidth: 1024,
						maxHeight: 768,
						open: function() {
							$('iframe[name="' + defaults.name + '"]').css({
								width: '98%',
								height: '100%',
							});
						}
					},
					window: {
						width: 800,
						height: 600,
						top: 100,
						left: 200,
						toolbar: 0,
						status: 0,
						location: 0,
						resizable: 1,
						scrollbars: 1,
						menubar: 0,
						titlebar: 0
					},
					newWindow: false
				};
				if (_options == undefined) {} else {
					$.extend(true, defaults, _options);
				}
				if ($this.data('src')) {
					defaults.src = $this.data('src');
				}

				if (defaults.newWindow) {
					var window_options = (function(ops) {
						var retArray = [];
						for (var ops_property in ops) {
							var item = ops_property + '=' + ops[ops_property];
							retArray.push(item);
						}
						return retArray.join();
					})(defaults.window)
					window.open(defaults.src, '_blank', window_options);
				} else {
					$('iframe[name="' + defaults.name + '"]').remove();
					var $iframe = getPreview(defaults);
					$iframe.dialog(defaults.dialog);
				}
			});
		}
	}
)(apex.jQuery, {});

/*
function openframeLoad(obj) {
	var $iframe = $(obj);
	$iframe[0].height = "";
	$iframe[0].height = $iframe[0].contentWindow.document.body.scrollHeight + "px";
	$iframe[0].width = "";
	$iframe[0].width = $iframe[0].contentWindow.document.body.scrollWidth + "px";
	//	$iframe.dialog('option', 'width', $iframe[0].contentWindow.document.body.scrollWidth);
	//	$iframe.dialog('option', 'height', $iframe[0].contentWindow.document.body.scrollHeight);
}*/