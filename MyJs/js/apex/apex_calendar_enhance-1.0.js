/**
 * apex 4.2 calendar componment enhancement
 * @author dailey.dai@oracle.com
 * @since  2014/10/27
 * @feature 
 * 			1. pre-defined event type and customize its css property
 * 			2. pre-defined event include special text and customize its css property
 * 
 * @example 
 *  $('#my-calendar').eventEnhance({
		eventTypes: {
			R7: {
				'background-color': 'red',
				color: 'white'
			},
			R8: {
				'background-color': 'green',
				color: 'white'
			}
		},
		specialEvents: [{
			includeText: 'OO',
			css: {
				'background-color': 'yellow'
			}
		}, {
			includeText: 'AOO',
			css: {
				'background-color': 'blue',
				color:'white'
			}
		}]
	});
 */
(function($, options) {
	$.fn.eventEnhance = function(configure) {
		var $this = $(this);
		var defaults = {
			eventTypes: {},
			specialEvents: [],
			defaultIncludeTextParent: 'a',
			eventTypeAttribute: 'class'
		};

		if (configure != undefined) {
			$.extend(true, defaults, configure);
		}
		//process defined event type
		for (var event_type_name in defaults.eventTypes) {
			var attributeValue = event_type_name;
			var eventCss = defaults.eventTypes[attributeValue];
			if (defaults.eventTypeAttribute == 'class') {
				$('.' + attributeValue, $this).css(eventCss);
				$('.' + attributeValue, $this).parent('a').css(eventCss);
			} else {
				$('[' + defaults.eventTypeAttribute + '="' + attributeValue + '"]', $this).css(eventCss);
				$('[' + defaults.eventTypeAttribute + '="' + attributeValue + '"]', $this).parent('a').css(eventCss);
			}

		}
		//process event include special text
		for (var i = 0, j = defaults.specialEvents.length; i < j; i++) {
			var sp_event = $.extend(true, {
				textParent: defaults.defaultIncludeTextParent
			}, defaults.specialEvents[i]);
			$(sp_event.textParent + ':contains("' + sp_event.includeText + '")', $this).css(sp_event.css);
		}
	}
})(apex.jQuery, {})


