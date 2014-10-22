(function($, options) {

	/**
	 * call ajax process to update upgrade customer into table
	 * @param  sCust   Customer name
	 * @param  sAction SAVE,DELETE
	 * 
	 */
	function _updateUpgCust(sCust, isChecked) {
		var sAction = 'SAVE';
		if (isChecked) {
			sAction = 'SAVE';
		} else {
			sAction = 'DELETE';
		}
		apex.server.process(options.ajaxStoreCustName, {
			x01: sCust,
			x02: sAction
		}, {
			dataType: 'json',
			success: function(data) {
				refreshReport($(options.affectedElement));
			}
		});
	}

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

	//bind click handler for add customer into picked customer list
	$(options.triggerElement).click(function() {
		var $trigger=$(this);
		var sCust = $trigger.data('cust');
		_updateUpgCust(sCust,$trigger.prop("checked"));
	});
	//bind click handler for add all customer in one page
	if ($(options.allTriggerElement).length == 0) {
		$('<input name="UPG_CUST_OPTION_ALL" type="checkbox"/><span>Select/Un-select All</span>').insertAfter($('#apexir_CONTROL_PANEL'));
	}
	$(options.allTriggerElement).click(function() {
		var $trigger = $(this);
		var isChecked = $trigger.prop("checked");
		$(options.triggerElement).prop("checked", isChecked);
		var arrCust=[];
		$(options.triggerElement).each(function() {
			var sCust = $(this).data('cust');
			if($.inArray(sCust,arrCust)==-1){
				arrCust.push(sCust);
			}
		})
		var sCust=arrCust.join(';');
		_updateUpgCust(sCust,isChecked);
	});
	//=====================================================================
	//=====================================================================
	// set primary report customer checkbox checked or not
	$(options.pickedElement).each(function() {
		var scheckCust = $(this).data('cust');
		$(options.triggerElement + '[data-cust="' + scheckCust + '"]').prop("checked", true);
	});

	bindPreviewEvent();

	$.fn.rebindPreviewEvent = function() {
		this.unbind('click').click(function() {
			var scheckCust = $(this).data('cust');
			preview(scheckCust);
		});
	};


})(apex.jQuery, {
	triggerElement: 'input[name="UPG_CUST_OPTION"]',
	allTriggerElement: 'input[name="UPG_CUST_OPTION_ALL"]',
	ajaxStoreCustName: 'STORE_PICKED_CUST',
	ajaxShowEmailName: 'Print_Upgrade_Request_Email',
	affectedElement: '#picked-cust-list',
	pickedElement: '.picked-cust-list-entry'
})