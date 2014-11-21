/**
 * @author dailey.dai@oraclec.om
 * @desc lazy load speical report columns values when the watch points are in current page view point.
 * @since 2014/11/20
 */
(function($) {
	//
	function ScrollRender(watchpoint, options) {
		this.watchpoint = watchpoint;
		this.loaded = false;
		this.scrollOps = {
			debug: false,
			loading: function() {},
			loaded: function() {}
		};
		$.extend(true, this.scrollOps, options || {});
		this.log = function(msg) {
			var log = console.log || function() {};
			if (this.scrollOps.debug) log(msg);
		}
	};
	ScrollRender.build = function(watchpoint, options) {
		return new ScrollRender(watchpoint, options);
	}
	ScrollRender.prototype = {
		isInCurrentViewport: function() {
			var _this = this.watchpoint;
			var ePos = $(_this).offset();
			var winH = $(window).height();
			var scrT = $(document).scrollTop();
			if (ePos.top > scrT && ePos.top < (scrT + winH)) {
				return true;
			}
			return false;
		},
		triggerLoad: function() {
			if (this.isInCurrentViewport()) {
				if (this.loaded) {
					this.scrollOps.loaded.call(this);
				} else {
					this.scrollOps.loading.call(this);
					this.loaded = true;
				}
			}
		}

	}
	//

	$.fn.scrollRender = function(options) {
		var $self = $(this);
		$.each($self, function() {
			$(this)[0].scorllRenderSupport = ScrollRender.build($(this)[0], options);
			$(this)[0].scorllRenderSupport.triggerLoad();
		});

		$(document).unbind('scroll');
		$(document).scroll(function() {
			$.each($self, function() {
				if ($(this)[0].scorllRenderSupport == undefined) {
					$(this)[0].scorllRenderSupport = ScrollRender.build($(this)[0]);
				}
				$(this)[0].scorllRenderSupport.triggerLoad();
			});
		});

	}

})(apex.jQuery)


var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

