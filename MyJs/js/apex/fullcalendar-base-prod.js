<script>

/**
 * @author dailey.dai@oracle.com
 * @modify 2014/01/28
 * @file   full calendar configure
 * @change add remove duplicate function 2014/07/9
 */

var switchOps = true;
// is hidden more
var fcutil = new FC_UTIL('#open-full-calendar');
function appendEvents() {
	$("#close_read_more").click(function(e) {
		$("#read_more").css("display", "none");
	});

	$('#hide_btn').hover(function() {
		$(this).addClass('fc-state-hover');
	}, function() {
		$(this).removeClass('fc-state-hover');
	}).click(function() {
		$("#read_more").css("display", "none");
		fcutil.clearCache();
		switchOps = !switchOps;
		$('#open-full-calendar').fullCalendar('refetchEvents');
		var btnText = switchOps ? "Show all" : "Shorten";
		$('#hide_btn span').text(btnText);
	}).qtip({
		content : 'Show/Hide More'
	});

	jQuery(".fc-button-prev", $('#open-full-calendar')).unbind("click").click(function() {
		$("#read_more").css("display", "none");
		fcutil.clearCache();
		$('#open-full-calendar').fullCalendar('prev');
	});

	jQuery(".fc-button-next", $('#open-full-calendar')).unbind("click").click(function() {
		$("#read_more").css("display", "none");
		fcutil.clearCache();
		$('#open-full-calendar').fullCalendar('next');
	});

	jQuery(".fc-button-today",$('#open-full-calendar')).unbind("click").click(function() {
		$("#read_more").css("display", "none");
		fcutil.clearCache();
		$('#open-full-calendar').fullCalendar('today');
	});

}

function invokeMore(date, jsEvent) {
	var eMargin = 1;
	var top = eMargin + 1;
	var eHeight = 16;
	var maxHeight= 450;
	var existMore = false;
	var $read_more_body = $("#read_more").find("div.panel-body");
	var $read_more_header = $("#read_more").find("div.panel-heading");
	$read_more_body.empty();
	var sd2 = "";
	if ( typeof (date) == "string")
		sd2 = date;
	else
		sd2 = $.fullCalendar.formatDate(date, 'yyyy-MM-dd');
	$read_more_header.css("padding", "5px");
	$read_more_header.find("div.left").html("<span style='font-weight:bold'>More Events for " + sd2 + "</span>").css({
		"width" : "97%",
		"float" : "left",
		"padding" : "0"
	}); 
	$read_more_header.find("div.right").css("text-align", "right");
	var filters = fcutil.filterEvents(fcutil.maps.event_more, function(em) {
		var sd1 = $.fullCalendar.formatDate(em.start, 'yyyy-MM-dd');
		return sd1 == sd2;
	});
	$.each(filters, function(i, e) {
		var key = e._key;
		var el = fcutil.maps.element[key][0];
		var elClone = el.clone();
		$(elClone).css({
			"position" : "inherit",
			"display" : "block",
			"left" : "0px",
			"overflow" : "hidden",
			"top" : top + "px",
			"width" : "100%"
			//,"height" : eHeight + "px"
		}).appendTo($read_more_body);
		top = top + eHeight + eMargin;
		existMore = true;
		var tip_content = "<div><div><label>Description:</label>" + (e.description ? e.description : '') + "</div>" + "<div><label>Start Date:</label>" + (e.start ? e.start : '') + "</div>" + "<div><label>End Date:</label>" + (e.end ? e.end : '') + "</div>";
		var $tip = $(tip_content);
		$tip.find("label").css("font-weight", "bold");
		fcutil.qtip(elClone, $tip.html());
	});
	if (!jsEvent) {
		jsEvent = window.event;
	}
	if (existMore) {
		$read_more_body.css("padding", "2px");
		$read_more_body.css({
			"overflow":"auto",
			"max-height":"450px"
		});
		$("#read_more").css({
			"display" : "block",
			"background" : "white",
			"left" : jsEvent.pageX + "px",
			"top" : jsEvent.pageY + "px",
			"width" : "450px",
			"z-index" : '10',
			"padding" : "0px"
		}).draggable(); 

	} else
		$("#read_more").css("display", "none");
}


