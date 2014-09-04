/**
 * @author dailey.dai@oracle.com
 * @modify 2014/07/9
 * @file   full calendar util
 */

function FC_UTIL(fcSel) {
	this.fcSel = fcSel;
	//cache events
	this.caches_elements = [];
	//maps
	this.maps = {
		event : {},
		element : {},
		event_more : {},
		date : {} //key:start value:[event]
	}
	//local objects&functions
	var CODE = {//key code generator
		lz : function(i, c) {
			if ( typeof c != 'number' || c <= 0 || ( typeof i != 'number' && typeof i != 'string')) {
				return i;
			}
			i += '';
			while (i.length < c) {
				i = '0' + i;
			}
			return i;
		},
		getHashCode : function(s) {
			var hash = 0, c = ( typeof s == 'string') ? s.length : 0, i = 0;
			while (i < c) {
				hash = ((hash << 5) - hash) + s.charCodeAt(i++);
				//hash = hash & hash; // Convert to 32bit integer
			}
			return (hash < 0 ) ? ((hash * -1) + 0xFFFFFFFF) : hash;
			// convert to unsigned
		},
		uniqueId : function(s, bres) {
			if (s == undefined || typeof s != 'string') {
				if (!CODE.___uqidc) {
					CODE.___uqidc = 0;
				} else {++CODE.___uqidc;
				}
				var od = new Date(), i = s = od.getTime() + '' + CODE.___uqidc;
			} else {
				var i = CODE.getHashCode(s);
			}
			return ((bres) ? 'res:' : '') + i.toString(32) + '-' + CODE.lz((s.length * 4).toString(16), 3);
		}
	};
	var keyManual = function(e) {//manual event key generate func
		return e.id;
	};
	var keyDynamic = function(e) {//dynamic event key generate func
		var sKey = '', prefix = '';
		//key generate factors
		var parts = ['id', 'start', 'end', 'title', 'description'];
		for (var i in parts) {
			var part = parts[i];
			var eVal = e[part];
			if (eVal == undefined) {
			} else {
				if (part == 'id') {// id:'0_8_51'
					if (eVal.lastIndexOf('_') != -1) {
						eVal = eVal.substr(0, eVal.lastIndexOf('_'));
					}
					prefix = eVal;
				}
				sKey = sKey + eVal;
			}
		}
		return prefix + '|' + CODE.uniqueId(sKey);
	};
	/**
	 * remove duplcation events
	 * @param {function} fnKeyGen
	 */
	var removeDuplicate = function(events, fnKeyGen) {
		var eSet = {}, eArr = [];
		$.each(events, function(i, e) {
			var key = fnKeyGen.call(this, e);
			e._key = key;
			eSet[key] = e;
		});
		$.each(eSet, function(key, value) {
			
			if (value.skipweek && value.skipweek == 'Y') {// need skip weekend
				var evts = getEventsSkipWeekend(value, fnKeyGen);
				$.each(evts, function(index, e) {
					eArr.push(e);
				});
			} else {// no skip weekend
				eArr.push(value);
			}

		});
		return eArr;
	};

	var cloneDate = function(date) {
		return new Date(date.getFullYear(), date.getMonth(), date.getDate());
	};

	var cloneObject = function(obj) {
		var cloneObj = {};
		for (var i in obj) {
			cloneObj[i] = obj[i];
		}
		return cloneObj;
	}
	var getEventsSkipWeekend = function(event, fnKeyGen) {
		var evt_start = typeof (event.start) == 'string' ? $.fullCalendar.parseDate(event.start) : event.start, evt_end = typeof (event.end) == 'string' ? $.fullCalendar.parseDate(event.end) : event.end;
		var dstart = null, dend = null;
		var events = [];

		var spliceEvent = function(evt, start_date, end_date) {
			var evtClone = cloneObject(evt);
			evtClone.start =start_date;
			evtClone.end = end_date;
			var key = fnKeyGen.call(this, evtClone);
			evtClone._key = key;
			return evtClone;
		}
		for (var i = evt_start; i <= evt_end; ) {
			if (i.getDay() == 0 || i.getDay() == 6) {
				if (dstart != null && dend != null) {
					events.push(spliceEvent(event, cloneDate(dstart), cloneDate(dend)));
					dstart = null;
					dend = null;
				}
			} else {
				if (dstart == null) {
					dstart = cloneDate(i);
				} else {
					dend = cloneDate(i);
				}
			}
			i.setDate(i.getDate() + 1);
		}
		if (dstart != null) {
			if (dend == null) {
				dend = dstart;
			}
			events.push(spliceEvent(event, cloneDate(dstart), cloneDate(dend)));
		}
		return events;
	}
	//method
	this.uniqueId = function(s) {
		return CODE.uniqueId(s);
	};
	this.filterEvents = function(eventsObj, fnFilter) {//fnFilter: function(e){return e==e;}
		var filters = [];
		$.each(eventsObj, function(key, value) {
			var filterRet = fnFilter.call(this, value);
			if (filterRet) {
				filters.push(value);
			}
		});
		return filters
	};
	this.removeDuplicate = function(events, isManual) {
		if (isManual == undefined) {
			isManual = false;
		};
		return removeDuplicate(events, isManual ? keyManual : keyDynamic);
	};

	this.addCache = function(event, element, thresholdlevel) {
		var key = event._key;
		this.caches_elements.push(element);
		this.maps.event[key] = event;
		if (this.maps.element[key]) {
			this.maps.element[key].push(element);
		} else {
			this.maps.element[key] = [element];
		}

		if (thresholdlevel == undefined) {
			thresholdlevel = 5;
		}
		if (event.level && event.level > thresholdlevel) {
			this.maps.event_more[key] = event;
		}

	};
	this.existMoreEvents = function(dateObj) {
		var exist = [];
		exist = this.filterEvents(this.maps.event_more, function(e) {
			var sd1 = $.fullCalendar.formatDate(e.start, 'yyyy-MM-dd');
			var sd2 = $.fullCalendar.formatDate(dateObj, 'yyyy-MM-dd');
			if (sd1 == sd2) {
				return true;
			}
		});
		return exist.length > 0;
	};

	this.clearCache = function() {
		this.caches_elements = [];
		this.maps = {
			event : {},
			element : {},
			event_more : {}
		};
	};
	this.removeMoreEvents = function() {
		var me = this;
		$(this.fcSel).fullCalendar('removeEvents', function(e) {
			var filters = me.filterEvents(me.maps.event_more, function(em) {
				return em._key == e._key;
			});
			return filters.length > 0;
		});
	};
	this.qtip = function(element, tipContent) {
		element.qtip({
			content : tipContent,
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
	};
}

