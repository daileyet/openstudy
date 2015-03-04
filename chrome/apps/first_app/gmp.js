//
window.onload = function() {

	var $ = function(sel) {
		return document.querySelector(sel);
	};

	var wv = $('#gmp');
	//	wv.addEventListener("loadcommit",function(){
	//		if(wv.src === "https://gmp.oracle.com/captcha"){
	//			console.log("load loadcommit");
	//			wv.executeScript({code:"console.log('loadcommit')"});
	//		}
	//	});
	//	
	//	wv.addEventListener("loadstart",function(){
	//	    if(wv.src === "https://gmp.oracle.com/captcha"){
	//		console.log("load loadstart");
	//		wv.executeScript({code:"console.log('loadstart')"});
	//		}
	//	});
	//	
	wv.addEventListener("loadstop", function() {
		if (wv.src.indexOf("https://apex.oraclecorp.com/pls/apex/f?p=1072") != -1) {
//			console.log("load loadstop");
//			wv.executeScript({
//				code: "console.log('loadstop')"
//			});
			console.log('loadstop');
			console.log(wv.contentWindow.document.location);
		}
	});
	//	
	//	wv.addEventListener("loadredirect",function(){
	//		if(wv.src === "https://gmp.oracle.com/captcha"){
	//		console.log("load loadredirect");
	//		wv.executeScript({code:"console.log('loadredirect')"});
	//		}
	//	});


}