$(document).ready(function() {

	var sEditURL_Template = 'f?p=&APP_ID.:114:&SESSION.::::P114_EVENT_ID,P114_TARGET_PAGEID:#EVENT_ID#,113';

	$('#open-full-calendar').fullCalendar({
		header : {
			left : 'prev,next today',
			center : 'title',
			right : 'month,agendaWeek,agendaDay'
		},
		editable : false,
		loading : function(isLoading) {
			if (isLoading) {
				var $container = $(window);
				var calW = $container.width();
				var calH = $container.height();
				var calPos = {
					left : 0,
					top : 0
				};
				var l = calPos.left + calW / 2;
				var t = calPos.top + calH / 2;
				$('#loading').css('left', l + 'px').css('top', t + 'px');
				$('#loading').show();
			} else {
				$('#loading').hide();
				var btnText = switchOps ? "Show all" : "Shorten";
				$('#hide_btn span').text(btnText);
				if (switchOps)
					fcutil.removeMoreEvents();
				if (!switchOps)
					$("a.more_link").css("display", "none");
				else
					$("a.more_link").css("display", "inline");
			}
		},
		eventSources : [{
			events : function(start, end, callback) {
				apex.server.process('CALL_RUNTIME_EVENTS_MANUAL', {
					"x01" : start.getTime(),
					"x02" : end.getTime(),
					"x03" : $v('P113_FILTER_MODE')
				}, {
					"dataType" : "json",
					"success" : function(data) {
						var events = data;
						events = fcutil.removeDuplicate(events, true);
						callback(events);
					}
				});
			}
		}, {
			events : function(start, end, callback) {
				apex.server.process('CALL_RUNTIME_EVENTS_SQL', {
					"x01" : start.getTime(),
					"x02" : end.getTime(),
					"x03" : $v('P113_FILTER_MODE')
				}, {
					"dataType" : "json",
					"success" : function(data) {
						var events = data;
						events = fcutil.removeDuplicate(events);
						callback(events);
					}
				});

			}
		}],
		eventAfterAllRender : function() {
			$('td[data-date] div.fc-day-number').css("width", "100%").css("float", "right").css("background", "LightGray").css("text-align", "right");
			if (switchOps) {
				$.each(fcutil.maps.event_more, function(key, e) {
					var sMore_date = $.fullCalendar.formatDate(e.start, 'yyyy-MM-dd');
					if (fcutil.existMoreEvents(e.start)) {
						var exist_link = $('td[data-date="' + sMore_date + '"]').has("a.more_link").length > 0;
						if (!exist_link) {
							var $more_link = $("<a class='more_link' onClick=invokeMore('" + sMore_date + "',event)>more...</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>");
							$('td[data-date="' + sMore_date + '"]').find("div.fc-day-number").prepend($more_link);
						}
					}
				});
				$("a.more_link").css("cursor", "pointer");
			} else {
				$("a.more_link").remove();
			}
		},
		aspectRatio : 2.2,
		startParam : 'start_date',
		endParam : 'end_date',
		viewDestroy : function(view, element) {
			$("#read_more").hide();
			//fcutil.clearCache();
		},
		eventRender : function(event, element) {
			//cache event
			fcutil.addCache(event, element);
			//set event hover-overs link
			if(event.url_label && event.url_url){
				if(event.url_label.trim()==''){
				}else{
					$('<BR/>&nbsp;<a target="_blank" href="' + event.url_url + '">'+event.url_label+'</a>').appendTo($('.fc-event-title', element));
				}
			}
			//set edit link for manual event
			var e_ids = event.id.split('_');
			if (e_ids.length == 2 && $v('P113_EDITABLE') != '0') {// manual data source : event id_event type id
				var editLink = sEditURL_Template.replace('#EVENT_ID#', e_ids[0]);
				$('<a href="' + editLink + '">edit</a>').css({
					"float" : "right",
					"margin-right" : "2px"
				}).appendTo($('.fc-event-title', element));
			}
			
			//set event tip
			var tip_content = "<div><div><label>Description:</label>" + (event.description ? event.description : '') + "</div>";
			tip_content = event.specific ? (tip_content + "<div><label>Specific Customer:</label>" + (function() {
				var scustomers = event.specific.split(":");
				var ret = "<ul type='circle'>";
				for (var s in scustomers) {
					ret = ret + "<li>" + scustomers[s] + "</li>";
				}
				return ret + "</ul>";
			})() + "</div>") : tip_content;
			var $tip = $(tip_content);
			$tip.find("label").css("font-weight", "bold");
			fcutil.qtip(element, $tip.html());
		}
	});

	var customer_buttons = '<span class="fc-header-space"></span>' + '<span id="hide_btn" class="fc-button fc-state-default fc-corner-left fc-corner-right">' + '<span >Show all</span>' + '</span>';

	$('span.fc-button-today').after(customer_buttons);

	appendEvents();

});
</script>