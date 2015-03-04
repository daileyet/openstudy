function prepared(username, password) {
	var _username = document.getElementsByName("username")[0];
	var _password = document.getElementsByName("password")[0];
	if (_username) {
		_username.setAttribute('value', username);
	}
	if (_password) {
		_password.setAttribute('value', password);
	}

	var _iframe = document.getElementsByTagName('iframe')[0];
	if (_iframe) {
		_iframe.setAttribute('width', '300');
	}
};


function plusReady() {
	// 隐藏滚动条
	var wc = plus.webview.currentWebview();
	wc.onloaded = function() {
		console.log("password = " + wc.password);
		prepared(wc.username, wc.password);
		wc.show();
	}
};



(function(w) {
	if (window.plus) {
		plusReady();
	} else {
		document.addEventListener('plusready', plusReady, false);
	}

	document.addEventListener('DOMContentLoaded', function() {
		plusReady();
	}, false);

})(window);