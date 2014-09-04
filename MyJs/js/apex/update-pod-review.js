/**
 * Upgrade Scheduling - Update Pod Release Review Changes
 * @author dailey.dai@oracle.com
 * @since 15-JUN-2014
 */
(function($, options) {

	var showChanges = function() {
		var $details = $("<div class='update-changes-dialog' title='Update rows'></div>");
		var $table = $("<table class='uReport uReportStandard' style='width:100%;'></table>");

		var headers = ['Customer', 'Pod', 'Wave','Date','Current Release(before)', 'Current Release(after)', 'Status(before)', 'Status(after)'];
		var $tr = $("<tr></tr>");
		for (var i = 0; i < headers.length; i++) {
			$tr.append('<th>' + headers[i] + '</th>')
		}
		$table.append($('<thead></thead>').append($tr));

		var uc = $.parseJSON($v(options.changesContentItem));
		for (var i = 0; i < uc.length; i++) {
			var e = uc[i];
			$tr = $("<tr></tr>");
			for (var j in e) {
				$tr.append('<td>' + e[j] + '</td>');
			}
			$table.append($tr);
		}

		if ($('div.update-changes-dialog').length > 0) {
			$details = $('div.update-changes-dialog');
			$details.empty();
		} else {
			$details.appendTo('body');
		}
		$details.append($table).dialog({
			resizeable : true,
			width : 600,
			height : 400,
			modal : true,
			title : $v(options.changesCountItem) + ' row(s) will be updated'
		});
	}
	$(function() {
		var sCount = $v(options.changesCountItem);
		//		if(sCount=='0' || sCount.trim()==''){
		//		}else{
		//$('<span style="display:none">&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" class="update-changes-link">Review update row(s)</a></span>').appendTo('#apexir_DATA_PANEL td.pagination').show();
		//		}
		$('a.update-changes-link').click(showChanges);
	});

})(apex.jQuery, {
	changesCountItem : 'P72_UPDATE_CHANGES_COUNT',
	changesContentItem : 'P72_UPDATE_CHANGES'
});
