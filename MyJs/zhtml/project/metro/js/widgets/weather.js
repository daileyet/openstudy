(function() {
	var ot = this.ot = this.ot || {};
	var widgets = ot.widgets = ot.widgets || {};
	var weather = widgets.weather = widgets.weather || {
		id: 'weather',
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
				$.getJSON(weather.capi.template.replace('{cityname}', ops.cityname), function(data) {
					if (data.retMsg === 'success') {
						weather.wapi.params[0].cityid = data.retData.cityCode;
						weather.wapi.params[0].cityname = data.retData.cityName;
					}
				});
			}
		}
	};
	weather.render = function(){
		var widgets_html = '<div class="tile-content" style="background: url(images/clouds2.png)">'+
		'<div class="padding10">'+
		'<h1 class="fg-white ntm">{deg}&deg;</h1>'+
		'<h2 class="fg-white no-margin">{city}</h2>'+
		'<h5 class="fg-white no-margin">{weather}</h5>'+
		'<p class="tertiary-text fg-white no-margin">Today</p>'+
		'<p class="tertiary-text fg-white">{hdeg}&deg;/{ldeg}&deg; {wind}, {speed}</p>'+
		'</div>'+
		'</div>'+
		'<div class="tile-status">'+
		'<div class="label">Weather</div>'+
		'</div>'
						
		$.getJSON(weather.wapi.template.replace('{cityid}', weather.wapi.params[0].cityid),function(data){
			if(data.errMsg==='success'){
				widgets_html=widgets_html.replace('{deg}',data.retData.temp)
				.replace('{city}',data.retData.city)
				.replace('{weather}',data.retData.weather)
				.replace('{hdeg}',data.retData.h_tmp)
				.replace('{ldeg}',data.retData.l_tmp)
				.replace('{wind}',data.retData.WD)
				.replace('{speed}',data.retData.WS);
				$('[widgets-id="weather"]').html(widgets_html);
			}
		})
	}

})()