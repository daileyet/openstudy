(function($) {
	/**
	 *
	 * @param {Object} options
	 * options = {
	 *	items : [
	 * 		{name:'item name',link:'www.example.com'}
	 * 	]
	 * }
	 */
	$.fn.dyn = function(options) {
		var dyn_container = $(this);
		dyn_container.ops = {};
		dyn_container.initOptions = function() {
			dyn_container.ops = options || {
				items: []
			};
			$.extend(true, dyn_container.ops, {
				length: 100,
				coordinate: {
					radius: 10
				},
				navs: {
					radius: 20
				}
			});
		}; // end of initOptions
		dyn_container.render = function() {
			var dynOps = dyn_container.ops;
			dyn_container.addClass('dyn-nav');
			dyn_container.css({
				width: 0,
				height: 0,
			});
			dyn_container.empty();
			// render coordinate
			dyn_container.append('<div class="coordinate"></div>');
			$(".coordinate", dyn_container).css({
				width: dynOps.coordinate.radius * 2,
				height: dynOps.coordinate.radius * 2,
				"border-radius": dynOps.coordinate.radius,
				top: -1 * dynOps.coordinate.radius,
				left: -1 * dynOps.coordinate.radius
			});
			// render nav items
			dyn_container.append('<div class="navs"></div>');
			var dyn_navs = $(".navs", dyn_container);

			for (var i = 0, len = dynOps.items.length; i < len; i++) {
				var nav_item = dynOps.items[i];
				var nav_item_dom = $('<div class="navs-item"></div>');
				nav_item_dom.text(nav_item.name);
				nav_item_dom.data("target", nav_item.link);
				var nav_item_radius = nav_item.radius ? nav_item.radius : dynOps.navs.radius;

				var avg_angle = (Math.PI * 2 / 4) / (dynOps.items.length - 1);
				nav_item.angle = avg_angle * i;

				nav_item_dom.css({
					width: nav_item_radius * 2,
					height: nav_item_radius * 2,
					"border-radius": nav_item_radius,
					left: dynOps.length * Math.cos(nav_item.angle) - nav_item_radius,
					top: dynOps.length * Math.sin(nav_item.angle) - nav_item_radius
				});
				dyn_navs.append(nav_item_dom);

				$(".coordinate", dyn_container).unbind('click').click(function(e){
					dyn_navs.toggleClass('hidden');
				})

			}



		}













		//
		dyn_container.affect = function() {
			dyn_container.initOptions();
			dyn_container.render();
		};
		// make it work
		dyn_container.affect();
	}

})(jQuery);