function prepared(username, password) {
	var _username = document.getElementsByName("username")[0];
	var _password = document.getElementsByName("password")[0];
	if (_username) {
		_username.setAttribute('value', username);
	}
	if (_password) {
		_password.setAttribute('value', _password);
	}
}

function plusReady() {
		// 隐藏滚动条
		var wc = plus.webview.currentWebview();
		wc.onloaded = function() {
			console.log("New Window loaded!");
			console.log("password = " + wc.password);
			prepared(wc.username, wc.password);
		}
	}
	(function(w) {

		if (window.plus) {
			plusReady();
		} else {
			document.addEventListener('plusready', plusReady, false);
		}

		document.addEventListener('DOMContentLoaded', function() {
			plusReady();
		}, false);

	})(window)