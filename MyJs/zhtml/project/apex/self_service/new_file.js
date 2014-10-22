(function($, options) {


	function preview(sCust) {
		var preDiv = "upg-preview-to-request";
		var preDivSel = '#' + preDiv;
		var $preview = $('#' + preDiv);
		if ($preview.length == 0) {
			var preCtx = '<div id="' + preDiv + '" title="Preview Upgrade Scheduling Request Email"></div>';
			$(preCtx).appendTo('body');
		}
		$('#' + preDiv).empty();
		$('#' + preDiv).dialog({
			width: 700,
			resizable: true,
			open: function(event, ui) {
				$('<img src="#WORKSPACE_IMAGES#loading.gif" class="loading" />').appendTo(preDivSel);
				$('img.loading').css('position', 'relative')
					.css('top', $(preDivSel).height() / 2 + 'px')
					.css('left', $(preDivSel).width() / 2 + 'px');;
			}
		});
		apex.server.process(options.ajaxShowEmailName, {
			x01: sCust,
		}, {
			dataType: 'text',
			success: function(data) {
				$('img.loading').hide();
				$(data).appendTo($(preDivSel));
			}
		});

	}

	function bindPreviewEvent() {
		$(options.pickedElement).unbind('click').click(function() {
			var scheckCust = $(this).data('cust');
			preview(scheckCust);
		});
	}

	bindPreviewEvent();

	$.fn.rebindPreviewEvent = function() {
		this.unbind('click').click(function() {
			var scheckCust = $(this).data('cust');
			preview(scheckCust);
		});
	};


})(apex.jQuery, {
	ajaxShowEmailName: 'Print_Upgrade_Request_Email',
	pickedElement: '.picked-cust-list-entry'
})