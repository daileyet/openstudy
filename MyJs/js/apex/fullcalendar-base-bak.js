<script>

/**
 * @author dailey.dai@oracle.com
 * @modify 2014/01/28
 * @file   full calendar configure
 * @change add remove duplicate function
 */



var switchOps = true;// is hidden more
var eventsID = {};
// Map for all events by event id
var elemetsID = {};
// Map for all elements nby event id
var events_more = [];
// Make more events
var events_more_id = [];



function clearEvents() {
	eventsID = {};
	elemetsID = {};
	events_more = [];
	events_more_id = [];
}

function existMoreEvents(date) {
	for (var i = 0, j = events_more.length; i < j; i++) {
		var e = events_more[i];
		var sd1 = $.fullCalendar.formatDate(e.start, 'yyyy-MM-dd');
		var sd2 = $.fullCalendar.formatDate(date, 'yyyy-MM-dd');
		if (sd1 == sd2) {
			var els = elemetsID[e.id];
			if (els && els.length > 0) {
				return true;
			}
		}
	}
	return false;
}

function removeMoreEvents() {

	$('#open-full-calendar').fullCalendar('removeEvents', function(e) {
		for (var i = 0, j = events_more.length; i < j; i++) {
			if (events_more[i].id == e.id) {
				return true;
			}
		}
		return false;
	});
}

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
		clearEvents();
		switchOps = !switchOps;
		$('#open-full-calendar').fullCalendar('refetchEvents');
		var btnText=switchOps?"Show all":"Shorten";
		$('#hide_btn span').text(btnText);
	}).qtip({
		content : 'Show/Hide More'
	});

}


function invokeMore(date, jsEvent) {
	var eMargin = 1;
	var top = eMargin+1;
	var eHeight = 20;
	var existMore = false;
	var $read_more_body = $("#read_more").find("div.panel-body");
	var $read_more_header = $("#read_more").find("div.panel-heading");
	$read_more_body.empty();
	
	var sd2="";
	if ( typeof (date) == "string")
			sd2 = date;
		else
			sd2 = $.fullCalendar.formatDate(date, 'yyyy-MM-dd');
	$read_more_header.css("padding","5px");
	$read_more_header.find("div.left").html("<span style='font-weight:bold'>More Events for "+sd2+"</span>")
	.css("width","97%")
	.css("float","left")
	.css("padding","0");
	$read_more_header.find("div.right").css("text-align","right");
	
	for (var i = 0, j = events_more.length; i < j; i++) {
		var e = events_more[i];
		var sd1 = $.fullCalendar.formatDate(e.start, 'yyyy-MM-dd');
		
		if (sd1 == sd2) {
			var els = elemetsID[e.id];
			if (els) {
				for (var k = 0, m = els.length; k < m; k++) {
					var elClone = els[k].clone();
					$(elClone).css("position", "inherit")
					.css("display", "block")
					.css("left", "0px")
					.css("overflow", "hidden")
					.css("top", top+"px")
					.css("width", "100%")
					.css("height", eHeight + "px")
					.appendTo($read_more_body);
					
					top = top + eHeight + eMargin;
					existMore = true;
					
					var tip_content="<div><div><label>Description:</label>"+
					(e.description?e.description:'')+"</div>"+
					"<div><label>Start Date:</label>"+(e.start?e.start:'')+"</div>"+
					"<div><label>End Date:</label>"+(e.end?e.end:'')+"</div>"
					;
					var $tip=$(tip_content);
					$tip.find("label").each(function(){
						$(this).css("font-weight","bold");
					});
					
					//if (e.description && e.description != '')
						elClone.qtip({
							content : $tip.html(),
							position : {
								corner : {
									tooltip : 'bottomMiddle',
									target : 'topMiddle'
								}
							},
							style : {
								border : {
									width : 1,
									radius : 3
								},
								padding : 2,
								textAlign : 'left',
								tip : true, // Give it a speech bubble tip with automatic corner detection
								name : 'cream' // Style it according to the preset 'cream' style
							}
						});
				}
			}
		}
	}
	if (!jsEvent) {
		jsEvent = window.event;
	}
	if (existMore) {		
		$read_more_body.css("padding","2px");
		var height=(top + 3 * eHeight)>450?450:(top + 3 * eHeight);
		if((top + 3 * eHeight)> 450){
			$read_more_body.css("overflow","scroll");
			$read_more_body.css("height", (height-2*eHeight+10)+ "px");
			//$read_more_body.css("height", "auto");
		}else{
			$read_more_body.css("overflow","auto");
		}
		
		$("#read_more").css("display", "block")
		.css("background", "white")
		.css("left", jsEvent.pageX + 'px')
		.css("top", jsEvent.pageY + 'px')
		.css("width", "450px")		
		.css("height", height+"px")
		.css("z-index", '10')
		.css("padding", "0px")
		.draggable();

	} else
		$("#read_more").css("display", "none");
}

