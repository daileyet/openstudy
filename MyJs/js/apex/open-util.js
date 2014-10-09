//** Utilities 
//** Author: open-thinks@outlook.com
//** Current version 1.0 (Mar 22th, 14)
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};

function addSheetFile(path, id) {
	if (jQuery("#" + id).length > 0)
		return;
	var fileref = document.createElement("link");
	fileref.rel = "stylesheet";
	fileref.type = "text/css";
	fileref.href = path;
	fileref.media = "screen";
	fileref.id = id;
	var headobj = document.getElementsByTagName('head')[0];
	headobj.appendChild(fileref);
}

Dates = {
    convert:function(d) {
        // Converts the date in d to a date-object. The input can be:
        //   a date object: returned without modification
        //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
        //   a number     : Interpreted as number of milliseconds
        //                  since 1 Jan 1970 (a timestamp) 
        //   a string     : Any format supported by the javascript engine, like
        //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
        //  an object     : Interpreted as an object with year, month and date
        //                  attributes.  **NOTE** month is 0-11.
        return (
            d.constructor === Date ? d :
            d.constructor === Array ? new Date(d[0],d[1],d[2]) :
            d.constructor === Number ? new Date(d) :
            d.constructor === String ? new Date(d) :
            typeof d === "object" ? new Date(d.year,d.month,d.date) :
            NaN
        );
    },
    compare:function(a,b) {
        // Compare two dates (could be of any type supported by the convert
        // function above) and returns:
        //  -1 : if a < b
        //   0 : if a = b
        //   1 : if a > b
        // NaN : if a or b is an illegal date
        // NOTE: The code inside isFinite does an assignment (=).
        return (
            isFinite(a=this.convert(a).valueOf()) &&
            isFinite(b=this.convert(b).valueOf()) ?
            (a>b)-(a<b) :
            NaN
        );
    },
    inRange:function(d,start,end) {
        // Checks if date in d is between dates in start and end.
        // Returns a boolean or NaN:
        //    true  : if d is between start and end (inclusive)
        //    false : if d is before start or after end
        //    NaN   : if one or more of the dates is illegal.
        // NOTE: The code inside isFinite does an assignment (=).
       return (
            isFinite(d=this.convert(d).valueOf()) &&
            isFinite(start=this.convert(start).valueOf()) &&
            isFinite(end=this.convert(end).valueOf()) ?
            start <= d && d <= end :
            NaN
        );
    }
}


/**
* Used in Apex 
* @param {string} msg : notify message, could be text/html
* @param {string} type : value in ['success','warning']
* @param {boolean} sigleton : only one instance for each type
 */
function buildNotifyMsg(msg, type, sigleton) {
    var options = {
        success: {
            notifyClass: 'open-success',
            iconClass: 'uCheckmarkIcon',
            notifyMsg: msg
        },
        warning: {
            notifyClass: 'open-warning',
            iconClass: 'uWarningIcon',
            notifyMsg: msg
        },
        ignore: false
    }
    $('div.uMessageText').each(function() {
        if ($(this).html().trim() == msg.trim()) options.ignore = true;
    });
    if (options.ignore) return;
    if (typeof sigleton == 'boolean' && sigleton == true) {
        //remove existing instance
        $('section.' + options[type].notifyClass).remove();
    }
    var nextTop, $last = $('section.' + options[type].notifyClass + ':last'),
    nextTop = $last.length == 0 ? 0 : $last.position().top + $last.height() + 2;
    $('<section  class="uRegion uWhiteRegion uMessageRegion clearfix ' + options[type].notifyClass + '" >' + '<div class="uRegionContent clearfix"><a class="uCloseMessage" href="javascript:void(0)"></a><img alt="" class="' + options[type].iconClass + '" >' + '<div class="uMessageText">' + options[type].notifyMsg + '</div></div></section>').appendTo('body').css('top', nextTop + 'px').css('opacity', '0').animate({
        opacity: 1
    },
    1000).find('a.uCloseMessage').click(function() {
        var $section = $(this).parents('section.' + options[type].notifyClass);
        $section.fadeOut('solw',
        function() {
            $section.nextAll('section.' + options[type].notifyClass).each(function() {
                var nTop = $(this).position().top - $section.height() - 2,
                nTop = nTop < 0 ? 0 : nTop;
                $(this).animate({
                    top: nTop
                },
                800);
            });
            $section.remove();
        });
    });
}


