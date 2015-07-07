/**
 * communication email cycle overview graph
 * @author dailey.dai@oracle.com
 * @since 2014/11/10
 * @modified 2014/11/27
 */

(function($, options) {
	$.fn.emailCycle = function(cycleOptions) {
		var $svg = $(this);
		var cycleOps = cycleOptions || {};
		var defOps = {
			url: '',
			afterRender:function(){},
			//data:{}
			maxCols: 5,
			autoCalcMaxCols: false,
			params: {},
			cycleNodeRender: function(paper, node) {
				/* the default node drawing */
				var color = node.color || Raphael.getColor();
				var ellipse = paper.ellipse(0, 0, 40, 20).attr({
					fill: color,
					stroke: color,
					"stroke-width": 2,
					cursor: "move"
				});
				/* set DOM node ID */
				ellipse.node.id = node.id || node.label;
				var text = paper.text(0, 30, node.label || node.id).attr({
					'font-weight': 'bold',
					'font-size': '11px'
				});
				if (node.href) {
					text.attr("href", node.href);
				}
				if (node.target) {
					text.attr("target", node.target);
				}

				var tooltip = paper.text(0, 0, node.date).attr({
					opacity: 0,
					cursor: "move"
				});

				var shape = paper.set().
				push(ellipse)
					.push(text)
					.push(tooltip);

				tooltip.hover(function() {
					tooltip.animate({
						opacity: 1,
						"fill-opacity": 1
					}, 500);
				}, function() {
					tooltip.animate({
						opacity: 0,
						"fill-opacity": 0
					}, 1000);
				});

				return shape;
			},
			width: ($svg.width()),
			height: $svg.height(),
			cycleRender: function(_data,_renderOps) {
				$svg.empty();
				var configure = $svg[0].configure;
				var g = new Graph();
				if(!configure.data || configure.data.length ==0){
					configure.data = _data || [];
				}
				var i = 0;
				var data=_data;
				var renderOps = _renderOps || {
					needTranslate:true,
					layout: 'SHORT'
				};
				if(renderOps.needTranslate){
					data = configure.dataTranslate(_data);
				}
				var j = data.length;
				for (; i < j; i++) {
					var begin = data[i];
					if(begin.shape){//key important
						delete begin['shape'];
					}
					begin.render = configure.cycleNodeRender;
					g.addNode(begin.id, begin);
				}
				var layouter = "";
				if(renderOps.layout == 'DETAILED'){
					configure.layout = 'DETAILED';
					layouter = new Graph.Layout.Customized(g,configure.maxCols);
					layouter.layoutCalcShips(data);
				}else{
					configure.layout = 'SHORT';
					layouter = new Graph.Layout.SSC(g);
				}
				$svg.css("height", layouter.absoulteSize().height);
				
				/* layout the graph using the Spring layout implementation */
				var drender =  new Graph.Renderer.Raphael($svg.attr('id'), g, $svg.width(), $svg.height());
				drender.draw();
				$(window).unbind('resize').resize(function() {
					if (layouter.absoulteSize().width < $svg.width()) {
						drender.resize($svg.width(), $svg.height());
						drender.draw();
					}
				});
			},
			dataTranslate:function(data){
				var ships = Graph.Layout.SSC.categoryMap();
				for(var i in data){
					var node = data[i];
					var key = '';
					if(node.code.startsWith('US1')){
						key = 'SYS_INIT_SEND';
					}else if(node.code.startsWith('US2')){
						key = 'CUST_REPLY';
					}else if(node.code.startsWith('US3')){
						key = 'SYS_RETRY_SEND';
					}else if(node.code.startsWith('US4')){
						key = 'SYS_CONFIRM';
					}else if(node.code.startsWith('UR1')){
						key = 'SYS_REMINDER_CUST';
					}else if(node.code.startsWith('UR2')){
						key = 'SYS_INTERNAL_SEND';
					}else if(node.code.startsWith('UR3')){
						key = 'INTERNAL_REPLY';
					}else if(node.code.startsWith('UE1')){
						key = 'SYS_TRYOUT_SEND';
					}
					if(ships[key] && ships[key].push){
						node.buz = key;
						ships[key].push(node);
					}
				}
				var dataTranslate = [];
				for(var key in ships){
					var node_ = ships[key].pop();
					if(node_ && node_.buz && node_.buz == key){
						dataTranslate.push(node_);
					}
				}
				return dataTranslate;
			}
		};
		$.extend(true, defOps, cycleOps);
		$svg[0].configure = defOps;
		if (defOps.data) {
			defOps.cycleRender(defOps.data);
			defOps.afterRender();
		} else if (defOps.url !== '') {
			$.get(defOps.url, defOps.params, function(data) {
				defOps.cycleRender(data);
				defOps.afterRender();
			}, 'json');
		}
	};
	///////////////////////////////////////////////////////////////////////////////
	//****************************************************************************
	///////////////////////////////////////////////////////////////////////////////
	// email cycle setting function
	$.fn.emailCycleSetting = function(action, _actionOps) {
		var conf = $(this)[0].configure;
		var actionOps = {};
		switch (action) {
			case 'redraw':
				actionOps = _actionOps || {
					needTranslate: true,
					layout: 'SHORT'
				};
				conf.cycleRender(conf.data,actionOps);
				break;
			default:
				break;
		}
	};

})(jQuery || apex.jQuery, {})