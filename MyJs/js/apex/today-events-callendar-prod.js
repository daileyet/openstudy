/**
 *@author:dailey.dai@oracle.com
 *@desc: fetch today's calendar events
 *@since: 2014/7/7
 *@modify:
 * 2014/8/5 
 * 2014/11/18
 * 		fix PST region date problem
 * 		add directly more region
 */
(function($,options) {
	options.loadImg = '<img class="fc-content-loading" style="position:relative;display:none;left:50%;margin-left:-15px;" src="data:image/gif;base64,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" />';
	options.preImg = '<img class="pre-day-event"  title="previous day" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACtUlEQVRogc3ZXY6iQBQF4AICiIiAtijQ/AgK8mMBvYFZQi+BpcwSXAJLYgmzhFrCnYeJSXcypiozD9yTfO/nxGAVSsiC+fj4mIZhmLMss5fs8U/p+34ahgGGYYC+79kwDN3SnYRDKX30fQ9fdV3HKKXj0t24oZSOXdfBK5TSn0t3fBlK6UgpBZ77/T6hey7quv683+8gom1bXA920zRd27asbVvgaZoGV/miKLqmaVjTNMBT1zWu8lVVJXVds7quQQCu8lmW2VVVzVVVAc/tdvuFrnxZlvPtdgOesixZURS4DrGiKOayLIGnKAp85a/X63S9XoHncrngK5/n+XS5XIAnz3N2Pp9xlc+y7JHnOYhI0/TH0n2/JU3TMcsyEJHnOa4LW5qm4/l8BhFpmuIqH0XRZ5qmICKOY1zlwzDskiRhSZIAD8rycRyzOI6BJ4qix9J9v8X3/SSKIhZFEQiYlu77La7r2mEYzu/v78AThiG+8kEQzGEYAk8QBLjKE0JIEARzEAQgAF95QgjxfX/2fR94TqcTzgGu69rH43E+nU7A43ke3hGe583H4xF40I5wHCc5HA7M8zzgORwOaEd0+/2evb29gQBcB9kzjuN0u92O7fd7EIDrKvGM4zifu90ORDiOg3bE6LouiEA7wrKs0XEcEGFZFs4R2+32Yds2iNhsNrheKZ+xLGvabrcggJmmieul/hnLsibLskAA3hGmac6bzQYEoB1hr9fr2TRNEIB7xHq9Bh7DMH4RQvD8uPvMarVKDMNghmGAgJlgHKGqaqfrOlutVsCj6zreEZqmMV3XgUfTNJwjFEX51DQNRKiqOi/d969RFGVUVRUETATjp0DInxGKosArsizj/aP7GVmWH7Isw1eSJDFFUXBe9F5kkiQJJEkCQggjhKA8zHiZCCH/9a3zG8xTbRA6pdVnAAAAAElFTkSuQmCC"/>';
	options.nextImg = '<img class="next-day-event" title="next day" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACw0lEQVRogdXX3Y2jShAF4MIIsN38tI2NbRg8uPGADTY/k8CGcEMglA1hQiAkQtgQOoS6D6uVVju7t1vaB+oe6Xu1TknIHAD+IkKIoO/76f39ffyb35klfd+3XdfJvu+x73vsuu7/c0TTNEPbtrLrOvxZ0zQfc3dTpmmar23b4p80TTPM3fG3EUIEz+dzbJoGNdA7QggRPB6P6fl8oo6qqv6Zu/OnCCGCuq6nx+OBGmRd1+3cnT9FCBFUVTXVdY0aZFEUdI+oqgo1yPv9/jp3508RQgS32+3b/X5HDZMQIpi786cURdGWZSlvtxuqlGVJ94iiKGRZlqhSFMU0d9/fpiiK9nq9yre3N9RAc3JcLpc2z3N5vV5RJc9zmkdkWfYlz3PUIYSguZvyPB+EEKgjyzJ6kwMAIMuy4XK5oA6yR5zP5yHLMtSRpim93QTw/YjX11fUIJMkoTc5AADSNP04n8+ogfQRY5qmqEGeTid6uwkAIEmS8eXlBVWSJJk2mw29yQEAEMfxmCQJqsRxTPuIOI5RA83ddDwex9PphBroHRBF0Xg8HlHlcDjQe4SiKBoPhwOqRFFEr/x+vx+jKEKV/X4vOee0/kZ3u93HbrdDlTAMJeec1ossDMMhDENU2W639Mpzzoftdos6OOe0xhznfNhsNqiDc05rTnueN3DOUYfnebTKu677JQgC1OH7Pq1PSsZY6/u+9H0fVTzPo/VRzxhrPc+TnuehBnrlXdeVruuiCmOM1r5hjLWMMckYQ5X1ej0BAKmJEKxWq2/r9Ro1kCw/rVYr1CCXyyWpfRM4jjMtl0tUcRxHWpZFaiIEtm1PjuOgim3b5MqDZVmTbduowzRNWvsGAALLskbLslDFNE1aE+HnLBaLr6Zp4n+gW/5HTNMcDMOQi8UCf0Fr3yjSAoA0DAMNw0AAoDURNBMAwAQzlv8XiuBtEM7RRnUAAAAASUVORK5CYII="/>';

	options.closeImg = '<img class="ot-fw-close" title="close" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAD/klEQVRIS5VWW2gUVxg+/8zOmsiauDZito2iMe2kbGMMydZuZ8XLRhb7UMH2Kb6UWvoqtKDkoaIWEUTEJyFCg30pCBaaQqRt2izBEONlTWIICSbEbbFSghIL0pfdPcfvnNmZ7GxmsJ4QOJf//77/8p0zS+wVI5PJxMJEH5Oud8N0K/4bBGMvGFFecH6PFwoDN4aGprCP7dWDgvAP7t3bpNfWnsH5EXga0q7S2EEjIsE4zxVLpd5fhob+qMbzJch0dx/SNK0fxlHHgDTN1xZZCEkmiUqi1Pf02fKxXC5XcIhWOR1Ip4/pRBcFEyQPifyBqyPlgsNFOVx/urx8xCHxEOzbvTsTMkI/w9BARIHlCyqrwJCtEIyu/p7Nfu4payqViq7RaA4RbFQHMmfl4B0OcdCZ2scfF8XD2ZtjA26U+yzrpCB2yimLAwDAPs7Yr9i/zIRorKTzO5MByHIRo/ns6GirIkgmm2oNtjmPomz0RkjfjYyNfSklaFldZkiEhzGNKRLBLo3cuvW1nCWTyVaD2H2A1TiZywDRlYxNkEikdY1+w0Keqz1pgDB6R8fvnFdwGFZXl6kZoWGsrt0cH//KycYyzXUUXf8narre8Ye2pEr6FNiHnR0nGGnnIE23ZGX5QW68Z+zexI8OWCIRb7x7d+afSnBRFxkEaUrG5hJAvlhMKcAPdu7sZxr7rFKSKkF7FDDvuT3xwCVxwOPxeKRuTfgGepqSe15/mQG9UAS72tv6QQcCrzSdRgOgUCzy9ydmZuST4I5Ee9s1xPypwg7wVQSdbfErmHzhZ6SUTfzS/elZt+YOww7TNI0wesJYzFbfSoAqOKJ/FUFH/N0TeFHOVRsoQUMtk7Nzq8ArSUI6ZRFHI7JxSWyNlHvQ0dqyRzBNRuKmKlXAuPh+6uG8vJGqH2ZDw7qaNzb8hPZcfjA/7/Zkx/bt72mGdgfuSqbSVhHgDjmqMdrfacljL1YpM1j1Ti8sKplK8HC0bhAgFtZFXhI9M4uLikSdbaiHTJmSabl38rqlXVm2NW89yYlO2WqAkS2zQgkK+q8ohiMhTV57pRY1PGc6zqCkskwlAQQ/Ob3wqNMlkFHokbWTqMU2G2HlGVKPpIurIUJXwvYD6jlT75es7/65/OMRz4tpbnnTgpaH4W9/YKqk50YfMLGVw3Cl6MLsX4+PK4xq27ebYp+g+z8gyv9NsvKyKh1df/j3kx7ZJ18Cudn81qY0cYYvmtjsVCooG/fV1QjPiji78GTp28r6Bn5UttTXR0M1xjeo5lEUNeKXbTl76J0NCKaffrS05LnpgRlUlq0BzY8Q/whXzkL6LVLrZRHksc6JQmkw//x5Pqg/r/1ZLGfi+xPFj+QlLbfSju5ajBkAAAAASUVORK5CYII=" />';

	var fc_te = {
		events: [],
		utilObj:new FC_UTIL(options.containerSel),
		fetchEvents: function(start, end) {
			var events = [];
			UTC_start = start;
			var UTC_end = end;
			var today = new Date();
			if (today.getTimezoneOffset() === 480) {//PST time zone
				UTC_start = new Date(start.getFullYear(), start.getMonth(), start.getDate() - 1);
				UTC_end = new Date(end.getFullYear(), end.getMonth(), end.getDate() - 1);
			}

			apex.server.process(options.call_process, {
				"x01": UTC_start.getTime(),
				"x02": UTC_end.getTime()
			}, {
				"dataType": "json",
				"success": function(data) {
					fc_te.events = fc_te.utilObj.removeDuplicate(data);;
					$(options.containerSel + ' img.fc-content-loading').hide();
					fc_te.renderUI(start);
				}
			});
		},
		goToday: function() {
			$s(options.selDateItem, $.datepicker.formatDate(options.dateStyle, new Date()));
		},
		renderEvent: function(e) {
			var $today = $('.fc-te');

		},
		renderUI: function(today) {

/*******************************************No code format**************************************************************/
			var sToday = '<div class="fc-te" style="display:table-cell;width:100%;">' 
						+ '<div class="fc-day-header fc-widget-header" style="width: 100%;text-align:center;"></div>' 
						+ '<div data-date="" class="fc-day fc-widget-content fc-today fc-state-highlight" style="width: 100%;">' 
						+ '<div>' 
						+ '<div class="fc-day-number" style="width: 100%; float: right; background: none repeat scroll 0% 0% LightGray; text-align: right;">4</div>' 
						+ '<div class="fc-day-content" style="padding:2px;min-height:170px;">' + options.loadImg + '</div></div>' 
						+ '</div></div>'

			sToday = 
			'<div class="fc-te-all" style="width:100%">'
			+ '<div style="display:table-cell;vertical-align:middle;" class="nav-pre">' + options.preImg + '</div>' 
			+ sToday 
			+ '<div style="display:table-cell;vertical-align:middle;" class="nav-next">' + options.nextImg + '</div>' 
			+ '</div>';
/********************************************************************************************************************/
			var $today = $('.fc-te');
			if ($today.length == 0) {
				$today = $(sToday).appendTo(options.containerSel);
			}

			if (!options.enableNav) {
				$(".nav-pre,.nav-next", $today).remove();
				$(".fc-te", $today).css("display", "block");
			}

			if (today.getDate() == new Date().getDate()) {
				$(options.containerSel + ' .fc-day').addClass('fc-today').addClass('fc-state-highlight').removeClass('fc-past');
			} else {
				$(options.containerSel + ' .fc-day').removeClass('fc-today').removeClass('fc-state-highlight').addClass('fc-past');
			}
			$(options.containerSel + ' .fc-day').data('date', $.datepicker.formatDate('yy-mm-dd', today));
			$(options.containerSel + ' .fc-day-content div').remove();
			$(options.containerSel + ' .fc-day-header').html('<span class="pre-day-event"> < </span>' + fc_te.week[today.getDay()] + ',' + $.datepicker.formatDate('MM dth yy', today) + '<span class="next-day-event"> > </span>')
				//			$(options.containerSel + ' .fc-day-number').html(today.getDate() + '&nbsp;');
			$(options.containerSel + ' .fc-day-number').html('&nbsp;');

			/**
			 * regiest handler for 'previous' and 'next' day navigation bar
			 */
			$today.find('.pre-day-event').css('cursor', 'pointer').css('opacity', '0.5').click(function() {
				var currentDay = $.datepicker.parseDate(options.dateStyle, $v(options.selDateItem));
				var preDay = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate() - 1);
				$s(options.selDateItem, $.datepicker.formatDate(options.dateStyle, preDay));
				fc_te.updateUI();
			}).mouseover(function() {
				$(this).css('opacity', '1');
			}).mouseout(function() {
				$(this).css('opacity', '0.5');
			});
			$today.find('.next-day-event').css('cursor', 'pointer').css('opacity', '0.5').click(function() {
				var currentDay = $.datepicker.parseDate(options.dateStyle, $v(options.selDateItem));
				var nextDay = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate() + 1);
				$s(options.selDateItem, $.datepicker.formatDate(options.dateStyle, nextDay));
				fc_te.updateUI();
			}).mouseover(function() {
				$(this).css('opacity', '1');
			}).mouseout(function() {
				$(this).css('opacity', '0.5');
			});//---end regisest navigation bar handler
			
			/************************************ add events for today**********************************/

			if (fc_te.events.length > options.max_event_count) {
				$('.fc-day-number', $today).prepend('<a class="more-event-link" href="' + options.details_link + '" title="See more details" class="more_link" style="cursor: pointer; display: inline;font-weight:bold;color:black;text-decoration:none;margin-right:8px;">more...</a>');
			}

			$today.find('.more-event-link').click(function() {
				
				$('.ot-fw')
				.css({
					top:$(this).offset().top+$(this).height(),
					left:$(this).offset().left
				})
				.show();

			}).attr('href', 'javascript:void(0)');


			for (var i = 0; i < fc_te.events.length; i++) {
				var e = fc_te.events[i];
				var $eventHolder=$('.fc-day-content', $today);
				if (i >= options.max_event_count) {// process the events which exceed max number
					var $morePanel=$('.ot-fw');
					if($morePanel.length==0){//create more window region
						
						/**
						 *  default more region css
						.ot-fw {
							max-width: 400px;
							border: 1px solid gray;
							min-height: 200px;
							min-width: 300px;
							position: absolute;
							z-index: 999;
							box-shadow: 2px 2px 10px 1px lightgray;
							border-radius: 3px;
							background: white;
							padding: 1px;
						}
						
						.ot-fw-close {
							margin-top: -12px;
							margin-left: -12px;
							left: 100%;
							cursor: pointer;
							border-radius: 15px;
							background-color: white;
							position: absolute;
						}
						
						.ot-fw-header {
							cursor: move;
							background-color: #DDD;
							background-image: linear-gradient(#F0F0F0, #DDD);
						}
						
						.ot-fw-title {
							display: table-cell;
							vertical-align: middle;
							font: bold 12px/24px "Helvetica Neue", Helvetica, Arial, sans-serif;
							text-shadow: 0px 1px 0px rgba(255, 255, 255, 0.75);
							padding: 0px 0px 0px 8px;
							color: #333;
						}
						
						.ot-fw-content {
							width: 100%;
							max-height: 380px;
							overflow-y: auto;
						}
						* */
						
						var sMorePanel=
						'<div class="ot-fw" style="display: none;" >'
						+'<div class="ot-fw-header">'
						+ options.closeImg
						+'<span class="ot-fw-title">'
						+ 'More Events for '+$.datepicker.formatDate('MM dth yy', today)
						+'</span>'
						+'</div>'
						+'<div class="ot-fw-content">'
						+'</div>'
						+'</div>';
						$(sMorePanel).appendTo('body');
						$morePanel=$('.ot-fw');
						$morePanel.draggable({ cancel: '.ot-fw-content' });
						$('.ot-fw-close',$morePanel)
						.click(function(){
							$morePanel.hide();
						});
					}
					$eventHolder=$('.ot-fw-content');
				}
				
				var sEvent = 
				'<div style="background-color:' + e.backgroundColor + '; border-color: ' + e.borderColor + '; color: ' + e.textColor + '; width: 100%;" id="' + e.id + '" class="fc-event fc-event-hori fc-event-start fc-event-end">'
				+ '<div class="fc-event-inner">' 
				+ '<span class="fc-event-title">' + e.title + '</span>' 
				+ '</div>' 
				+ '</div>';
				
				// add qtip
				var tip_content = "<div><div><label>Description:</label>" + (e.description ? e.description : '') + "</div>";
				tip_content = e.specific ? (tip_content + "<div><label>Specific Customer:</label>" + (function() {
					var scustomers = e.specific.split(":");
					var ret = "<ul type='circle'>";
					for (var s in scustomers) {
						ret = ret + "<li>" + scustomers[s] + "</li>";
					}
					return ret + "</ul>";
				})() + "</div>") : tip_content;
				var $tip = $(tip_content);
				$tip.find("label").each(function() {
					$(this).css("font-weight", "bold");
				});
				$(sEvent).appendTo($eventHolder)
				.qtip({
					content: $tip.html(),
					position: {
						corner: {
							tooltip: 'bottomMiddle',
							target: 'topMiddle'
						}
					},
					style: {
						border: {
							width: 1,
							radius: 3
						},
						padding: 2,
						textAlign: 'left',
						tip: true, // Give it a speech bubble tip with automatic corner detection
						name: 'cream' // Style it according to the preset 'cream' style
					}
				});//----end add qtip
				
				
				
			}//-----------end add events for today

		},
		week: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saterday'],
		updateUI: function() {
			var today =
				//new Date();
				$.datepicker.parseDate(options.dateStyle, $v(options.selDateItem));
			var start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
			var end = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);


					
			$(options.containerSel + ' .fc-day-content div').remove();
			$(options.containerSel + ' img.fc-content-loading').show();
			$('.ot-fw-title').text('More Events for '+$.datepicker.formatDate('MM dth yy', today));
			
			$('.ot-fw-content').empty()
			$('.ot-fw').hide();
			
			fc_te.fetchEvents(start, end);

		}
	};
	this.fc_te = fc_te;

	$(function() {
		var today = new Date();
		$s(options.selDateItem, $.datepicker.formatDate(options.dateStyle, today));
		fc_te.renderUI(today);
		fc_te.updateUI();
	});

})(apex.jQuery,{
	dateStyle: 'mm/dd/yy',
	containerSel: '#events-container',
	call_process: 'FETCH_TODAY_EVENTS',
	selDateItem: 'P1_EVENT_DATE',
	max_event_count: 7,
	details_link: 'https://apex.oraclecorp.com/pls/apex/f?p=17346:113:::NO:::',
	enableNav: false
})

//#WORKSPACE_IMAGES#event_today.js