/**
 * This function comes from the plugin which author is ana.milos.hr@gmail.com; it reference link:https://apex.oracle.com/pls/apex/f?p=28376:5:0::NO
 * 
 * @param {jQuery Object} affectedElements region
 */
function refreshReport(affectedElements) {

	var paginationType, paginationNot, affectedRegionId, reportId, reportIdPaginate, paginationText, min_row_pag, max_row_pag, max_row, hrefTxt, pos, pagElts, paginationInteractive, hrefAttrStr, maxRowsText, fetchedRows;

	affectedRegionId = (affectedElements[0].id);
	reportId = '#report_' + affectedRegionId;
	reportIdPaginate = affectedRegionId.substr(1);

	paginationInteractive = $("#" + affectedRegionId + " #apexir_WORKSHEET_REGION").length;
	paginationExists = $("" + reportId + ">tbody>tr>td>table>tbody>tr>td>span.fielddata>a").length;
	paginationNot = $("" + reportId + ">tbody>tr>td>table>tbody>tr>td.pagination a").length;

	if (paginationInteractive == '1') {
		paginationType = '0';
	} else {
		if (paginationNot == '0') {
			paginationType = '-1';
		} else {
			if (paginationExists != '0') {
				paginationText = $.trim($("" + reportId + ">tbody>tr>td>table>tbody>tr>td>span.fielddata>b").text());

				if (paginationText.indexOf("-") > 0) {
					paginationType = '1';
				} else {
					paginationType = '4';
				}
			} else {
				paginationExists = $("" + reportId + ">tbody>tr>td>table>tbody>tr>td>span.fielddata>label>select>option:selected").length;
				if (paginationExists != '0') {
					paginationType = '2';
				} else {
					paginationExists = $("" + reportId + ">tbody>tr>td>table>tbody>tr>td>span.fielddata").length;
					paginationText = $.trim($("" + reportId + ">tbody>tr>td>table>tbody>tr>td>span.fielddata").text());
					pagElts = (paginationText.split(' ')).length;
					if (pagElts == '6') {
						paginationType = '3';
					} else {
						if (pagElts == '3') {
							paginationType = '5';
						}
					}
				}
			}
		}
	}

	switch (paginationType) {
		case '0':
			var min_row, rows_fetched, pagination, paginationExists;
			paginationExists = $("#apexir_DATA_PANEL>table>tbody>tr>td>span.fielddata>a").length;
			if (paginationExists == '0') {
				gReport.pull();
			} else {
				pagination = $.trim($("#apexir_DATA_PANEL>table>tbody>tr>td>span.fielddata").text());
				min_row = pagination.split(' ')[0];
				rows_fetched = $("#apexir_ROWS_PER_PAGE_MENU>li.dhtmlSubMenuSelected").text();
				max_row = rows_fetched;
				gReport.navigate.paginate('pgR_min_row=' + min_row + 'max_rows=' + max_row + 'rows_fetched=' + rows_fetched);
			}
			break;
		case '1':
			paginationText = $.trim($("" + reportId + ">tbody>tr>td>table>tbody>tr>td>span.fielddata>b").text());
			maxRowsText = $.trim($("" + reportId + ">tbody>tr>td>table>tbody>tr>td>span.fielddata>a").attr("href"));
			min_row_pag = paginationText.split('-')[0];
			max_row_pag = paginationText.split('-')[1];
			hrefAttrStr = maxRowsText.substring(maxRowsText.indexOf("max:"));
			max_row = hrefAttrStr.substring(4, hrefAttrStr.indexOf(","));
			fetchedRows = parseInt(max_row_pag, 10) - parseInt(min_row_pag, 10) + 1;

			apex.widget.report.paginate('' + reportIdPaginate + '', {
				min : parseInt(min_row_pag, 10),
				max : max_row,
				fetched : fetchedRows
			});
			break;
		case '2':
			paginationText = $.trim($("" + reportId + ">tbody>tr>td>table>tbody>tr>td>span.fielddata>label>select>option:selected").text());
			maxRowsText = $.trim($("" + reportId + ">tbody>tr>td>table>tbody>tr>td>span.fielddata>label>select>option:not(:selected)").val());
			min_row_pag = paginationText.split(' ')[1];
			max_row_pag = paginationText.split(' ')[3];
			hrefAttrStr = maxRowsText.substring(maxRowsText.indexOf("max:"));
			max_row = hrefAttrStr.substring(4, hrefAttrStr.indexOf(","));
			fetchedRows = parseInt(max_row_pag, 10) - parseInt(min_row_pag, 10) + 1;

			apex.widget.report.paginate('' + reportIdPaginate + '', {
				min : parseInt(min_row_pag, 10),
				max : max_row,
				fetched : fetchedRows
			});
			break;

		case '3':
			paginationText = $.trim($("" + reportId + ">tbody>tr>td>table>tbody>tr>td>span.fielddata").text());
			maxRowsText = $.trim($("" + reportId + ">tbody>tr>td>table>tbody>tr>td.pagination>a").attr("href"));
			min_row_pag = paginationText.split(' ')[1];
			max_row_pag = paginationText.split(' ')[3];
			hrefAttrStr = maxRowsText.substring(maxRowsText.indexOf("max:"));
			max_row = hrefAttrStr.substring(4, hrefAttrStr.indexOf(","));
			fetchedRows = parseInt(max_row_pag, 10) - parseInt(min_row_pag, 10) + 1;

			apex.widget.report.paginate('' + reportIdPaginate + '', {
				min : parseInt(min_row_pag, 10),
				max : max_row,
				fetched : fetchedRows
			});
			break;

		case '4':
			paginationText = $.trim($("" + reportId + ">tbody>tr>td>table>tbody>tr>td>span.fielddata>b").text());
			hrefTxt = $("" + reportId + ">tbody>tr>td>table>tbody>tr>td>span.fielddata>b").siblings('a').attr("href");
			maxRowsText = $.trim($("" + reportId + ">tbody>tr>td>table>tbody>tr>td>span.fielddata>a").attr("href"));
			pos = hrefTxt.indexOf('fetched:');
			fetched = hrefTxt.substr(pos);
			hrefAttrStr = maxRowsText.substring(maxRowsText.indexOf("max:"));
			max_row = hrefAttrStr.substring(4, hrefAttrStr.indexOf(","));
			min_row_pag = (parseInt(paginationText, 10) - 1) * max_row + 1;
			fetchedRows = fetched.match(/\d+/g);

			apex.widget.report.paginate('' + reportIdPaginate + '', {
				min : min_row_pag,
				max : max_row,
				fetched : fetchedRows
			});
			break;

		case '5':
			paginationText = $.trim($("" + reportId + ">tbody>tr>td>table>tbody>tr>td>span.fielddata").text());
			maxRowsText = $.trim($("" + reportId + ">tbody>tr>td>table>tbody>tr>td.pagination>a").attr("href"));
			min_row_pag = paginationText.split(' ')[0];
			max_row_pag = paginationText.split(' ')[2];
			hrefAttrStr = maxRowsText.substring(maxRowsText.indexOf("max:"));
			max_row = hrefAttrStr.substring(4, hrefAttrStr.indexOf(","));
			fetchedRows = parseInt(max_row_pag, 10) - parseInt(min_row_pag, 10) + 1;

			apex.widget.report.paginate('' + reportIdPaginate + '', {
				min : parseInt(min_row_pag, 10),
				max : max_row,
				fetched : fetchedRows
			});
			break;

		default:
			var staticIdStr = $('#' + affectedRegionId + " div[id^='report_'][id$='catch']").attr('id');
			$('#' + staticIdStr + '').trigger('apexrefresh');
	}
}
