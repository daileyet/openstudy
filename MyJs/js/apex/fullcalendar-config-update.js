/**
 *	FullCalendar Config Objets
 *	@author open-thinks@outlook.com
 *	@since  4/28/2014
 *   @modify 7/9/2014
 **/

function _get(checker, defaultObj) {
	if (checker == undefined || checker == null) {
		return defaultObj;
	}
	return checker;
};

(function(widget, $) {
	var fcc, fccOps;
	widget.fullCalendarConfig = {
		OT_options : {},
		/*
		 *	@params:							default 			required			description

		 options.fc_selector
		 options.ajax_calls															ajax call name, split by semicolon
		 options.level						5
		 options.core
		 options.load_img_url									yes
		 options.$full_calendar														jquery dom object
		 options.exist_ajax_call
		 options._more_link_class_name		ot-more-link
		 options.$more_link
		 options._more_dailog_id				ot-more-dialog
		 options.$more_dialog
		 options._load_img_id				ot-loading-img
		 options.$load_img

		 */
		buildOTOptions : function(options) {
			//TODO initial options and set default value

			var ot_options = {
				fc_selector : (options.fc_selector == undefined ? '#ot-full-callendar' : options.fc_selector),
				exist_ajax_call : (options.ajax_calls == undefined ? false : true),
				_more_link_class_name : 'ot-more-link',
				_more_dailog_id : 'ot-more-dialog',
				$more_link : jQuery('a.ot-more-link'),
				_load_img_id : 'ot-loading-img',
				load_img_url : options.load_img_url,
				$full_calendar : (function(exist) {
					if (!exist) {
						return jQuery('<div id="ot-full-callendar"></div>').appendTo('body');
					}
					return jQuery(options.fc_selector);
				})(jQuery(options.fc_selector).length != 0),
				$more_dialog : (function(exist) {//create read more dialog element if not exist
					if (!exist) {
						return jQuery('<div id="ot-more-dialog"></div>').appendTo('body');
					}
					return jQuery('#ot-more-dialog');
				})(jQuery('#ot-more-dialog').length != 0),
				$load_img : (function(exist) {
					if (!exist) {
						return jQuery('<img id="ot-loading-img" src="' + options.load_img_url + '"/>').appendTo('body');
					}
					return jQuery('#ot-loading-img');
				})(jQuery('#ot-loading-img').length != 0),
				switchOps : true,
				level : 5,
				fcutil : new FC_UTIL(options.fc_selector == undefined ? '#ot-full-callendar' : options.fc_selector)
			};
			/*
			 ot-options.$full_calendar=jQuery('#'+ot-options._full_calendar_id);
			 ot-options.$more_dialog=	jQuery('#'+ot-options._more_dailog_id).length==0?(function(){
			 jQuery('<div id="'+ot-options._more_dailog_id+'"></div>')
			 })():jQuery('#'+ot-options._more_dailog_id);*/

			options.core = _get(options.core, {});
			ot_options.core = {
				header : _get(options.core.header, {
					left : 'prev,next today',
					center : 'title',
					right : 'month,agendaWeek,agendaDay'
				}),
				editable : _get(options.core.editable, false),
				aspectRatio : _get(options.core.aspectRatio, 2.2),
				startParam : _get(options.core.startParam, 'start_date'),
				endParam : _get(options.core.startParam, 'end_date')

			};

			jQuery.extend(true, ot_options, options || {});

			/*
			 ot_options.core.loading=function(isloading,view){
			 fcc.loading(isloading,view);
			 var fun_load=_get(options.core.loading,function(a,b){});
			 fun_load(isloading,view);
			 };
			 ot_options.core.eventSources=_get(options.core.eventSources,[fcc.eventSources]);
			 */
			jQuery.extend(true, ot_options.core, {
				loading : function(isloading, view) {
					fcc.loading(isloading, view);
					var fun_load = _get(options.core.loading, function(a, b) {
					});
					fun_load(isloading, view);
				},
				eventSources : _get(options.core.eventSources, fcc.eventSources(ot_options)),
				eventAfterAllRender : function(evt, element, view) {
					fcc.eventAfterAllRender(evt, element, view);
					var fun_load = _get(options.core.eventAfterAllRender, function(a, b, c) {
					});
					fun_load(evt, element, view);
				},
				eventRender : function(evt, element) {
					fcc.eventRender(evt, element);
					var fun_load = _get(options.core.eventRender, function(a, b) {
					});
					fun_load(evt, element);
				}
			});

			fcc.OT_options = ot_options;
			fccOps = fcc.OT_options;
			return fcc;
		},
		setUpCalendar : function(options) {//the entry of config
			fcc.buildOTOptions(options);

			fcc.setUpLoading();
			//fcc.setUpMoreDialog();
			fcc.OT_options.$full_calendar.fullCalendar(fcc.OT_options.core);

			fcc.setUpOther();
		},
		setUpLoading : function() {
			fcc.showLoading = function() {
				var $container = fcc.OT_options.$full_calendar;
				var calW = $container.width();
				var calH = $container.height();
				var calPos = {
					left : 0,
					top : 0
				};
				calPos = $container.position();
				var l = calPos.left + calW / 2;
				var t = calPos.top + calH / 2;
				fcc.OT_options.$load_img.css('position', 'absolute').css('left', l + 'px').css('top', t + 'px');
				fcc.OT_options.$load_img.show();
			};
			fcc.hideLoading = function() {
				fcc.OT_options.$load_img.hide();
			};
			fcc.hideLoading();
		},
		setUpMoreDialog : function() {
			fcc.OT_options.$more_link = jQuery('a.' + fcc.OT_options._more_link_class_name, fcc.OT_options.$full_calendar);
			fcc.OT_options.$more_link.unbind('click');

			fcc.OT_options.$more_link.click(function(event) {
				//regiester read more link event handler
				var eMargin = 1;
				var top = eMargin + 1;
				var eHeight = 20;
				var existMore = false;
				fcc.OT_options.$more_dialog.empty();
				var sdate1, sdate2, more_date = jQuery(this).data('date');
				sdate1 = ( typeof (more_date) == 'string' ? more_date : jQuery.fullCalendar.formatDate(more_date, 'yyyy-MM-dd'));

				var filters = fccOps.fcutil.filterEvents(fccOps.fcutil.maps.event_more, function(em) {
					var sdate2 = jQuery.fullCalendar.formatDate(em.start, 'yyyy-MM-dd');
					return sdate1 == sdate2;
				});

				jQuery.each(filters, function(i, e) {
					var key = e._key;
					var el = fccOps.fcutil.maps.element[key];
					var elClone = el.clone();
					jQuery(elClone).css("position", "relative").css("display", "block").css("left", "0px").css("overflow", "hidden").css("width", "100%").css("height", eHeight + "px").appendTo(fcc.OT_options.$more_dialog);
					top = top + eHeight + eMargin;
					var tip_content = "<div><div><label>Description:</label>" + (e.description ? e.description : '') + "</div>" + "<div><label>Start Date:</label>" + (e.start ? e.start : '') + "</div>" + "<div><label>End Date:</label>" + (e.end ? e.end : '') + "</div>";
					var $tip = jQuery(tip_content);
					$tip.find("label").css("font-weight", "bold");
					fccOps.fcutil.qtip(elClone, $tip.html());
					existMore = true;
				});
				if (existMore) {
					var height = (top + 3 * eHeight) > 450 ? 450 : (top + 3 * eHeight);
					if ((top + 3 * eHeight) > 450) {
						fcc.OT_options.$more_dialog.css("overflow", "scroll");
						fcc.OT_options.$more_dialog.css("height", (height - 2 * eHeight + 10) + "px");
					} else {
						fcc.OT_options.$more_dialog.css("overflow", "auto");
					}
					fcc.OT_options.$more_dialog.dialog({
						position : [event.pageX, event.pageY],
						width : 400,
						title : 'More Events for ' + sdate1
					});
				} else {
					fcc.OT_options.$more_dialog.css('display', 'none');
				}
			});
		},
		setUpOther : function() {
			var customized_buttons = '<span class="fc-header-space"></span>' + '<span id="ot-hide-btn" class="fc-button fc-state-default fc-corner-left fc-corner-right">' + '<span >Show all</span>' + '</span>';
			jQuery('span.fc-button-today', fcc.OT_options.$full_calendar).after(customized_buttons);
			jQuery('#ot-hide-btn', fcc.OT_options.$full_calendar).hover(function() {
				jQuery(this).addClass('fc-state-hover');
			}, function() {
				jQuery(this).removeClass('fc-state-hover');
			}).click(function() {
				fcc.OT_options.$more_link.css("display", "none");
				fccOps.fcutil.clearCache();
				fcc.OT_options.switchOps = !fcc.OT_options.switchOps;
				fcc.OT_options.$full_calendar.fullCalendar('refetchEvents');
				var btnText = fcc.OT_options.switchOps ? "Show all" : "Shorten";
				jQuery('#ot-hide-btn span', fcc.OT_options.$full_calendar).text(btnText);
			}).qtip({
				content : 'Show/Hide More'
			});

			jQuery(".fc-button-prev", fcc.OT_options.$full_calendar).unbind("click").click(function() {
				fcc.OT_options.$more_dialog.css("display", "none");
				fccOps.fcutil.clearCache();
				fcc.OT_options.$full_calendar.fullCalendar('prev');
			});

			jQuery(".fc-button-next", fcc.OT_options.$full_calendar).unbind("click").click(function() {
				fcc.OT_options.$more_dialog.css("display", "none");
				fccOps.fcutil.clearCache();
				fcc.OT_options.$full_calendar.fullCalendar('next');
			});

			jQuery(".fc-button-today", fcc.OT_options.$full_calendar).unbind("click").click(function() {
				fcc.OT_options.$more_dialog.css("display", "none");
				fccOps.fcutil.clearCache();
				fcc.OT_options.$full_calendar.fullCalendar('today');
			});
		},
		//////////////////////////////////////////////////////////////////////////full-calendar default events handler//////////////////////////////
		loading : function(isloading, view) {

			if (isloading)
				fcc.showLoading();
			else {
				fcc.hideLoading();
				var btnText = fcc.OT_options.switchOps ? "Show all" : "Shorten";
				jQuery('#ot-hide-btn span', fcc.OT_options.$full_calendar).text(btnText);
				if (fcc.OT_options.switchOps) {//if current is shorten, then remove those more events
					fccOps.fcutil.removeMoreEvents();
				}//end remove more events
				if (!fcc.OT_options.switchOps)
					fcc.OT_options.$more_link.css("display", "none");
				else
					fcc.OT_options.$more_link.css("display", "inline");
			}

		},
		eventSources : function(ot_options) {
			var es = [];
			if (ot_options.exist_ajax_call) {
				var ajax_array = ot_options.ajax_calls.split(';');
				for (var index = 0; index < ajax_array.length; index++) {
					var eventObj = {};
					var str_obj = 'eventObj.events=function(start, end, callback){apex.server.process("' + ajax_array[index] + '", {"x01" : start.getTime(),"x02" : end.getTime()}, {"dataType" : "json","success" : function(data) {var events = data;events=fccOps.fcutil.removeDuplicate(events);callback(events);}});}';
					eval(str_obj);
					es.push(eventObj);
				}
			}
			return es;

		},
		eventAfterAllRender : function(event, element, view) {

			if (fcc.OT_options.switchOps) {
				jQuery.each(fccOps.fcutil.maps.event_more, function(key, e) {
					var sMore_date = jQuery.fullCalendar.formatDate(e.start, 'yyyy-MM-dd');
					if (fccOps.fcutil.existMoreEvents(e.start)) {
						var exist_link = $('td[data-date="' + sMore_date + '"]', fcc.OT_options.$full_calendar).has('a.' + fcc.OT_options._more_link_class_name).length > 0;
						if (!exist_link) {
							var $more_link = $('<a class="' + fcc.OT_options._more_link_class_name + '" data-date="' + sMore_date + '" href="javascript:void(0)">more...</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>');
							$('td[data-date="' + sMore_date + '"]', fcc.OT_options.$full_calendar).find("div.fc-day-number").prepend($more_link);
						}
					}
				});
			} else {
				$('a.' + fcc.OT_options._more_link_class_name, fcc.OT_options.$full_calendar).remove();
			}
			fcc.setUpMoreDialog();

		},
		eventRender : function(event, element) {

			fccOps.fcutil.addCache(event, element);
			var tip_content = "<div><div><label>Description:</label>" + (event.description ? event.description : '') + "</div>";
			var $tip = jQuery(tip_content);
			$tip.find("label").css("font-weight", "bold");
			fccOps.fcutil.qtip(element, $tip.html());

		}
	};
	widget.fcc = widget.fullCalendarConfig, fcc = widget.fullCalendarConfig, fccOps = fcc.OT_options;
})(apex.widget, apex.jQuery);

