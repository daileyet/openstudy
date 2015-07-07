function showEmail(emailSeq) {
	$('#TI_' + emailSeq).trigger('click');
}
$(document).ready(function() {
	(function($, options) {
		/**
		 * control email cycle list
		 * @author: dailey.dai@oracle.com
		 * @modify: 2015/4/15
		 */
		var loadHideShowRegionsHander = function(hideShowRegion) {
			var link = $('a.uRegionControl', hideShowRegion);
			if(link.length > 1){
				link.parents(".uHideShowRegion").show();
				return;
			}
			$(options.grpRegionSel + ' a.uRegionControl').each(function() {
				var curLink = $(this);
				if (link[0] == curLink[0]) {
					curLink.parents(".uHideShowRegion").show();
				} else {
					curLink.addClass("uRegionCollapsed"); //change arrow style
					curLink.parents(".uRegionHeading").next().hide(); //hide content
					curLink.parents(".uHideShowRegion").hide(); // hide other region
				}
			});
			content = link.parents(".uRegionHeading").next();
			link.removeClass("uRegionCollapsed");
			if (content.css("display") == "block") {
//				content.slideUp("fast", "swing");
			} else {
				content.slideDown("fast", "swing");
			}
		}

		$(options.linksSel).unbind('click').click(function() {
			var $link = $(this);
			if ($link.hasClass(options.linkActiveClass)) {
				return;
			}
			$(options.linksSel).removeClass(options.linkActiveClass);
			$link.addClass(options.linkActiveClass);
			var sTarget = $link.data('target');
			loadHideShowRegionsHander(sTarget);

		});

		var allLink = $(options.grpRegionSel + ' a.uRegionControl');
		allLink.addClass("uRegionCollapsed");
		allLink.parents(".uRegionHeading").next().hide();


		var seq = $v(options.emailSel);
		if (seq !== '') {
			$('#TI_' + seq).trigger('click');
		}

	})(apex.jQuery, {
		linksSel: '.toolbar-item',
		linkActiveClass: 'toolbar-item-active',
		grpRegionSel: '#emails-container',
		emailSel: 'P32_EMAIL_SEQ'
	})

});