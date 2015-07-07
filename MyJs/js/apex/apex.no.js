apex.jQuery(document).ready(function() {
	(function() {
		apex.jQuery('#picked\u002Dcust\u002Dlist_ir').interactiveReport({
			"regionId": "picked-cust-list",
			"toolbar": true,
			"searchField": true,
			"columnSearch": true,
			"rowsPerPageSelect": false,
			"reportsSelect": true,
			"actionsMenu": true,
			"reportViewMode": "REPORT",
			"selectColumns": true,
			"filter": true,
			"rowsPerPage": true,
			"currentRowsPerPage": 15,
			"maxRowsPerPage": "",
			"maxRowCount": "1000000",
			"sort": true,
			"controlBreak": true,
			"highlight": true,
			"compute": true,
			"aggregate": true,
			"chart": true,
			"groupBy": true,
			"pivot": false,
			"flashback": true,
			"saveReport": true,
			"saveDefaultReport": false,
			"reset": true,
			"help": true,
			"helpLink": "wwv_flow_utilities.show_ir_help?p_app_id=21084\u0026p_worksheet_id=34045440143940907062\u0026p_lang=en",
			"download": true,
			"subscription": false,
			"pagination": true,
			"saveReportCategory": false,
			"detailLink": true,
			"isControlPanelCollapsed": false,
			"fixedHeader": "NONE",
			"ajaxIdentifier": "2FAA0EE9B483F3F7F00158ED4ED8E6F4BE0F1DFC4F93D614E43C823BEB0F62DE67BBC0AED8771585AAAB131836C84C32"
		});
	})();
	(function() {
		apex.initDevToolbar([{
			"pageId": "31",
			"typeId": "5110",
			"id": "34045980546511726190",
			"domId": "R34045980546511726190"
		}, {
			"pageId": "31",
			"typeId": "5110",
			"id": "34045440055490907062",
			"domId": "picked-cust-list"
		}, {
			"pageId": "31",
			"typeId": "5130",
			"id": "34224240434553731693",
			"domId": "B34224240434553731693"
		}, {
			"pageId": "31",
			"typeId": "5130",
			"id": "34422671341036269025",
			"domId": "B34422671341036269025"
		}, {
			"pageId": "31",
			"typeId": "5130",
			"id": "34045907342178687024",
			"domId": "B34045907342178687024"
		}, {
			"pageId": "31",
			"typeId": "7040",
			"id": "34201823052636298646",
			"domId": "REQUEST_ID"
		}, {
			"pageId": "31",
			"typeId": "7040",
			"id": "34045440343460907067",
			"domId": "CUSTOMER_NAME"
		}, {
			"pageId": "31",
			"typeId": "7040",
			"id": "34045440449746907068",
			"domId": "SELF_REELASE"
		}, {
			"pageId": "31",
			"typeId": "7040",
			"id": "34045589049032016548",
			"domId": "CONTCAT_NAME"
		}, {
			"pageId": "31",
			"typeId": "7040",
			"id": "34045589154347016548",
			"domId": "CONTACT_EMAIL"
		}, {
			"pageId": "31",
			"typeId": "7040",
			"id": "902227690528048505",
			"domId": "C902227690528048505"
		}, {
			"pageId": "31",
			"typeId": "7040",
			"id": "34045442739035907069",
			"domId": "ACTIVE"
		}, {
			"pageId": "31",
			"typeId": "7040",
			"id": "34045588937275016546",
			"domId": "ROWID"
		}], "FOCUS", {
			"autoHide": "Auto Hide",
			"iconsOnly": "Show Icons Only",
			"noBuilderMessage": "This application was not run from the Application Express Application Builder or the Builder window cannot be found. The Builder will now replace the application in this window.",
			"display": "Display Position",
			"displayTop": "Top",
			"displayLeft": "Left",
			"displayBottom": "Bottom",
			"displayRight": "Right"
		}, 26);
	})();
	(function() {
		apex.da.initDaEventList();
	})();
	(function() {
		apex.da.init();
	})();


	apex.item('picked-cust-list_search_field').setFocus();
});



apex.da.initDaEventList = function() {
	apex.da.gEventList = [ {
		"triggeringElementType": "REGION",
		"triggeringRegionId": "picked-cust-list",
		"bindType": "bind",
		"bindEventType": "apexafterrefresh",
		actionList: [{
			"eventResult": true,
			"executeOnPageInit": true,
			"stopExecutionOnError": true,
			javascriptFunction: function() {
				$('.preview-cust-list-entry').rebindPreviewEvent();
				$('.restart-cust-list-entry').rebindRestartEvent();
				$('.contact-cust-list-entry').rebindContactEvent();

			},
			"action": "NATIVE_JAVASCRIPT_CODE"
		}]
	}];
}