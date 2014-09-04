avaiableDates = {
	stage : [], //stage pod available date
	prod : []//prod pod available date
};
apex.server.process('MANUAL_CAL_UPGRADE_DATE', {
	x01 : $v('P2_UPGRADE_CUST')
}, {
	dataType : 'json',
	success : function(data) {
		avaiableDates = data.avaiables;
	}
});

apex.jQuery.datepicker._defaults.beforeShowDay = function(date) {
	//get avaiable date by ajax
	var sDate = $.datepicker.formatDate('dd-M-y', date).toUpperCase();
   //$.datepicker.parseDate('dd-M-y','26-AUG-14')
	var sType = $v("P2_UPGRADE_TYPE").toLowerCase();
	if (sType.startsWith('stage')) {
		if (avaiableDates.stage.indexOf(sDate) != -1) {
			return [true, 'avaiable-date'];
		}
	}else if(sType.startsWith('prod')){
		if (avaiableDates.prod.indexOf(sDate) != -1) {
			return [true, 'avaiable-date'];
		}
	}

	return [false, ''];

};

///////////////////////////////////////////////////////////////////

apex.server.process('APPLY_CAL_UPGRADE_DATE', {
	x01 : $v('P2_UPGRADE_POD'),
	x02 : $v('P2_UPGRADE_DATE')
}, {
	dataType : 'json',
	success : function(data) {
		//refresh reports
		refreshUpgScheRegion();
	}
});

/////////////////////////////////////////////////////////////////////////////

function showChangeUpgradeDate(pod, type) {
	$s('P2_UPDATE_CONFIRM', null);
	$s('P2_UPGRADE_DATE', null);
	$s('P2_UPGRADE_POD', pod);
	$s('P2_UPGRADE_TYPE', type);
	$("label.upgrade-date-prev").text(pod);
	openModal('upgrade-date-pick');
	$("#upgrade-date-pick").draggable();
	$("#upgrade-date-pick div.uRegionHeading").css({
		cursor : 'default',
		'border-bottom' : '1px solid gray',
		background : '#DDDDDD'
	});
	$("#upgrade-date-pick div.uRegionContent").css("border-bottom", "1px solid gray");
};

var $a = $(this.triggeringElement);
showChangeUpgradeDate($a.data("pod"), $a.data("type"));