var keyManual=function(e){
	return e.id;
}

var keyDynamic=function(e){
	function getCodes(str){
	  var charArr=str.split(''),codeArr=[];
	  for(var i in charArr){
	    var code=charArr[i].charCodeAt(0);
	    codeArr[i]=code;
	  }
	  return codeArr.join('');
	}
	var sKey='';
	var parts=['id','start','end','title','description'];
	for(var i in parts){
		var part=parts[i];
		var eVal=e[part];
		if(eVal==undefined){
		}else{
			if(part=='id'){// id:'0_8_51'
				eVal=eVal.substr(0,eVal.lastIndexOf('_'));
			}
			sKey=sKey+eVal;
		}
	}
	return getCodes(sKey);
}

function removeDuplicate(events,fnKeyGen){
	var eSet={},eArr=[];
	$.each(events,function(i,e){
		var key=fnKeyGen.call(this,e);
		eSet[key]=e;
	});
	$.each(eSet,function(key,value){
		eArr.push(value);
	});
	return eArr;
}

$(document).ready(function() {
	
	var sEditURL_Template='f?p=&APP_ID.:114:&SESSION.::::P114_EVENT_ID,P114_TARGET_PAGEID:#EVENT_ID#,113';
	
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
				//$('#open-full-calendar')
				var calW = $container.width();
				var calH = $container.height();
				var calPos = {
					left : 0,
					top : 0
				};
				//$container.position();
				var l = calPos.left + calW / 2;
				var t = calPos.top + calH / 2;
				$('#loading').css('left', l + 'px').css('top', t + 'px');
				$('#loading').show();
			} else {
				$('#loading').hide();
				var btnText=switchOps?"Show all":"Shorten";
				$('#hide_btn span').text(btnText);
				if (switchOps)
					removeMoreEvents();

				if (!switchOps)
					$("a.more_link").css("display", "none");
				else
					$("a.more_link").css("display", "inline");
			}
		},

		eventSources : [
		{
            events : function(start, end, callback) {
				apex.server.process('CALL_RUNTIME_EVENTS_MANUAL', {
					"x01" : start.getTime(),
					"x02" : end.getTime(),
                    "x03" : $v('P113_FILTER_MODE')
				}, {
					"dataType" : "json",
					"success" : function(data) {
						var events = data;
						events=removeDuplicate(events,keyManual);
						callback(events);
					}
				});

			}
		}, 
		{
			events : function(start, end, callback) {
				apex.server.process('CALL_RUNTIME_EVENTS_SQL', {
					"x01" : start.getTime(),
					"x02" : end.getTime(),
                    "x03" : $v('P113_FILTER_MODE')
				}, {
					"dataType" : "json",
					"success" : function(data) {
						var events = data;
						events=removeDuplicate(events,keyDynamic);
						callback(events);
					}
				});

			}
		}],
		eventAfterAllRender : function() {
			var date_has_more = [];
			$('td[data-date] div.fc-day-number').css("width","100%").css("float","right").css("background","LightGray").css("text-align","right");
			for (var i = 0, j = events_more.length; i < j; i++) {
				var e = events_more[i];
				if (!e.start)
					continue;
				var sMore_date = $.fullCalendar.formatDate(e.start, 'yyyy-MM-dd');
				if (date_has_more.indexOf(sMore_date) != -1)
					continue;
				if (!existMoreEvents(e.start))
					continue;
				var exist_link = $('td[data-date="' + sMore_date + '"]').has("a.more_link").length > 0;
				if (exist_link)
					continue;
				var $more_link = $("<a class='more_link' onClick=invokeMore('" + sMore_date + "',event)>more...</a><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>");
				$('td[data-date="' + sMore_date + '"]').find("div.fc-day-number").prepend($more_link);
				date_has_more.push(sMore_date);
			}
			$("a.more_link").css("cursor", "pointer");
		},
		aspectRatio : 2.2,
		startParam : 'start_date',
		endParam : 'end_date',
		viewDestroy : function(view, element) {
			$("#read_more").css("display", "none");
			clearEvents();
		},
		eventRender : function(event, element) {
			//cache event
			if (eventsID[event.id]) {
				if (eventsID[event.id].indexOf(event) == -1) {
					eventsID[event.id].push(event);
					elemetsID[event.id].push(element.clone());
				}
			} else {
				eventsID[event.id] = [];
				eventsID[event.id].push(event);
				elemetsID[event.id] = [];
				elemetsID[event.id].push(element.clone());
			}
			if (event.level && event.level > 5) {
				if (events_more.indexOf(event) == -1) {
					events_more.push(event);
					events_more_id.push(event.id);
				}
			}
			//TODO set event hover-overs link 
			
			//set edit link for manual event
			var e_ids=event.id.split('_');
			if(e_ids.length==2 && $v('P113_EDITABLE')!='0'){// manual data source : event id_event type id
				var editLink=sEditURL_Template.replace('#EVENT_ID#',e_ids[0]);
				$('<a href="'+editLink+'">edit</a>').css({
					"float":"right",
					"margin-right":"2px"
				}).appendTo($('.fc-event-title',element));
			}
			
			//set event tip
			var tip_content="<div><div><label>Description:</label>"+
					(event.description?event.description:'')+"</div>"
					//+"<div><label>Start Date:</label>"+(event.start?event.start:'')+"</div>"+
					//"<div><label>End Date:</label>"+(event.end?event.end:'')+"</div>"
					;
			
			tip_content=event.specific?(tip_content+"<div><label>Specific Customer:</label>"+
			(function(){
				var scustomers=event.specific.split(":");
				var ret="<ul type='circle'>";
				for(var s in scustomers){
					ret=ret+"<li>"+scustomers[s]+"</li>";
				}
				return ret+"</ul>";				
			})()
			+"</div>"):tip_content;
				
			var $tip=$(tip_content);
			$tip.find("label").each(function(){
						$(this).css("font-weight","bold");
			});
			
			//if (event.description && event.description != '')
				element.qtip({
					content : $tip.html(),
					position : {
						corner : {
							tooltip : 'bottomMiddle',
							target : 'topMiddle'
						}
					},
					style : {
						border : {
							width : 1,
							radius : 3
						},
						padding : 2,
						textAlign : 'left',
						tip : true, // Give it a speech bubble tip with automatic corner detection
						name : 'cream' // Style it according to the preset 'cream' style
					}
				});
		}
	});


	var customer_buttons = '<span class="fc-header-space"></span>' 
	+ '<span id="hide_btn" class="fc-button fc-button-next fc-state-default fc-corner-left fc-corner-right">'
    + '<span >Show all</span>' 
    + '</span>';

	$('span.fc-button-today').after(customer_buttons);

	appendEvents();

});
</script>