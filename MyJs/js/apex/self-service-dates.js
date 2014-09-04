/**
 * Self Service Upgrade Scheduling Controller
 * @author dailey.dai@oracle.com
 * @since 9-JUN-14
 */
(function(options, $) {
	if ( typeof String.prototype.startsWith != 'function') {//Chrome,IE,Opera,Safari
		String.prototype.startsWith = function(str) {
			return this.indexOf(str) == 0;
		};
	}
	var sS = {
		fetchAvailabelDates : function() {
			apex.server.process(options.availablesProcess, {
			}, {
				dataType : 'json',
				success : function(data) {
					sSd.avaiableDates = data.avaiables;
					sSd.avaiableDates._stage = [];
					sSd.avaiableDates._prod = [];
					jQuery.each(sSd.avaiableDates.stage, function(i, val) {
						sSd.avaiableDates._stage[i] = $.datepicker.parseDate(options.dateStyle, val);
					});
					jQuery.each(sSd.avaiableDates.prod, function(i, val) {
						sSd.avaiableDates._prod[i] = $.datepicker.parseDate(options.dateStyle, val);
					});
					var sortF = function(a, b) {
						if (a > b)
							return 1;
						else
							return -1;
					};
					sSd.avaiableDates._stage.sort(sortF);
					sSd.avaiableDates._prod.sort(sortF);
					//invoker fetch current upgrade info
					sS.fetchCustUpg();
				}
			});
			return this;
		},
		fetchCustUpg : function() {
			apex.server.process(options.custUpgradeProcess, {
			}, {
				dataType : 'json',
				success : function(data) {
					sSd.schedules = data.schedules;
					sSd.upgVersion = data.upgVersion;
					sSd.upgRelease = data.upgRelease;
					jQuery.each(sSd.schedules, function(i, val) {
						sSd.schedules[i]._date = $.datepicker.parseDate(options.dateStyle, val.date);
					});
					//render UI
					sS.prepareUI(), sSd.smartUpdateProdDate(), sS.updateUI();
				}
			});
			return this;
		},
		checkAvailable : function(date) {
			var sDate = $.datepicker.formatDate(options.dateStyle, date).toUpperCase();
			var sType = $v(options.selPodTypeItem).toLowerCase();
			var sPod = $v(options.selPodItem).toLowerCase();
			if (sType.startsWith('stage')) {
				if (sSd.avaiableDates.stage.indexOf(sDate) != -1) {
					//TODO complex validations
					return [true, 'avaiable-date'];
				}
			} else if (sType.startsWith('prod')) {
				if (sSd.avaiableDates.prod.indexOf(sDate) != -1) {
					//check timespace 3.5 week
					var stageMinDate = sSd.getMinDate(sSd.schedules, 'stage'), hasMin = (stageMinDate.getFullYear() != 2999);
					if (hasMin) {
						if (stageMinDate < date) {
							var tempDate = new Date(stageMinDate.getTime());
							tempDate.setDate(stageMinDate.getDate() + 25);
							if (tempDate > date) {
								return [true, 'avaiable-date-warning'];
							}
						} else {
							return [false, ''];
						}
					}
					//check region 'Middle East' avaiable date on Thursday rather than Friday
					if (date.getDay() == 5) {
						var schedule = sSd.getSchedule(sPod);
						if (schedule) {
							var sRegion = schedule.region.trim().toLowerCase();
							if (sRegion.indexOf('middle') != -1 && sRegion.indexOf('east') != -1) {
								return [false, ''];
							}
						}
					}

					return [true, 'avaiable-date'];
				}
			}
			return [false, ''];
		},

		/**
		 * @param {object} opt
		 * 	opt.notify=true  : show warning notification and return warning message array
		 * 	opt.notify=false : only check if exist warning, when encounter a warning, stop check and retun string 'fail'; otherwise return 'success' after all checked.
		 */
		checkWarning : function(opt) {
			var model = opt;
			if (model == undefined) {
				model = {
					notify : true
				};
			}
			//check all pods exist date, if not stop and return
			if ($.grep(sSd.schedules, function(element, index) {
				return element.date.trim() == '';
			}).length > 0) {
				if (model.notify) {
					sS.buildNotifyMsg('You are required to select upgrade dates for all your pods.', 'warning', true);
				}
				return 'fail-error';
			}

			var dates = [], warnings = [];
			//check stage pods date are different
			var stages = sSd.getSchedules('stage');
			for (var i = 0; i < stages.length; i++) {
				var e = stages[i];
				if (dates.indexOf(e.date) == -1) {
					dates.push(e.date.toUpperCase());
				}
			}
			if (stages.length != dates.length) {
				if (model.notify) {
					//sS.buildNotifyMsg('There are two stage pods with same upgrade date.', 'warning');
					warnings.push('There are two stage pods with same upgrade date.');
				} else {
					return 'fail-warning';
				}
			}
			//check first stage pod less than prod pod at least 3.5 week
			var minStage = sSd.getMinDate(sSd.schedules, 'stage'), minProd = sSd.getMinDate(sSd.schedules, 'prod');
			if (minStage.getFullYear() != 2999 && minProd.getFullYear() != 2999) {
				var tempDate = new Date(minStage.getTime());
				tempDate.setDate(minStage.getDate() + 25);
				if (tempDate > minProd) {
					if (model.notify) {
						//sS.buildNotifyMsg('The upgrade date of first stage pod should less than prod pod at least 3.5 weeks.', 'warning');
						warnings.push('The upgrade date of first stage pod should less than prod pod at least 3.5 weeks.');
					} else {
						return 'fail-warning';
					}
				}

			}
			//check the end of stage pods must after than prod pod date
			if (stages.length > 1) {
				for (var index in stages) {
					var e = stages[index];
					if (e._date != minStage && e._date <= minProd) {
						if (model.notify) {
							//sS.buildNotifyMsg('The upgrade date of remaining stage pod(s) should after prod pod.', 'warning');
							warnings.push('The upgrade date of remaining stage pod(s) should after prod pod.');
						} else {
							return 'fail-warning';
						}
						break;
					}
				}
			}
			//check at least on stage pod within 6 weeks for prod pod
			for (var i = 0; i < stages.length; i++) {
				var e = stages[i], tempDateA = new Date(e._date.getTime()), tempDateB = new Date(e._date.getTime());
				tempDateA.setDate(tempDateA.getDate() + 6 * 7);
				tempDateB.setDate(tempDateB.getDate() - 6 * 7);

				if (e._date < minProd && tempDateA > minProd) {
					continue;
				}
				if (e._date > minProd && tempDateB < minProd) {
					continue;
				}
				if (model.notify) {
					warnings.push('A maximum of 6 weeks between stage and production pod upgrades.');
				} else {
					return 'fail-warning';
				}
				break;
			}

			if (model.notify) {
				var formatMsg = '';
				if (warnings.length == 1) {
					formatMsg = warnings[0];
				} else {
					for (var i = 0; i < warnings.length; i++) {
						formatMsg = formatMsg + '<li>' + warnings[i] + '</li>';
					}
					formatMsg = '<ul style="font-size:13px;margin-left:15px">' + formatMsg + '</ul>';
				}
				if (warnings.length > 0) {
					sS.buildNotifyMsg(formatMsg, "warning", true);
				}
				return warnings;
			} else {
				return 'success';
			}
		},
		showUpgradeDateSelection : function(pod, type, invoker) {
			$("#" + options.selDateItem).nextAll('img.upgrade-date-error').hide();
			$s(options.selConfirmChkItem, null);
			$s(options.selDateItem, null);
			$s(options.selPodItem, pod);
			$s(options.selPodTypeItem, type);
			$("label.upgrade-date-prev").text(pod);
			openModal('upgrade-date-pick');
			$(options.datePickDialogSel).draggable();
			$("div.uRegionHeading", options.datePickDialogSel).css({
				cursor : 'default',
				'border-bottom' : '1px solid gray',
				background : '#DDDDDD'
			});
			$("div.uRegionContent", options.datePickDialogSel).css("border-bottom", "1px solid gray");

			$("#" + options.selDateItem).datepicker({
				dateFormat : options.dateStyle,
				constrainInput : true
			})

			$("#" + options.selDateItem).datepicker("show");
			$(".avaiable-date-warning").attr("title", "Less than 3.5 weeks after stage pod");
			$(options.datePickBtnSel).unbind('click').click(function() {
				var sDate = $v(options.selDateItem), dateObj;
				try {
					dateObj = $.datepicker.parseDate(options.dateStyle, sDate);
				} catch(e) {
					$("#" + options.selDateItem).nextAll('img.upgrade-date-error').show();
					return;
				}
				sSd.updateSchedule({
					'pod' : pod,
					'type' : type,
					'date' : sDate,
					'_date' : dateObj
				});
				closeModal();
			})
		},
		/**
		 * @param {string} msg : notify message, could be text/html
		 * @param {string} type : value in ['success','warning']
		 * @param {boolean} sigleton : only one instance for each type
		 */
		buildNotifyMsg : function(msg, type, sigleton) {
			var options = {
				success : {
					notifyClass : 'upgrade-success',
					iconClass : 'uCheckmarkIcon',
					notifyMsg : msg
				},
				warning : {
					notifyClass : 'upgrade-warning',
					iconClass : 'uWarningIcon',
					notifyMsg : msg
				},
				ignore : false
			}
			$('div.uMessageText').each(function() {
				if ($(this).html().trim() == msg.trim())
					options.ignore = true;
			});
			if (options.ignore)
				return;
			if ( typeof sigleton == 'boolean' && sigleton == true) {
				//remove existing instance
				$('section.' + options[type].notifyClass).remove();
			}
			var nextTop, $last = $('section.' + options[type].notifyClass + ':last'), nextTop = $last.length == 0 ? 0 : $last.position().top + $last.height() + 2;
			$('<section  class="uRegion uWhiteRegion uMessageRegion clearfix ' + options[type].notifyClass + '" >' + '<div class="uRegionContent clearfix"><a class="uCloseMessage" href="javascript:void(0)"></a><img alt="" class="' + options[type].iconClass + '" >' + '<div class="uMessageText">' + options[type].notifyMsg + '</div></div></section>').appendTo('body').css('top', nextTop + 'px').css('opacity', '0').animate({
				opacity : 1
			}, 1000).find('a.uCloseMessage').click(function() {
				var $section = $(this).parents('section.' + options[type].notifyClass);
				$section.fadeOut('solw', function() {
					$section.nextAll('section.' + options[type].notifyClass).each(function() {
						var nTop = $(this).position().top - $section.height() - 2, nTop = nTop < 0 ? 0 : nTop;
						$(this).animate({
							top : nTop
						}, 800);
					});
					$section.remove();
				});
			});

		},
		showConfirmDialog : function(invoker) {
			$('div.upgrade-date-confirm-dialog').dialog("destroy").remove();
			var warnings = sS.checkWarning();
			var sdialog = '<div class="upgrade-date-confirm-dialog">' + '<div><input type="checkbox" class="upgrade-date-confirm-checkbox" style="margin-left:0"/>' + '<span class="upgrade-date-confirm-content1">I confirm and accept the Release 8 upgrade dates.</span>' + (function() {
				var scontent2, guidelines = '';
				for (var i in warnings) {
					guidelines = guidelines + '<li>' + warnings[i] + '</li>';
				}
				if (warnings.length > 0) {
					scontent2 = '<br><span class="upgrade-date-confirm-content2">I understand that the dates I have selected are outside of the recommended guidelines:</span>';
					scontent2 = scontent2 + '<ul style="margin-left:15px">' + guidelines + '</ul>'
					return scontent2;
				}
				return '';
			})() + '</div></div>';
			var $dialog = $(sdialog).appendTo('body');
			$dialog.dialog({
				resizable : true,
				autoOpen : false,
				title : 'Confirm & accept',
				height : 135 + warnings.length * 40,
				width : 450,
				modal : true,
				position : {
					my : "right top",
					at : "left top",
					of : invoker
				},
				//show: { effect: "drop", duration: 800 },
				open : function(event, ui) {
					$dialog.parent().find('button:last-child').prop('disabled', true);
				},
				buttons : {
					Cancel : function() {
						$(this).dialog("close");
					},
					Submit : function() {
						doSubmit('SAVE_CONFIRM');
					}
				}
			}).find(':checkbox').change(function() {
				if ($(this).prop('checked')) {
					$(this).nextAll('span.upgrade-date-confirm-content1').text('I confirm and accept the Release 8 upgrade dates.(' + $v(options.selConfirmInfoItem) + ')');
					$dialog.parent().find('button:last-child').prop('disabled', false);
				} else {
					$(this).nextAll('span.upgrade-date-confirm-content1').text('I confirm and accept the Release 8 upgrade dates.');
					$dialog.parent().find('button:last-child').prop('disabled', true);
				}
			});
			$dialog.dialog('open');
		},
		updateUI : function() {
			//update upgrade date in ui
			for (var i = 0; i < sSd.schedules.length; i++) {
				var e = sSd.schedules[i], data_id = e.pod + '_' + e.type;
				$(options.dateValInReportSel + '[' + options.dateValIdefintyAttr + '="' + data_id + '"]').text(e.date.toUpperCase());
			}
			//update warning link show/hide
			var checkRet = sS.checkWarning({
				notify : false
			});
			$(options.dateSaveBtnSel).show();
			if (checkRet.startsWith('fail')) {
				$(options.warningLinkSel).parent().fadeIn();
				if (checkRet == 'fail-error') {
					$(options.dateSaveBtnSel).hide();
				}
			} else {
				$(options.warningLinkSel).parent().fadeOut();
			};
		},
		prepareTransferData : function(storeItemName) {
			var transferData = '';
			$.each(sSd.schedules, function(index, item) {
				var eachData = item.pod + ':' + (item.date.trim() == '' ? '-' : item.date);
				transferData = transferData + eachData;
				if (index < sSd.schedules.length - 1) {
					transferData = transferData + ';';
				}
			});
			if (storeItemName) {
				$s(storeItemName, transferData);
			}
			return transferData;
		},
		prepareUI : function() {

			$("#" + options.selDateItem).prop("readonly", true);
			//			.change(function() {
			//				$("#" + options.selDateItem).nextAll('img.upgrade-date-error').hide();
			//			});
			$.datepicker._defaults.beforeShowDay = function(date) {
				return sS.checkAvailable(date);
			};
			$.datepicker._defaults.numberOfMonths = 2;

			$(options.warningLinkSel).unbind('click').click(function() {
				sS.checkWarning();
			});

			$(options.dateSaveBtnSel).unbind('click').click(function() {
				sS.prepareTransferData(options.selTransferItem);
				sS.showConfirmDialog($(this));
			});
		},
		data : {
			avaiableDates : {
				stage : [], //stage pod available date
				prod : []//prod pod available date
			},
			schedules : [{
				pod : '',
				type : '',
				date : '',
				status : '',
				region : ''
			}],
			upgVersion : '', //Upgrade Version
			upgRelease : '', // Upgrade Release
			getSchedule : function(pod) {
				for (var i = 0; i < sSd.schedules.length; i++) {
					var e = sSd.schedules[i];
					if (e.pod.toLowerCase() == pod.trim().toLowerCase()) {
						return e;
					}
				}
				return null;
			},
			getSchedules : function(podType) {
				var retArray = [];
				for (var i = 0; i < sSd.schedules.length; i++) {
					var e = sSd.schedules[i];
					if (e.type.toLowerCase().startsWith(podType)) {
						retArray.push(e);
					}
				}
				return retArray;
			},
			updateSchedule : function(e) {
				$.each(sSd.schedules, function(index, item) {
					if (e.pod == item.pod && e.type == item.type) {
						var modifyItem = sSd.schedules[index];
						for (var i in e) {
							modifyItem[i] = e[i];
						}
						if (e.type.toLowerCase().startsWith('stage')) {
							if (sSd.getMinDate(sSd.schedules, 'prod').getFullYear() == 2999) {
								// if selection is stage pod date and prod pod date is null, set default availiable date
								sSd.smartUpdateProdDate();
							}
						}
						return false;
						//break when find and update
					}
				});
				sS.updateUI();
			},
			/**
			 * filter the minimum date by type
			 * @param {array} dates in [avaiableDates.prod,avaiableDates.stage,schedules]
			 * @param {string} sType 'satge' or 'prod'
			 * @return {date} minimum date
			 */
			getMinDate : function(dates, sType) {
				var minDate = new Date(2999, 1, 1);
				if (!apex.jQuery.isArray(dates) || dates.length == 0) {
					return minDate;
				}
				if (sType == undefined || dates[0].pod == undefined) {// dates in (sSd.avaiableDates._stage,sSd.avaiableDates._prod)
					return dates[0];
				}
				// dates is sSd.schedules
				for (var i = 0; i < dates.length; i++) {
					var e = dates[i];
					if (e.type.toLocaleLowerCase().startsWith(sType) && e.date.trim() != '') {
						if (e._date < minDate) {
							minDate = e._date;
						}
					}
				}
				return minDate;
			},
			smartUpdateProdDate : function() {
				var stageMinDate = sSd.getMinDate(sSd.schedules, 'stage'), prodMinDate = sSd.getMinDate(sSd.schedules, 'prod'), hasStageMin = (stageMinDate.getFullYear() != 2999), hasProdMin = (prodMinDate.getFullYear() != 2999);
				if (hasStageMin && !hasProdMin) {
					for (var i = 0; i < sSd.avaiableDates.prod.length; i++) {
						var date = sSd.avaiableDates._prod[i];
						if (stageMinDate < date) {
							var tempDate = new Date(stageMinDate.getTime());
							tempDate.setDate(stageMinDate.getDate() + 25);
							if (tempDate <= date) {
								$.each(sSd.schedules, function(index, item) {
									if (item.type.toLowerCase().startsWith('prod') && '' == item.date.trim()) {
										sSd.schedules[index].date = $.datepicker.formatDate(options.dateStyle, date).toUpperCase();
										sSd.schedules[index]._date = date;
										return false;
									}
								})
								break;
							}
						}
					}

				}

			}
		}
	}, sSd = sS.data;
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////boot start/////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	$(function() {// run after page load completed
		sS.fetchAvailabelDates();
	});
	this.selfService = sS;
})({
	selPodTypeItem : 'P2_UPGRADE_TYPE',
	selCustItem : 'P2_UPGRADE_CUST',
	selDateItem : 'P2_UPGRADE_DATE',
	selPodItem : 'P2_UPGRADE_POD',
	selTransferItem : 'P2_TRANSFER_DATA',
	selConfirmChkItem : 'P2_UPDATE_CONFIRM',
	selConfirmInfoItem : 'P2_CONFIRM_INFO',
	availablesProcess : 'FETCH_AVAILABLE_UPGRADE_DATE',
	custUpgradeProcess : 'FETCH_CUST_UPGRADE_SCHEDULE',
	dateStyle : 'dd-M-y',
	warningLinkSel : 'div.upgrade-warning-invoker a',
	datePickDialogSel : '#upgrade-date-pick',
	datePickBtnSel : '.date-pick-btn',
	dateValInReportSel : 'span.date-placeholder',
	dateValIdefintyAttr : 'data-id',
	dateSaveBtnSel : '.upgrade-date-save-btn'
}, apex.jQuery);
