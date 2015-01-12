(function() {
	var golabl = this;
	var ot = golabl.ot = golabl.ot || {};
	var widgets = ot.widgets = ot.widgets || {};
	var weather = widgets.weather = widgets.weather || {
		id: 'weather',
		jsonp: function(unCrossDomainUrl, callbackName, successFn) {
			var jsonpUrl = 'http://localhost:8080/transfer/jsonp.htm';
//			jsonpUrl = 'https://openthinks.sinaapp.com/2/openthinks/transfer/jsonp.htm'
			jsonpUrl = jsonpUrl + '?TU=' + encodeURIComponent(unCrossDomainUrl);
			jsonpUrl = jsonpUrl + '&TC=' + callbackName;
			//dynamic create script
//			var head = document.getElementsByTagName('head')[0];
//			var script = document.createElement('script');
//			script.type = 'text/javascript';
//			script.src = jsonpUrl;
//			script.setAttribute('class', 'jsonp-script');
//			script.onload = script.onreadystatechange = function() {
//				if ((!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
//					// Handle memory leak in IE  
//					script.onload = script.onreadystatechange = null;
//					if (head && script.parentNode) {
//						head.removeChild(script);
//					}
//				}
//			}
//			head.insertBefore(script, head.firstChild);

			$.getScript(jsonpUrl, function() {
				// after success load and run the dynamic script
				if (successFn && (typeof successFn == 'function')) {
					successFn.call(this);
				}
			})
		},
		wapi: {
			template: 'http://apistore.baidu.com/microservice/weather?cityid={cityid}',
			params: [{
				cityid: '101010100'
			}]
		},
		capi: {
			template: 'http://apistore.baidu.com/microservice/cityinfo?cityname={cityname}',
			params: [{
				cityname: '北京'
			}]
		},
		reset: function() {
			weather.wapi.params = [{
				cityid: '101010100'
			}];
			weather.capi.params = [{
				cityname: '北京'
			}];
		}
	};

	weather.init = function(searchObj) {
		var ops = searchObj || {
			cityid: '101010100',
			cityname: '北京'
		};
		if (ops.cityid == undefined || ops.cityid == null || ops.cityid == '') {
			if (ops.cityname) {
				var url = weather.capi.template.replace('{cityname}', ops.cityname);
				weather.jsonp(url, "callCityinfo", function() {
					weather.render();
				})
			}
		}
	};
	weather.render = function() {
		var url = weather.wapi.template.replace('{cityid}', weather.wapi.params[0].cityid);
		weather.jsonp(url, "callWeather")
	}

})()

function callCityinfo(data) {
	var golabl = this;
	var ot = golabl.ot = golabl.ot || {};
	var widgets = ot.widgets = ot.widgets || {};
	var weather = widgets.weather = widgets.weather || {}
	if (data.retMsg === 'success') {
		weather.wapi.params[0].cityid = data.retData.cityCode;
		weather.wapi.params[0].cityname = data.retData.cityName;
		//		console.log(weather.wapi.params[0]);
	}
}

function callWeather(data) {
	var golabl = this;
	var ot = golabl.ot = golabl.ot || {};
	var widgets = ot.widgets = ot.widgets || {};
	var weather = widgets.weather = widgets.weather || {}

	var widgets_html = '<div class="tile-content" style="background: url(images/clouds2.png)">' +
		'<div class="padding10">' +
		'<h1 class="fg-white ntm">{deg}&deg;</h1>' +
		'<h2 class="fg-white no-margin">{city}</h2>' +
		'<h5 class="fg-white ">{weather}</h5>' +
		'<p class="tertiary-text fg-white ">Today</p>' +
		'<p class="tertiary-text fg-white">{hdeg}&deg;/{ldeg}&deg; {wind}, {speed}</p>' +
		'</div>' +
		'</div>' +
		'<div class="tile-status">' +
		'<div class="label">Weather</div>' +
		'</div>'

	if (data.errMsg === 'success') {
		widgets_html = widgets_html.replace('{deg}', data.retData.temp)
			.replace('{city}', data.retData.city)
			.replace('{weather}', data.retData.weather)
			.replace('{hdeg}', data.retData.h_tmp)
			.replace('{ldeg}', data.retData.l_tmp)
			.replace('{wind}', data.retData.WD)
			.replace('{speed}', data.retData.WS);
		$('[widgets-id="weather"]').html(widgets_html);
		//		console.log(widgets_html);
	}
}