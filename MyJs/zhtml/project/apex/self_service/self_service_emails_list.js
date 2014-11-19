(function($, options) {
	/**
	 * control email cycle list
	 */

	var loadHideShowRegionsHander = function(hideShowRegion) {
		var link = $('a.uRegionControl', hideShowRegion);
		$(options.grpRegionSel + ' a.uRegionControl').each(function() {
			var curLink = $(this);
			if (link[0] == curLink[0]) {} else {
				curLink.addClass("uRegionCollapsed");
				curLink.parents(".uRegionHeading").next().hide();
			}
		});

		content = link.parents(".uRegionHeading").next();
		link.removeClass("uRegionCollapsed");
		if (content.css("display") == "block") {
			//content.slideUp("fast", "swing");
		} else {
			content.slideDown("fast", "swing");
		}
	}

	$(options.linksSel).unbind('click').click(function() {
		var $link = $(this);
		if($link.hasClass(options.linkActiveClass)){
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
	
	
	var seq=$v(options.emailSel);
	if(seq!==''){
			$('#TI_'+seq).trigger('click');
	}

})(apex.jQuery, {
	linksSel: '.toolbar-item',
	linkActiveClass: 'toolbar-item-active',
	grpRegionSel: '#emails-container',
	emailSel:'P14_EMAIL_SEQ'
})