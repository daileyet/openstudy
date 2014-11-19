(function($, options) {


	$.fn.emailCycle = function(cycleOptions) {
		var $svg = $(this);
		var cycleOps = cycleOptions || {};
		var defOps = {
			url: '',
			//data:{}
			params: {},
			cycleNodeRender: function(paper, node) {
				/* the default node drawing */
				var color = Raphael.getColor();
				var ellipse = paper.ellipse(0, 0, 30, 20).attr({
					fill: color,
					stroke: color,
					"stroke-width": 2,
					cursor: "move"
				});
				/* set DOM node ID */
				ellipse.node.id = node.id || node.label;
				var text = paper.text(0, 30, node.label || node.id).attr({
					'font-weight': 'bold'
				});
				if (node.href) {
					text.attr("href", node.href);
				}
				if (node.target) {
					text.attr("target", node.target);
				}

				var tooltip = paper.text(0, -30, node.date).attr({
					opacity: 0
				});

				shape = paper.set().
				push(ellipse)
					.push(text)
					.push(tooltip);

				ellipse.hover(function() {
					tooltip.animate({
						opacity: 1,
						"fill-opacity": 1
					}, 500);
				}, function() {
					tooltip.animate({
						opacity: 0
					}, 300);
				});
				return shape;
			},
			width: ($svg.width() - 5),
			height: $svg.height(),
			cycleRender: function(data) {
				var g = new Graph();
				var i = 0;
				var j = data.length;
				if (j==0) {
				}else if(j==1){
					var begin = data[0];
					begin.render = defOps.cycleNodeRender;
					g.addNode(begin.id, begin);
				}else {
					for (; i < j - 1; i++) {
						var begin = data[i];
						var end = data[i + 1];
						begin.render = defOps.cycleNodeRender;
						end.render = defOps.cycleNodeRender;
						g.addNode(begin.id, begin);
						g.addNode(end.id, end);
						g.addEdge(begin.id, end.id, {
							directed: true
						})
					}
				}

				/* layout the graph using the Spring layout implementation */
				var layouter = new Graph.Layout.Ordered(g, g.nodes);

				var drender = new Graph.Renderer.Raphael($svg.attr('id'), g, defOps.width, defOps.height);
			}

		};
		$.extend(true, defOps, cycleOps);

		if (defOps.data) {
			defOps.cycleRender(defOps.data);
		} else if (defOps.url !== '') {
			$.get(defOps.url, defOps.params, function(data) {
				defOps.cycleRender(data);
			}, 'json');
		}


	}


})(apex.jQuery, {})